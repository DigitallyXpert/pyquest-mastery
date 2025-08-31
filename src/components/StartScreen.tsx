import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, Play } from 'lucide-react';

interface StartScreenProps {
  onStart: (playerName: string) => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  const [playerName, setPlayerName] = useState('');

  const handleStart = () => {
    if (playerName.trim()) {
      onStart(playerName.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && playerName.trim()) {
      handleStart();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-3 sm:p-4 lg:p-6 safe-area-inset">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-destructive fill-destructive" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Daily Python Quiz
            </h1>
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-destructive fill-destructive" />
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-md mx-auto">
            Test your Python knowledge with our fun daily quiz! 🐍
          </p>
          <div className="text-sm sm:text-base text-muted-foreground/80">
            <span className="font-medium">5 questions</span> • <span className="font-medium">Quick & Fun</span> • <span className="font-medium">Instant rewards</span>
          </div>
        </div>

        {/* Start Card */}
        <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Ready to Begin?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Enter your name to start your Python adventure
            </p>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 sm:h-14 text-base sm:text-lg text-center font-medium border-2 focus:border-primary/50"
                maxLength={20}
                autoFocus
              />
            </div>
            
            <Button
              onClick={handleStart}
              disabled={!playerName.trim()}
              size="lg"
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Play className="h-5 w-5" />
              Start Quiz
            </Button>
            
            <div className="text-xs sm:text-sm text-center text-muted-foreground/70">
              🏆 Complete all questions to unlock your reward!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StartScreen;