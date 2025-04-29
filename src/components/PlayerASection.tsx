
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PlayerASectionProps {
  round: number;
  totalRounds: number;
  playerATotal: number;
  setPlayerATotal: React.Dispatch<React.SetStateAction<number>>;
  playerBTotal: number;
  nextRound: () => void;
  prolifactor: number;
  bReturned: number;
  initialBalance: number;
}

const PlayerASection: React.FC<PlayerASectionProps> = ({
  round,
  totalRounds,
  playerATotal,
  setPlayerATotal,
  playerBTotal,
  nextRound,
  prolifactor,
  bReturned,
  initialBalance,
}) => {
  const [amountToSend, setAmountToSend] = useState(0);
  const investmentLimit = Math.floor(playerATotal * 0.5);

  const handleSendAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAmountToSend(value);
  };

  const handleConfirmSend = () => {
    if (amountToSend >= 0 && amountToSend <= investmentLimit) {
      const profit = bReturned - amountToSend;
      setPlayerATotal(playerATotal + profit);
      nextRound();
    } else {
      alert(`Please enter a valid amount between 0 and ${investmentLimit}.`);
    }
  };

  const progress = (round / totalRounds) * 100;
  const returnRate = amountToSend > 0 ? ((bReturned - amountToSend) / amountToSend) : 0;

  return (
    <div className="space-y-4">
      <Progress value={progress} />
      <p>Round {round} of {totalRounds}</p>
      <p>You can invest up to {investmentLimit} currency units (50% of {playerATotal}).</p>
      <div className="space-y-2">
        <label htmlFor="sendAmount">Enter amount to send to Player B:</label>
        <Input
          type="number"
          id="sendAmount"
          value={amountToSend}
          onChange={handleSendAmountChange}
          min="0"
          max={investmentLimit}
        />
      </div>
      {amountToSend > 0 && (
        <div className="space-y-2">
          <p>Player B returned {bReturned} currency units.</p>
          <p>Your return rate: {(returnRate * 100).toFixed(2)}%</p>
          <p>Your profit this round: {bReturned - amountToSend}</p>
        </div>
      )}
      <div className="flex justify-between">
        <div>
          <p>Your Total: {playerATotal}</p>
          <p>Player B Total: {playerBTotal}</p>
        </div>
        <Button onClick={handleConfirmSend}>Confirm Send</Button>
      </div>
    </div>
  );
};

export default PlayerASection;
