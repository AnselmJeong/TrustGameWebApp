# Investment Game Simulation

This project simulates the investment game (also known as the "trust game") as described in the research paper "Trusting behavior in a repeated investment game" by François Cochard, Phu Nguyen Van, and Marc Willinger (2004) in the Journal of Economic Behavior & Organization.

## Overview

The investment game is an experimental setup designed to study trust and reciprocity in economic interactions. The simulation uses Large Language Models (LLMs) to simulate different player personalities and their decision-making processes in this game.

## Game Rules

1. Two players (A and B) each receive an initial endowment of 10 currency units.
2. Player A (the "trustor") can send any integer amount S (0 ≤ S ≤ 10) to Player B.
3. The amount sent is tripled by the experimenter before reaching Player B.
4. Player B (the "trustee") can then decide how much to return to Player A (0 ≤ R ≤ 3S).
5. The game can be played as a one-shot interaction or repeated for multiple rounds.

## Simulation Approach

This implementation:

1. Defines personality profiles for both Player A and Player B using JSON configuration files
2. Uses LLMs to simulate decision-making based on these personality profiles
3. Logs all interactions, decisions, and outcomes
4. Analyzes patterns of trust and reciprocity that emerge over repeated interactions

## Key Findings from Original Research

Cochard et al. (2004) found:

1. In repeated games, Player A sends more and Player B returns a larger percentage compared to one-shot games
2. Both the amount sent and percentage returned increase up to period 5 and drop sharply afterward
3. For the first five periods, most Player Bs behaved reciprocally
4. In the final two periods, most Player Bs behaved strategically by returning less or nothing
5. Player As continued to exhibit reciprocal behavior throughout all periods

## Project Structure

```
.
├── README.md
├── profiles/
│   ├── player_a/
│   │   ├── risk_averse.json
│   │   └── opportunistic.json
│   └── player_b/
│       ├── reciprocator.json
│       └── strategic.json
├── interactions/
│   └── session_xxx/
│       └── pair_xxx/
│           ├── round_xxx_a_prompt.txt
│           ├── round_xxx_a_response.txt
│           ├── round_xxx_b_prompt.txt
│           └── round_xxx_b_response.txt
├── transactions/
│   └── session_xxx/
│       └── pair_xxx.jsonl
└── simulation.py
```

## Usage

1. Set up your API key in the environment:
   ```
   export DEEPSEEK_API_KEY="your_api_key_here"
   ```

2. Run a simulation:
   ```
   python simulation.py
   ```

## Citation

```
Cochard, F., Nguyen Van, P., & Willinger, M. (2004). Trusting behavior in a repeated investment game. 
Journal of Economic Behavior & Organization, 55(1), 31-44.
```

## License

This project is licensed under the MIT License.
