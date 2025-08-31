import { Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HeaderProps {
  name: string;
  onNameChange: (name: string) => void;
}

const Header = ({ name, onNameChange }: HeaderProps) => {
  return (
    <header className="w-full bg-card border-b border-border px-3 py-3 sm:px-6 sm:py-4 safe-area-inset-top">
      <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Left side - Title and subtitle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">
                Daily Python Quiz
              </h1>
              <Heart 
                className="h-4 w-4 sm:h-5 sm:w-5 text-destructive fill-destructive flex-shrink-0" 
                aria-hidden="true"
              />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
              Short, sweet — new set every day
            </p>
          </div>

          {/* Right side - Name input */}
          <div className="flex-shrink-0 w-24 sm:w-32 lg:w-40">
            <Input
              id="user-name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="h-8 sm:h-10 text-xs sm:text-sm"
              autoComplete="given-name"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;