import { useState, useEffect } from 'react';

interface DataLoaderResult {
  questions: any[] | null;
  rewards: any[] | null;
  error: string | null;
}

const useDataLoader = (): DataLoaderResult => {
  const [questions, setQuestions] = useState<any[] | null>(null);
  const [rewards, setRewards] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        
        // Determine base URL with fallback chain
        const streamlitBase = process.env.REACT_APP_STREAMLIT_BASE;
        const githubRaw = process.env.REACT_APP_GITHUB_RAW;
        const baseUrl = streamlitBase || githubRaw || '';
        
        const questionsUrl = baseUrl ? `${baseUrl}/questions.json` : '/questions.json';
        const rewardsUrl = baseUrl ? `${baseUrl}/rewards.json` : '/rewards.json';

        // Fetch both files concurrently
        const [questionsResponse, rewardsResponse] = await Promise.all([
          fetch(questionsUrl, { cache: 'no-store' }),
          fetch(rewardsUrl, { cache: 'no-store' })
        ]);

        if (!questionsResponse.ok) {
          throw new Error(`Failed to fetch questions: ${questionsResponse.status}`);
        }
        
        if (!rewardsResponse.ok) {
          throw new Error(`Failed to fetch rewards: ${rewardsResponse.status}`);
        }

        const questionsData = await questionsResponse.json();
        const rewardsData = await rewardsResponse.json();

        setQuestions(questionsData);
        setRewards(rewardsData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
        setError(errorMessage);
        console.error('Data loading error:', err);
      }
    };

    fetchData();
  }, []);

  return { questions, rewards, error };
};

export default useDataLoader;