import { useState, useEffect } from 'react';
import StartScreen from '@/components/StartScreen';
import QuestionCard from '@/components/QuestionCard';
import ResultScreen from '@/components/ResultScreen';
import QuizProgress from '@/components/QuizProgress';
import TipSection from '@/components/TipSection';
import { useQuizData } from '@/hooks/useQuizData';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

type GameState = 'start' | 'playing' | 'result' | 'showingAnswer';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [playerName, setPlayerName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [answers, setAnswers] = useState<number[]>([]);
  
  const { questions, loading, error, getRewardForScore } = useQuizData();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleStart = (name: string) => {
    setPlayerName(name);
    setGameState('playing');
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (gameState !== 'playing') return;
    
    setSelectedOption(optionIndex);
    setGameState('showingAnswer');
    
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnswers(prev => [...prev, optionIndex]);
    
    // Auto advance after 2 seconds
    setTimeout(() => {
      if (isLastQuestion) {
        setGameState('result');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(undefined);
        setGameState('playing');
      }
    }, 2000);
  };

  const handleRetry = () => {
    setGameState('start');
    setPlayerName('');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(undefined);
    setAnswers([]);
  };

  const handleHome = () => {
    handleRetry();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center safe-area-inset">
        <Card className="p-6 sm:p-8">
          <CardContent className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-lg font-medium">Loading quiz...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center safe-area-inset">
        <Card className="p-6 sm:p-8 border-destructive">
          <CardContent className="text-center space-y-4">
            <h2 className="text-xl font-bold text-destructive">Error Loading Quiz</h2>
            <p className="text-muted-foreground">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-primary hover:underline"
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'start') {
    return <StartScreen onStart={handleStart} />;
  }

  if (gameState === 'result') {
    const reward = getRewardForScore(score);
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        reward={reward.message}
        badge={reward.badge}
        playerName={playerName}
        onRetry={handleRetry}
        onHome={handleHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 safe-area-inset">
      <QuizProgress
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
        score={score}
        playerName={playerName}
      />
      
      <div className="p-3 sm:p-4 lg:p-6 flex flex-col items-center justify-center space-y-4 sm:space-y-6" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onSelect={handleOptionSelect}
          selectedOption={selectedOption}
          showResult={gameState === 'showingAnswer'}
          correctAnswer={currentQuestion.correctAnswer}
        />
        
        {gameState === 'showingAnswer' && (
          <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <TipSection tip={currentQuestion.tip} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
