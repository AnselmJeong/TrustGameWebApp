"use client";

import { useState } from "react";
import PlayerBSection from "@/components/PlayerBSection";
import PlayerASection from "@/components/PlayerASection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NUM_ROUNDS = 7;
const PROLIFERATION_FACTOR = 2;
const INITIAL_BALANCE = 20;

export default function ExperimentPage() {
  const [section, setSection] = useState<"playerB" | "playerA">("playerB");
  const [round, setRound] = useState(1);
  const [playerATotal, setPlayerATotal] = useState(INITIAL_BALANCE);
  const [playerBTotal, setPlayerBTotal] = useState(10); // Initial balance for Player B
  const [bReturned, setBReturned] = useState(0);

  const [endOfSectionB, setEndOfSectionB] = useState(false);

  const nextRound = () => {
    if (round < NUM_ROUNDS) {
      setRound(round + 1);
    } else if (section === "playerB") {
      setEndOfSectionB(true);
    } else {
      // Experiment is finished.  Here's where you would wrap it up, persist data, etc.
      alert("Thank you for completing the experiment!");
    }
  };

  const handleSwitchToPlayerA = () => {
    setSection("playerA");
    setRound(1); // Reset round for Player A section
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-3xl space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl">The Trust Game Experiment</CardTitle>
          <CardDescription>
            {section === "playerB" ? "Section 1: As Player B" : "Section 2: As Player A"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {section === "playerB" && !endOfSectionB && (
            <PlayerBSection
              round={round}
              totalRounds={NUM_ROUNDS}
              playerATotal={playerATotal}
              playerBTotal={playerBTotal}
              setPlayerBTotal={setPlayerBTotal}
              nextRound={nextRound}
              prolifactor={PROLIFERATION_FACTOR}
              setBReturned={setBReturned}
            />
          )}

          {section === "playerB" && endOfSectionB && (
            <div className="text-center">
              <p>Congratulations! You have completed the first section as Player B.</p>
              <p>Your total earnings as Player B: {playerBTotal} currency units.</p>
              <Button onClick={handleSwitchToPlayerA}>Continue to Section 2 as Player A</Button>
            </div>
          )}

          {section === "playerA" && (
            <PlayerASection
              round={round}
              totalRounds={NUM_ROUNDS}
              playerATotal={playerATotal}
              setPlayerATotal={setPlayerATotal}
              playerBTotal={playerBTotal}
              nextRound={nextRound}
              prolifactor={PROLIFERATION_FACTOR}
              bReturned={bReturned}
              initialBalance={INITIAL_BALANCE}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
