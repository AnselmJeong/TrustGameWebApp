# https://claude.ai/chat/f2799484-a7f2-4bf1-87f2-33bdd544b14b
import os
import json
import datetime
from openai import OpenAI


def ensure_directory_exists(directory_path):
    """Create directory if it doesn't exist."""
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)


def log_interaction(session_id, pair_id, round_num, player_type, is_prompt, content):
    """
    Log a prompt or response to the appropriate file.

    Args:
        session_id (str): Identifier for the session
        pair_id (str): Identifier for the player pair
        round_num (int): The current round number
        player_type (str): Either 'a' or 'b'
        is_prompt (bool): True if logging a prompt, False if logging a response
        content (str): The content to log
    """
    # Create directory path
    dir_path = os.path.join("interactions", f"session_{session_id:03d}", f"pair_{pair_id:03d}")
    ensure_directory_exists(dir_path)

    # Create file path
    interaction_type = "prompt" if is_prompt else "response"
    file_name = f"round_{round_num:03d}_{player_type}_{interaction_type}.txt"
    file_path = os.path.join(dir_path, file_name)

    # Write content to file
    with open(file_path, "w") as file:
        file.write(content)

    print(f"Logged {interaction_type} to {file_path}")


def generate_player_decision(prompt, player_type, is_player_a=True, session_id=1, pair_id=1, round_num=1):
    """
    Generate a decision for a player in the investment game using the DeepSeek API.

    Args:
        prompt (str): The complete prompt for the player
        player_type (str): The type of player (for logging)
        is_player_a (bool): True if this is Player A, False if Player B
        session_id (int): Identifier for the current session
        pair_id (int): Identifier for the current player pair
        round_num (int): The current round number

    Returns:
        int: The amount decided by the player
    """
    DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
    client = OpenAI(
        # api_key=DEEPSEEK_API_KEY,
        # base_url="https://api.deepseek.com/v1"
    )

    player_role = "Player A (investor)" if is_player_a else "Player B (trustee)"
    player_letter = "a" if is_player_a else "b"

    # Log the prompt
    log_interaction(session_id, pair_id, round_num, player_letter, True, prompt)

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"You are simulating a {player_type} {player_role} in an economic investment game experiment. You must make decisions based on your personality profile and the game context.",
                },
                {"role": "user", "content": prompt},
            ],
        )

        response = completion.choices[0].message.content
        print(f"===== {player_role.upper()} ({player_type}) RESPONSE =====")
        print(response)
        print("=" * 80)

        # Log the response
        log_interaction(session_id, pair_id, round_num, player_letter, False, response)

        # Extract the numerical decision from the response
        try:
            # Look for a number in the response
            import re

            numbers = re.findall(r"\b\d+\b", response)
            if numbers:
                decision = int(numbers[0])
                # Validate the decision is within appropriate range
                if is_player_a and (decision < 0 or decision > 10):
                    print(f"Warning: Player A decision {decision} out of range (0-10), clamping.")
                    decision = max(0, min(10, decision))
                # For Player B, we'd need the max amount they could return but it's not passed to this function
                # This would need to be validated in the calling code

                print(f"Extracted decision: {decision}")
                return decision
            else:
                print("Warning: No numerical decision found in response.")
                return 0  # Default to 0 if no number found
        except Exception as e:
            print(f"Error extracting decision: {e}")
            return 0  # Default to 0 on error

    except Exception as e:
        print(f"Request to DeepSeek API failed: {e}")
        # Log the error
        log_interaction(session_id, pair_id, round_num, player_letter, False, f"API ERROR: {str(e)}")
        return 0  # Default to 0 on API failure


def simulate_player_a_decision(
    player_a_profile_path, player_b_profile_path, game_context="", session_id=1, pair_id=1, round_num=1
):
    """Simulate Player A's decision with logging."""
    # First build the prompt
    with open(player_a_profile_path, "r") as file:
        player_a_profile = json.load(file)

    with open(player_b_profile_path, "r") as file:
        player_b_profile = json.load(file)

    player_a_type = os.path.basename(player_a_profile_path).replace(".json", "")
    player_b_type = os.path.basename(player_b_profile_path).replace(".json", "")
    player_b_description = player_b_profile.get("description", "unknown personality type")

    # Enhance game context with information about Player B
    enhanced_context = f"{game_context}\n\nYou have some general information about Player B: They are described as having a {player_b_type} personality type - {player_b_description}."

    # Create the prompt using the template from Player A's profile
    prompt_template = player_a_profile.get("prompt_template", "")
    prompt = prompt_template.format(game_context=enhanced_context)

    # Generate and return Player A's decision
    return generate_player_decision(
        prompt, player_a_type, is_player_a=True, session_id=session_id, pair_id=pair_id, round_num=round_num
    )


