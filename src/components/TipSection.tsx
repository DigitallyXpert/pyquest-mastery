import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface TipSectionProps {
  tip: string;
}

const TipSection = ({ tip }: TipSectionProps) => {
  return (
    <Card className="border-l-4 border-l-primary bg-primary/5 border-primary/20">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
            {tip}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipSection;