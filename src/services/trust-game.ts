/**
 * Represents the amount of currency exchanged between players.
 */
export interface CurrencyExchange {
  /**
   * The amount sent by Player A to Player B.
   */
  amountSent: number;
  /**
   * The amount returned by Player B to Player A.
   */
  amountReturned: number;
}

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Asynchronously simulates Player B's decision in the trust game.
 *
 * @param amountSent The amount sent by Player A to Player B.
 * @param playerBProfile The profile of Player B, influencing their decision-making.
 * @returns A promise that resolves to a CurrencyExchange object representing Player B's response.
 */
export async function simulatePlayerBDecision(
  amountSent: number,
  playerBProfile: string
): Promise<CurrencyExchange> {
  console.log('[FRONTEND] simulatePlayerBDecision called:', amountSent, playerBProfile);
  try {
    const response = await fetch(`${API_BASE_URL}/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountSent, playerBProfile }),
    });
    const data = await response.json();
    console.log('[FRONTEND] simulatePlayerBDecision response:', data);
    return data;
  } catch (error) {
    console.error('[FRONTEND] Error in simulatePlayerBDecision:', error);
    throw error;
  }
}

/**
 * Asynchronously retrieves a Player B profile.
 *
 * @returns A promise that resolves to a string representing Player B's profile.
 */
export async function getPlayerBProfile(): Promise<string> {
  console.log('[FRONTEND] getPlayerBProfile called');
  try {
    const response = await fetch(`${API_BASE_URL}/profile`);
    const data = await response.json();
    console.log('[FRONTEND] getPlayerBProfile response:', data);
    return data.profile || 'Unknown';
  } catch (error) {
    console.error('[FRONTEND] Error in getPlayerBProfile:', error);
    return 'Unknown';
  }
}

/**
 * Represents the game move and result
 */
export interface GameMove {
  player_choice: boolean;
  computer_choice?: boolean;
  result?: number;
  player_points?: number;
  computer_points?: number;
}

/**
 * Makes a move in the trust game
 * @param playerChoice - true for cooperate, false for defect
 * @returns Promise<GameMove> - the result of the game move
 */
export async function playGame(amountSent: number): Promise<any> {
  alert('playGame called!');
  console.log('[FRONTEND] playGame called with:', amountSent);
  const response = await fetch('http://localhost:8000/api/play', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount_sent: amountSent }),
  });
  const data = await response.json();
  console.log('[FRONTEND] Received response from backend:', data);
  return data;
}

/**
 * Checks if the backend server is running
 * @returns Promise<boolean>
 */
export async function checkServerStatus(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/status`);
    return response.ok;
  } catch (error) {
    console.error('[FRONTEND] Error checking server status:', error);
    return false;
  }
}

const handleTest = async () => {
  alert('Button clicked!');
  // ... 이하 생략 ...
};
