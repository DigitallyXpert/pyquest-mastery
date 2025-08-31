import { useState, useEffect } from 'react';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  tip: string;
}

export interface Reward {
  minScore: number;
  message: string;
  badge: string;
  level: string;
}

export const useQuizData = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const [questionsResponse, rewardsResponse] = await Promise.all([
          fetch('/data/questions.json'),
          fetch('/data/rewards.json')
        ]);

        if (!questionsResponse.ok || !rewardsResponse.ok) {
          throw new Error('Failed to load quiz data');
        }

        const questionsData = await questionsResponse.json();
        const rewardsData = await rewardsResponse.json();

        setQuestions(questionsData.questions);
        setRewards(rewardsData.rewards);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz data');
        console.error('Error loading quiz data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getRewardForScore = (score: number): Reward => {
    const sortedRewards = rewards.sort((a, b) => b.minScore - a.minScore);
    return sortedRewards.find(reward => score >= reward.minScore) || rewards[rewards.length - 1];
  };

  return {
    questions,
    rewards,
    loading,
    error,
    getRewardForScore
  };
};