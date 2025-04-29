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
  // TODO: Implement this by calling an API.

  return {
    amountSent: amountSent,
    amountReturned: Math.floor(amountSent * 1.5),
  };
}

/**
 * Asynchronously retrieves a Player B profile.
 *
 * @returns A promise that resolves to a string representing Player B's profile.
 */
export async function getPlayerBProfile(): Promise<string> {
  // TODO: Implement this by calling an API.

  return 'Generous';
}
