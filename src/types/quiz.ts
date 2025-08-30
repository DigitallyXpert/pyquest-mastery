export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topic: string;
  codeExample?: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: (number | null)[];
  score: number;
  isCompleted: boolean;
  startTime: Date;
  endTime?: Date;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  correctAnswers: number[];
  incorrectAnswers: number[];
}