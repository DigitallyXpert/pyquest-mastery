interface QuestionCardProps {
  question: string;
  options: string[];
  onSelect: (optionIndex: number) => void;
  selectedOption?: number;
  showResult?: boolean;
  correctAnswer?: number;
}

const QuestionCard = ({ question, options, onSelect, selectedOption, showResult, correctAnswer }: QuestionCardProps) => {
  
  const getButtonStyle = (index: number) => {
    let baseStyle = "w-full p-4 sm:p-5 lg:p-6 text-left border rounded-lg text-sm sm:text-base lg:text-lg transition-all duration-300 min-h-[48px] sm:min-h-[56px] lg:min-h-[64px] font-medium";
    
    if (showResult && selectedOption !== undefined) {
      if (index === correctAnswer) {
        return `${baseStyle} bg-success/20 border-success text-success-foreground border-2`;
      } else if (index === selectedOption && index !== correctAnswer) {
        return `${baseStyle} bg-destructive/20 border-destructive text-destructive-foreground border-2`;
      } else {
        return `${baseStyle} bg-muted/50 border-muted-foreground/20 text-muted-foreground`;
      }
    }
    
    if (selectedOption === index) {
      return `${baseStyle} bg-primary/20 border-primary text-primary-foreground border-2`;
    }
    
    return `${baseStyle} bg-background border-border text-foreground hover:bg-accent hover:border-accent-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`;
  };

  return (
    <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl mx-auto bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 safe-area-inset-x shadow-lg">
      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-foreground leading-relaxed">
        {question}
      </h2>
      
      <div className="space-y-2 sm:space-y-3">
        {options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
          return (
            <button
              key={index}
              onClick={() => !showResult && onSelect(index)}
              disabled={showResult}
              className={getButtonStyle(index)}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 text-primary text-xs sm:text-sm font-bold flex items-center justify-center">
                  {optionLetter}
                </span>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;