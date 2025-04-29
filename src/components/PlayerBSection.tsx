
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PlayerBSectionProps {
  round: number;
  totalRounds: number;
  playerATotal: number;
  playerBTotal: number;
  setPlayerBTotal: React.Dispatch<React.SetStateAction<number>>;
  nextRound: () => void;
  prolifactor:number;
  setBReturned: React.Dispatch<React.SetStateAction<number>>;
}

const STARTING_SENT = 10;

const PlayerBSection: React.FC<PlayerBSectionProps> = ({
  round,
  totalRounds,
  playerATotal,
  playerBTotal,
  setPlayerBTotal,
  nextRound,
  prolifactor,
  setBReturned,
}) => {
  const [amountToReturn, setAmountToReturn] = useState(0);

  const handleReturnAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAmountToReturn(value);
  };

  const handleConfirmReturn = () => {
    if (amountToReturn >= 0 && amountToReturn <= STARTING_SENT * prolifactor) {
      setPlayerBTotal(playerBTotal + (STARTING_SENT * prolifactor) - amountToReturn);
      setBReturned(amountToReturn);
      nextRound();
    } else {
      alert(`Please enter a valid amount between 0 and ${STARTING_SENT * prolifactor}.`);
    }
  };

  const progress = (round / totalRounds) * 100;

  return (
    <div className="space-y-4">
      <Progress value={progress} />
      <p>Round {round} of {totalRounds}</p>
      <p>Player A has sent you {STARTING_SENT} currency units.</p>
      <p>You received {STARTING_SENT * prolifactor} currency units (Sent amount x {prolifactor})</p>
      <div className="space-y-2">
        <label htmlFor="returnAmount">Enter amount to return to Player A:</label>
        <Input
          type="number"
          id="returnAmount"
          value={amountToReturn}
          onChange={handleReturnAmountChange}
          min="0"
          max={STARTING_SENT * prolifactor}
        />
      </div>
      <div className="flex justify-between">
        <div>
          <p>Your Total: {playerBTotal}</p>
          <p>Player A Total: {playerATotal}</p>
        </div>
        <Button onClick={handleConfirmReturn}>Confirm Return</Button>
      </div>
    </div>
  );
};

export default PlayerBSection;
