interface QuestionCardProps {
  question: string;
  options: string[];
  onSelect: (optionIndex: number) => void;
}

const QuestionCard = ({ question, options, onSelect }: QuestionCardProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-card border border-border rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground leading-relaxed">
        {question}
      </h2>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className="w-full p-4 text-left bg-background border border-border rounded-lg text-foreground transition-all duration-200 hover:bg-accent hover:border-accent-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;