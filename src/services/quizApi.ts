import { Question } from '@/types/quiz';

// Mock data for development - replace with actual Streamlit API calls
const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the correct way to define a function in Python?',
    options: [
      'function myFunc():',
      'def myFunc():',
      'define myFunc():',
      'func myFunc():'
    ],
    correctAnswer: 1,
    explanation: 'In Python, functions are defined using the "def" keyword followed by the function name and parentheses.',
    difficulty: 'beginner',
    topic: 'Functions'
  },
  {
    id: '2',
    question: 'Which of the following is used to create a list in Python?',
    options: [
      '{}',
      '()',
      '[]',
      '<>'
    ],
    correctAnswer: 2,
    explanation: 'Square brackets [] are used to create lists in Python. Curly braces {} create dictionaries or sets, and parentheses () create tuples.',
    difficulty: 'beginner',
    topic: 'Data Types'
  },
  {
    id: '3',
    question: 'What will be the output of: print(len("Python"))?',
    options: [
      '5',
      '6',
      '7',
      'Error'
    ],
    correctAnswer: 1,
    explanation: 'The len() function returns the length of a string. "Python" has 6 characters, so the output will be 6.',
    difficulty: 'beginner',
    topic: 'Built-in Functions'
  },
  {
    id: '4',
    question: 'Which method is used to add an element to the end of a list?',
    options: [
      'add()',
      'append()',
      'insert()',
      'push()'
    ],
    correctAnswer: 1,
    explanation: 'The append() method adds an element to the end of a list. insert() can add at any position, add() is for sets, and push() is not a Python method.',
    difficulty: 'intermediate',
    topic: 'Lists'
  },
  {
    id: '5',
    question: 'What is the output of: print(2 ** 3)?',
    options: [
      '6',
      '8',
      '9',
      '23'
    ],
    correctAnswer: 1,
    explanation: 'The ** operator is used for exponentiation in Python. 2 ** 3 means 2 raised to the power of 3, which equals 8.',
    difficulty: 'beginner',
    topic: 'Operators',
    codeExample: 'result = 2 ** 3\nprint(result)  # Output: 8'
  }
];

export class QuizApiService {
  // This would be your Streamlit API endpoint
  private baseUrl = 'http://localhost:8501/api'; // Replace with your Streamlit API URL

  async getQuestions(difficulty?: string, topic?: string): Promise<Question[]> {
    try {
      // For now, return mock data
      // In production, replace with actual API call:
      // const response = await fetch(`${this.baseUrl}/questions?difficulty=${difficulty}&topic=${topic}`);
      // return await response.json();
      
      let filteredQuestions = mockQuestions;
      
      if (difficulty) {
        filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
      }
      
      if (topic) {
        filteredQuestions = filteredQuestions.filter(q => q.topic === topic);
      }
      
      return filteredQuestions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Failed to fetch quiz questions');
    }
  }

  async submitQuizResult(score: number, totalQuestions: number, timeTaken: number): Promise<void> {
    try {
      // In production, send results to your Streamlit backend:
      // await fetch(`${this.baseUrl}/submit-result`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ score, totalQuestions, timeTaken })
      // });
      
      console.log('Quiz result submitted:', { score, totalQuestions, timeTaken });
    } catch (error) {
      console.error('Error submitting result:', error);
      throw new Error('Failed to submit quiz result');
    }
  }

  async getTopics(): Promise<string[]> {
    // Return available topics
    return ['Functions', 'Data Types', 'Built-in Functions', 'Lists', 'Operators', 'Loops', 'Conditionals', 'Classes'];
  }
}

export const quizApi = new QuizApiService();