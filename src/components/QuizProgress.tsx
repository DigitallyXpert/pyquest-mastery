import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  playerName: string;
}

const QuizProgress = ({ currentQuestion, totalQuestions, score, playerName }: QuizProgressProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  const accuracy = currentQuestion > 0 ? Math.round((score / currentQuestion) * 100) : 0;

  return (
    <div className="w-full bg-card/90 backdrop-blur-sm border-b border-border/50 p-3 sm:p-4 safe-area-inset-top">
      <div className="max-w-4xl lg:max-w-6xl mx-auto space-y-3 sm:space-y-4">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground truncate">
              Hey {playerName}! 👋
            </h2>
            <Badge variant="secondary" className="text-xs sm:text-sm font-medium">
              Question {currentQuestion + 1}/{totalQuestions}
            </Badge>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Badge variant="outline" className="text-xs sm:text-sm">
              Score: {score}/{currentQuestion || 1}
            </Badge>
            <Badge 
              variant={accuracy >= 80 ? "default" : accuracy >= 60 ? "secondary" : "destructive"}
              className="text-xs sm:text-sm hidden sm:inline-flex"
            >
              {accuracy}% accuracy
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 sm:h-3 bg-secondary/50"
          />
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;