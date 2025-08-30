import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswers: (number | null)[];
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  selectedAnswers,
  onPrevious,
  onNext,
  onComplete,
  canGoNext,
  canGoPrevious,
  isLastQuestion
}: QuizNavigationProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const answeredCount = selectedAnswers.filter(answer => answer !== null).length;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {answeredCount} of {totalQuestions} answered
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={onComplete}
                disabled={selectedAnswers[currentQuestion] === null}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Complete Quiz
              </Button>
            ) : (
              <Button
                onClick={onNext}
                disabled={!canGoNext}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {Array.from({ length: totalQuestions }, (_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-colors ${
                  index === currentQuestion
                    ? 'border-primary bg-primary text-primary-foreground'
                    : selectedAnswers[index] !== null
                    ? 'border-success bg-success text-success-foreground'
                    : 'border-border bg-background text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};