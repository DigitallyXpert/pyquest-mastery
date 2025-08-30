import { Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HeaderProps {
  name: string;
  onNameChange: (name: string) => void;
}

const Header = ({ name, onNameChange }: HeaderProps) => {
  return (
    <header className="w-full bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left side - Title and subtitle */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Daily Python Quiz
              </h1>
              <Heart 
                className="h-5 w-5 sm:h-6 sm:w-6 text-destructive fill-destructive" 
                aria-hidden="true"
              />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Short, sweet — new set every day
            </p>
          </div>

          {/* Right side - Name input */}
          <div className="flex-shrink-0 w-full sm:w-auto sm:max-w-48">
            <div className="space-y-1">
              <Label 
                htmlFor="user-name" 
                className="text-xs font-medium text-muted-foreground"
              >
                Your name
              </Label>
              <Input
                id="user-name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                className="h-9 text-sm"
                autoComplete="given-name"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;