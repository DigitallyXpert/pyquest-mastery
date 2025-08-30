import { useState, useEffect } from 'react';
import { Question, QuizState, QuizResult } from '@/types/quiz';
import { quizApi } from '@/services/quizApi';

export const useQuiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: [],
    score: 0,
    isCompleted: false,
    startTime: new Date()
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = async (difficulty?: string, topic?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const questions = await quizApi.getQuestions(difficulty, topic);
      setQuizState({
        questions,
        currentQuestionIndex: 0,
        selectedAnswers: new Array(questions.length).fill(null),
        score: 0,
        isCompleted: false,
        startTime: new Date()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const selectAnswer = (answerIndex: number) => {
    if (quizState.isCompleted) return;

    const newSelectedAnswers = [...quizState.selectedAnswers];
    newSelectedAnswers[quizState.currentQuestionIndex] = answerIndex;
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: newSelectedAnswers
    }));
  };

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const previousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const completeQuiz = async (): Promise<QuizResult> => {
    const correctAnswers: number[] = [];
    const incorrectAnswers: number[] = [];
    let score = 0;

    quizState.questions.forEach((question, index) => {
      const selectedAnswer = quizState.selectedAnswers[index];
      if (selectedAnswer === question.correctAnswer) {
        score++;
        correctAnswers.push(index);
      } else {
        incorrectAnswers.push(index);
      }
    });

    const endTime = new Date();
    const timeTaken = Math.floor((endTime.getTime() - quizState.startTime.getTime()) / 1000);
    const percentage = Math.round((score / quizState.questions.length) * 100);

    const result: QuizResult = {
      score,
      totalQuestions: quizState.questions.length,
      percentage,
      timeTaken,
      correctAnswers,
      incorrectAnswers
    };

    setQuizState(prev => ({
      ...prev,
      score,
      isCompleted: true,
      endTime
    }));

    // Submit result to backend
    try {
      await quizApi.submitQuizResult(score, quizState.questions.length, timeTaken);
    } catch (err) {
      console.error('Failed to submit quiz result:', err);
    }

    return result;
  };

  const resetQuiz = () => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswers: [],
      score: 0,
      isCompleted: false,
      startTime: new Date()
    });
    setError(null);
  };

  return {
    quizState,
    isLoading,
    error,
    loadQuestions,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz
  };
};