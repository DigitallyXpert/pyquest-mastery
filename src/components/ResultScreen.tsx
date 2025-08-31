import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultScreenProps {
  score: number;
  total: number;
  reward: string;
  onRetry: () => void;
}

const ResultScreen = ({ score, total, reward, onRetry }: ResultScreenProps) => {
  const passThreshold = Math.max(2, total - 1);
  const isPassed = score >= passThreshold;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Congratulatory Area */}
        {isPassed && (
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-success">Congratulations! 🎉</h1>
            <p className="text-lg text-muted-foreground">
              You passed with {score} out of {total} correct!
            </p>
          </div>
        )}

        {!isPassed && (
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Good Try! 💪</h1>
            <p className="text-lg text-muted-foreground">
              You scored {score} out of {total}. Keep practicing!
            </p>
          </div>
        )}

        {/* Reward Card */}
        <Card className={`border-2 ${isPassed ? 'border-success bg-success/5' : 'border-primary bg-primary/5'}`}>
          <CardHeader className="text-center pb-4">
            <CardTitle className={`text-xl ${isPassed ? 'text-success' : 'text-primary'}`}>
              Your Reward
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-lg font-medium text-foreground">
              {reward}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button 
                onClick={onRetry}
                size="lg"
                className="w-full"
              >
                Play Again
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => window.location.href = '/'}
              >
                Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultScreen;