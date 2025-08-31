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
    <div className="min-h-screen bg-background flex items-center justify-center p-3 sm:p-4 lg:p-6 safe-area-inset">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-4 sm:space-y-6">
        {/* Congratulatory Area */}
        {isPassed && (
          <div className="text-center space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-success">Congratulations! 🎉</h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              You passed with {score} out of {total} correct!
            </p>
          </div>
        )}

        {!isPassed && (
          <div className="text-center space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Good Try! 💪</h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              You scored {score} out of {total}. Keep practicing!
            </p>
          </div>
        )}

        {/* Reward Card */}
        <Card className={`border-2 ${isPassed ? 'border-success bg-success/5' : 'border-primary bg-primary/5'}`}>
          <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
            <CardTitle className={`text-lg sm:text-xl lg:text-2xl ${isPassed ? 'text-success' : 'text-primary'}`}>
              Your Reward
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
            <div className="text-sm sm:text-base lg:text-lg font-medium text-foreground leading-relaxed">
              {reward}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <Button 
                onClick={onRetry}
                size="lg"
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold"
              >
                Play Again
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold"
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