import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizResult as QuizResultType } from '@/types/quiz';
import { Trophy, Clock, Target, RotateCcw } from 'lucide-react';

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
}

export const QuizResult = ({ result, onRestart }: QuizResultProps) => {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! You\'re a Python pro! 🐍✨';
    if (percentage >= 80) return 'Great job! You have a solid understanding! 👏';
    if (percentage >= 70) return 'Good work! Keep practicing to improve! 📚';
    if (percentage >= 60) return 'Not bad! Review the concepts and try again! 💪';
    return 'Keep learning! Practice makes perfect! 🚀';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
          <p className="text-lg text-muted-foreground">
            {getScoreMessage(result.percentage)}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.percentage)}`}>
              {result.percentage}%
            </div>
            <div className="text-lg text-muted-foreground">
              {result.score} out of {result.totalQuestions} correct
            </div>
          </div>

          <Progress value={result.percentage} className="h-3" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold text-accent">
                {result.score}
              </div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </div>

            <div className="text-center p-4 bg-info/10 rounded-lg">
              <Clock className="h-6 w-6 mx-auto mb-2 text-info" />
              <div className="text-2xl font-bold text-info">
                {formatTime(result.timeTaken)}
              </div>
              <div className="text-sm text-muted-foreground">Time Taken</div>
            </div>

            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">
                {result.totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={onRestart} size="lg" className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Take Another Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};