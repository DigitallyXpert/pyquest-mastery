import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultScreenProps {
  score: number;
  total: number;
  reward: string;
  badge: string;
  playerName: string;
  onRetry: () => void;
  onHome: () => void;
}

const ResultScreen = ({ score, total, reward, badge, playerName, onRetry, onHome }: ResultScreenProps) => {
  const passThreshold = Math.max(2, total - 1);
  const isPassed = score >= passThreshold;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-3 sm:p-4 lg:p-6 safe-area-inset">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-4 sm:space-y-6">
        {/* Congratulatory Area */}
        {isPassed && (
          <div className="text-center space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-success">Congratulations! 🎉</h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Amazing work, <span className="font-bold text-primary">{playerName}</span>!
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              You scored {score} out of {total} correct!
            </p>
          </div>
        )}

        {!isPassed && (
          <div className="text-center space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Good Try! 💪</h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Keep going, <span className="font-bold text-primary">{playerName}</span>!
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              You scored {score} out of {total}. Practice makes perfect!
            </p>
          </div>
        )}

        {/* Reward Card */}
        <Card className={`border-2 shadow-xl backdrop-blur-sm ${isPassed ? 'border-success bg-success/10' : 'border-primary bg-primary/10'}`}>
          <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
            <div className="text-4xl sm:text-5xl mb-2">{badge}</div>
            <CardTitle className={`text-lg sm:text-xl lg:text-2xl ${isPassed ? 'text-success' : 'text-primary'}`}>
              Your Reward
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
            <div className="text-sm sm:text-base lg:text-lg font-medium text-foreground leading-relaxed bg-background/50 rounded-lg p-3 sm:p-4">
              {reward}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <Button 
                onClick={onRetry}
                size="lg"
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
              >
                🎯 Play Again
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold border-2"
                onClick={onHome}
              >
                🏠 Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultScreen;