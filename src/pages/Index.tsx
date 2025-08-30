import { useState } from 'react';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';

const Index = () => {
  const [userName, setUserName] = useState<string>('');

  // Sample question data
  const sampleQuestion = "What is the correct way to define a function in Python?";
  const sampleOptions = [
    "function myFunc():",
    "def myFunc():",
    "define myFunc():",
    "func myFunc():"
  ];

  const handleOptionSelect = (optionIndex: number) => {
    console.log(`Selected option ${optionIndex}: ${sampleOptions[optionIndex]}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header name={userName} onNameChange={setUserName} />
      <div className="p-4 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <QuestionCard
          question={sampleQuestion}
          options={sampleOptions}
          onSelect={handleOptionSelect}
        />
      </div>
    </div>
  );
};

export default Index;
