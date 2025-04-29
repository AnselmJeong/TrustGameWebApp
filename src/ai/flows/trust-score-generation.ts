// TrustScoreGeneration story implementation
'use server';
/**
 * @fileOverview Generates a trust score for a player based on their decisions in the trust game.
 *
 * - generateTrustScore - A function that generates the trust score.
 * - GenerateTrustScoreInput - The input type for the generateTrustScore function.
 * - GenerateTrustScoreOutput - The return type for the generateTrustScore function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'zod';

const GenerateTrustScoreInputSchema = z.object({
  playerType: z.enum(['A', 'B']).describe('The role of the player in the trust game (A or B).'),
  decisions: z.array(
    z.object({
      amountSent: z.number().optional().describe('The amount sent by Player A to Player B.'),
      amountReturned: z.number().optional().describe('The amount returned by Player B to Player A.'),
    })
  ).describe('An array of decisions made during the trust game rounds.'),
});
export type GenerateTrustScoreInput = z.infer<typeof GenerateTrustScoreInputSchema>;

const GenerateTrustScoreOutputSchema = z.object({
  trustScore: z.number().describe('A score between 0 and 1 representing the player\u2019s trustworthiness.'),
  summary: z.string().describe('A brief summary of the factors affecting the trust score.'),
});
export type GenerateTrustScoreOutput = z.infer<typeof GenerateTrustScoreOutputSchema>;

export async function generateTrustScore(input: GenerateTrustScoreInput): Promise<GenerateTrustScoreOutput> {
  return generateTrustScoreFlow(input);
}

const trustScorePrompt = ai.definePrompt({
  name: 'trustScorePrompt',
  input: {
    schema: z.object({
      playerType: z.enum(['A', 'B']).describe('The role of the player (A or B).'),
      decisions: z.array(
        z.object({
          amountSent: z.number().optional().describe('The amount sent by Player A to Player B.'),
          amountReturned: z.number().optional().describe('The amount returned by Player B to Player A.'),
        })
      ).describe('An array of decisions made during the trust game rounds.'),
    }),
  },
  output: {
    schema: z.object({
      trustScore: z.number().describe('A score between 0 and 1 representing the player\u2019s trustworthiness.'),
      summary: z.string().describe('A brief summary of the factors affecting the trust score.'),
    }),
  },
  prompt: `You are an expert in analyzing trust game behavior to determine a player's trustworthiness.\n\n  Based on the decisions made by Player {{playerType}} in the trust game rounds, generate a trust score between 0 and 1, where 0 indicates complete lack of trustworthiness and 1 indicates perfect trustworthiness.\n  Also, provide a brief summary of the factors that influenced the trust score.\n\n  Decisions:\n  {{#each decisions}}\n  Round {{@index}}: Sent = {{amountSent}}, Returned = {{amountReturned}}\n  {{/each}}\n\n  Consider the following factors when calculating the trust score:\n  - For Player A: The consistency and generosity in sending amounts to Player B.\n  - For Player B: The proportion of the received amount returned to Player A.\n\n  Trust Score: `,
});

const generateTrustScoreFlow = ai.defineFlow<
  typeof GenerateTrustScoreInputSchema,
  typeof GenerateTrustScoreOutputSchema
>(
  {
    name: 'generateTrustScoreFlow',
    inputSchema: GenerateTrustScoreInputSchema,
    outputSchema: GenerateTrustScoreOutputSchema,
  },
  async input => {
    const {output} = await trustScorePrompt(input);
    return output!;
  }
);
