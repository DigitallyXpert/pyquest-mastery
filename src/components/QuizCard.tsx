import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/types/quiz';
import { CheckCircle2, Circle, Code } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  showResult?: boolean;
}

export const QuizCard = ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  showResult = false
}: QuizCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-success text-success-foreground';
      case 'intermediate':
        return 'bg-warning text-warning-foreground';
      case 'advanced':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getOptionStyle = (optionIndex: number) => {
    if (!showResult) {
      return selectedAnswer === optionIndex
        ? 'border-primary bg-primary/10 text-primary'
        : 'border-border hover:border-primary/50 hover:bg-accent/50';
    }

    if (optionIndex === question.correctAnswer) {
      return 'border-success bg-success/10 text-success';
    }

    if (selectedAnswer === optionIndex && optionIndex !== question.correctAnswer) {
      return 'border-destructive bg-destructive/10 text-destructive';
    }

    return 'border-border bg-muted/30';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            <Badge variant="secondary">
              Question {questionIndex + 1} of {totalQuestions}
            </Badge>
            <Badge className={getDifficultyColor(question.difficulty)}>
              {question.difficulty}
            </Badge>
            <Badge variant="outline">{question.topic}</Badge>
          </div>
        </div>
        <CardTitle className="text-xl font-semibold leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {question.codeExample && (
          <div className="bg-muted/50 rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4" />
              <span className="font-medium">Code Example:</span>
            </div>
            <pre className="text-sm font-mono whitespace-pre-wrap text-foreground">
              {question.codeExample}
            </pre>
          </div>
        )}

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full p-4 h-auto justify-start text-left transition-all ${getOptionStyle(index)}`}
              onClick={() => !showResult && onSelectAnswer(index)}
              disabled={showResult}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0">
                  {showResult ? (
                    index === question.correctAnswer ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : selectedAnswer === index ? (
                      <Circle className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5 opacity-30" />
                    )
                  ) : (
                    <Circle className={`h-5 w-5 ${selectedAnswer === index ? 'fill-current' : ''}`} />
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </Button>
          ))}
        </div>

        {showResult && (
          <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
            <h4 className="font-semibold text-info mb-2">Explanation:</h4>
            <p className="text-sm text-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};