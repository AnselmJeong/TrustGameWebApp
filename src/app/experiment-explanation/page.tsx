
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ExperimentExplanationPage() {
  const router = useRouter();

  const handleReady = () => {
    router.push("/experiment");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-2xl space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl">Experiment Instructions</CardTitle>
          <CardDescription>Please read the instructions carefully before proceeding.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Welcome to the Trust Game Experiment</h2>
            <p>
              This experiment consists of two sections. In the first section, you will play as Player B, and in the second section, you will play as Player A.
            </p>
            <h3 className="text-lg font-semibold">Section 1: Player B</h3>
            <p>
              As Player B, you will receive a currency amount from Player A. Your task is to decide how much of that amount to return to Player A. The currency you do not return is your profit.
            </p>
            <h3 className="text-lg font-semibold">Section 2: Player A</h3>
            <p>
              As Player A, you will have a total asset amount, 50% of which you can invest. Your task is to decide how much to send to Player B. The amount Player B returns to you is your profit.
            </p>
            <h3 className="text-lg font-semibold">General Information</h3>
            <ul>
              <li>Your goal is to maximize your earnings in both sections.</li>
              <li>The experiment consists of several rounds.</li>
              <li>Your earnings and the other player's earnings will be displayed on the screen.</li>
            </ul>
          </div>
          <Button onClick={handleReady} className="w-full">
            I am ready to start the experiment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
