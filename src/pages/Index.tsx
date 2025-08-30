import { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { QuizSetup } from '@/components/QuizSetup';
import { QuizCard } from '@/components/QuizCard';
import { QuizNavigation } from '@/components/QuizNavigation';
import { QuizResult } from '@/components/QuizResult';
import { QuizResult as QuizResultType } from '@/types/quiz';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const Index = () => {
  const {
    quizState,
    isLoading,
    error,
    loadQuestions,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz
  } = useQuiz();

  const [quizResult, setQuizResult] = useState<QuizResultType | null>(null);
  const [userName, setUserName] = useState<string>('');
  const { toast } = useToast();

  const handleStartQuiz = async (difficulty?: string, topic?: string) => {
    try {
      await loadQuestions(difficulty, topic);
      setQuizResult(null);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to load quiz questions. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleCompleteQuiz = async () => {
    try {
      const result = await completeQuiz();
      setQuizResult(result);
      toast({
        title: 'Quiz Completed!',
        description: `You scored ${result.percentage}% - ${result.score}/${result.totalQuestions} correct!`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to complete quiz. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleRestart = () => {
    resetQuiz();
    setQuizResult(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header name={userName} onNameChange={setUserName} />
        <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-destructive">Error</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={handleRestart}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizResult) {
    return (
      <div className="min-h-screen bg-background">
        <Header name={userName} onNameChange={setUserName} />
        <div className="p-4 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
          <QuizResult result={quizResult} onRestart={handleRestart} />
        </div>
      </div>
    );
  }

  if (quizState.questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header name={userName} onNameChange={setUserName} />
        <div className="p-4 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
          <QuizSetup onStartQuiz={handleStartQuiz} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const selectedAnswer = quizState.selectedAnswers[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header name={userName} onNameChange={setUserName} />
      <div className="p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <QuizCard
                question={currentQuestion}
                questionIndex={quizState.currentQuestionIndex}
                totalQuestions={quizState.questions.length}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={selectAnswer}
              />
            </div>
            
            <div className="lg:col-span-1">
              <QuizNavigation
                currentQuestion={quizState.currentQuestionIndex}
                totalQuestions={quizState.questions.length}
                selectedAnswers={quizState.selectedAnswers}
                onPrevious={previousQuestion}
                onNext={nextQuestion}
                onComplete={handleCompleteQuiz}
                canGoNext={selectedAnswer !== null && quizState.currentQuestionIndex < quizState.questions.length - 1}
                canGoPrevious={quizState.currentQuestionIndex > 0}
                isLastQuestion={quizState.currentQuestionIndex === quizState.questions.length - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
