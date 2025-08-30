import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Play, BookOpen, Target, Clock } from 'lucide-react';
import { quizApi } from '@/services/quizApi';

interface QuizSetupProps {
  onStartQuiz: (difficulty?: string, topic?: string) => void;
  isLoading: boolean;
}

export const QuizSetup = ({ onStartQuiz, isLoading }: QuizSetupProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const availableTopics = await quizApi.getTopics();
        setTopics(availableTopics);
      } catch (error) {
        console.error('Failed to load topics:', error);
      }
    };
    loadTopics();
  }, []);

  const handleStartQuiz = () => {
    onStartQuiz(
      selectedDifficulty || undefined,
      selectedTopic || undefined
    );
  };

  const difficulties = [
    { value: 'beginner', label: 'Beginner', description: 'Basic Python concepts' },
    { value: 'intermediate', label: 'Intermediate', description: 'More complex topics' },
    { value: 'advanced', label: 'Advanced', description: 'Expert-level questions' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Python Learning Quiz</CardTitle>
          <p className="text-lg text-muted-foreground">
            Test your Python knowledge with our interactive quiz
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-accent" />
              <div className="font-semibold">Multiple Choice</div>
              <div className="text-sm text-muted-foreground">
                Select the best answer
              </div>
            </div>

            <div className="text-center p-4 bg-info/10 rounded-lg">
              <Clock className="h-6 w-6 mx-auto mb-2 text-info" />
              <div className="font-semibold">Timed Practice</div>
              <div className="text-sm text-muted-foreground">
                Track your progress
              </div>
            </div>

            <div className="text-center p-4 bg-success/10 rounded-lg">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-success" />
              <div className="font-semibold">Instant Feedback</div>
              <div className="text-sm text-muted-foreground">
                Learn from explanations
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Difficulty Level (Optional)
              </label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff.value} value={diff.value}>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            diff.value === 'beginner'
                              ? 'bg-success text-success-foreground'
                              : diff.value === 'intermediate'
                              ? 'bg-warning text-warning-foreground'
                              : 'bg-destructive text-destructive-foreground'
                          }
                        >
                          {diff.label}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {diff.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Topic (Optional)
              </label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleStartQuiz}
              disabled={isLoading}
              size="lg"
              className="flex items-center gap-2"
            >
              <Play className="h-5 w-5" />
              {isLoading ? 'Loading Questions...' : 'Start Quiz'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};