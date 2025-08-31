interface QuestionCardProps {
  question: string;
  options: string[];
  onSelect: (optionIndex: number) => void;
}

const QuestionCard = ({ question, options, onSelect }: QuestionCardProps) => {
  return (
    <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl mx-auto bg-card border border-border rounded-lg p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 safe-area-inset-x">
      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-foreground leading-relaxed">
        {question}
      </h2>
      
      <div className="space-y-2 sm:space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className="w-full p-4 sm:p-5 lg:p-6 text-left bg-background border border-border rounded-lg text-sm sm:text-base lg:text-lg text-foreground transition-all duration-200 hover:bg-accent hover:border-accent-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background min-h-[48px] sm:min-h-[56px] lg:min-h-[64px]"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;