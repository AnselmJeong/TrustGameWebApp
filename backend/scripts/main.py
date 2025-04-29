import json
import os

def build_player_a_prompt(player_a_profile_path, player_b_profile_path, game_context=""):
    """
    Build and print a prompt for Player A based on the profile paths provided.
    
    Args:
        player_a_profile_path (str): Path to Player A's profile JSON file
        player_b_profile_path (str): Path to Player B's profile JSON file
        game_context (str): Additional context about the game state, history, etc.
    
    Returns:
        str: The complete prompt for Player A
    """
    # Load Player A's profile
    try:
        with open(player_a_profile_path, 'r') as file:
            player_a_profile = json.load(file)
    except FileNotFoundError:
        print(f"Error: Player A profile not found at {player_a_profile_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in Player A profile at {player_a_profile_path}")
        return None
    
    # Load Player B's profile
    try:
        with open(player_b_profile_path, 'r') as file:
            player_b_profile = json.load(file)
    except FileNotFoundError:
        print(f"Error: Player B profile not found at {player_b_profile_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in Player B profile at {player_b_profile_path}")
        return None
    
    # Extract Player B's profile information
    player_b_type = os.path.basename(player_b_profile_path).replace('.json', '')
    player_b_description = player_b_profile.get("description", "unknown personality type")
    
    # Enhance game context with information about Player B
    enhanced_context = f"{game_context}\n\nYou have some general information about Player B: They are described as having a {player_b_type} personality type - {player_b_description}."
    
    # Create the prompt using the template from Player A's profile
    prompt_template = player_a_profile.get("prompt_template", "")
    prompt = prompt_template.format(game_context=enhanced_context)
    
    # Print the prompt
    print(f"===== PROMPT FOR PLAYER A ({os.path.basename(player_a_profile_path).replace('.json', '')}) =====")
    print(prompt)
    print("=" * 80)
    
    return prompt

# Example usage
if __name__ == "__main__":
    player_a_profile_path = "../profiles/player_a/risk_averse.json"
    player_b_profile_path = "../profiles/player_b/reciprocator.json"
    
    # Simple context for the first round
    game_context = "This is round 1 of a 7-round game. You have no prior history with this Player B."
    
    build_player_a_prompt(player_a_profile_path, player_b_profile_path, game_context)

