
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to TrustGameWebApp</CardTitle>
          <CardDescription>Login or register to start the experiment.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-col space-y-2">
            <Link href="/login">
              <Button variant="secondary" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="w-full">Register</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