def simulate_player_b_decision(
    player_b_profile_path, amount_sent, game_context="", session_id=1, pair_id=1, round_num=1
):
    """Simulate Player B's decision with logging."""
    # Load Player B's profile
    with open(player_b_profile_path, "r") as file:
        player_b_profile = json.load(file)

    player_b_type = os.path.basename(player_b_profile_path).replace(".json", "")

    # Calculate the tripled amount and total amount B has
    tripled_amount = amount_sent * 3
    total_amount = 10 + tripled_amount  # B's initial 10 + the tripled amount

    # Create the prompt using the template from Player B's profile
    prompt_template = player_b_profile.get("prompt_template", "")
    prompt = prompt_template.format(
        amount_sent=amount_sent, tripled_amount=tripled_amount, total_amount=total_amount, game_context=game_context
    )

    # Generate and return Player B's decision
    return generate_player_decision(
        prompt, player_b_type, is_player_a=False, session_id=session_id, pair_id=pair_id, round_num=round_num
    )


def log_transaction(session_id, pair_id, round_num, player_a_profile, player_b_profile, amount_sent, amount_returned):
    """Log transaction details to a JSONL file."""
    # Create directory structure
    dir_path = os.path.join("transactions", f"session_{session_id:03d}")
    ensure_directory_exists(dir_path)

    # Create the transaction file path
    file_path = os.path.join(dir_path, f"pair_{pair_id:03d}.jsonl")

    # Create transaction record
    transaction = {
        "session_id": session_id,
        "pair_id": pair_id,
        "round": round_num,
        "timestamp": datetime.datetime.now().isoformat(),
        "player_a_profile": player_a_profile,
        "player_b_profile": player_b_profile,
        "amount_sent": amount_sent,
        "amount_returned": amount_returned,
        "player_a_profit": amount_returned - amount_sent if amount_sent > 0 else 0,
        "player_b_profit": (amount_sent * 3) - amount_returned if amount_sent > 0 else 0,
    }

    # Append transaction to file
    with open(file_path, "a") as file:
        file.write(json.dumps(transaction) + "\n")

    print(f"Transaction logged to {file_path}")


# Example full round simulation with logging
def simulate_round(player_a_profile_path, player_b_profile_path, game_context, session_id=1, pair_id=1, round_num=1):
    """Simulate a complete round with logging."""
    player_a_type = os.path.basename(player_a_profile_path).replace(".json", "")
    player_b_type = os.path.basename(player_b_profile_path).replace(".json", "")

    print(f"\n===== SIMULATING ROUND {round_num} =====")
    print(f"Session: {session_id}, Pair: {pair_id}")
    print(f"Player A: {player_a_type}, Player B: {player_b_type}")
    print("=" * 50)

    # Simulate Player A's decision
    amount_sent = simulate_player_a_decision(
        player_a_profile_path,
        player_b_profile_path,
        game_context,
        session_id=session_id,
        pair_id=pair_id,
        round_num=round_num,
    )

    # Initialize amount_returned
    amount_returned = 0

    # If Player A sent something, simulate Player B's response
    if amount_sent > 0:
        updated_context = f"{game_context}\nIn this round, Player A sent you {amount_sent} currency units."
        amount_returned = simulate_player_b_decision(
            player_b_profile_path,
            amount_sent,
            updated_context,
            session_id=session_id,
            pair_id=pair_id,
            round_num=round_num,
        )

        # Validate Player B's return (can't return more than received)
        max_return = amount_sent * 3
        if amount_returned > max_return:
            print(
                f"Warning: Player B returned {amount_returned} which exceeds the maximum possible {max_return}. Clamping."
            )
            amount_returned = max_return

    # Log the transaction
    log_transaction(session_id, pair_id, round_num, player_a_type, player_b_type, amount_sent, amount_returned)

    # Print round summary
    print(f"\nRound {round_num} summary:")
    print(f"Player A sent: {amount_sent}")
    if amount_sent > 0:
        print(f"Player B received: {amount_sent * 3}")
        print(f"Player B returned: {amount_returned}")
        print(f"Player A profit: {amount_returned - amount_sent}")
        print(f"Player B profit: {(amount_sent * 3) - amount_returned}")
    else:
        print(f"Game ended with no exchange.")

    return {"amount_sent": amount_sent, "amount_returned": amount_returned}


if __name__ == "__main__":
    player_a_profile_path = "../profiles/player_a/risk_averse.json"
    player_b_profile_path = "../profiles/player_b/reciprocator.json"

    game_context = "This is round 1 of a 7-round game. You have no prior history with your partner."

    # Simulate a complete round
    simulate_round(player_a_profile_path, player_b_profile_path, game_context)
