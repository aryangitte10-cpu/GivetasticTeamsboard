import { Leaf } from 'lucide-react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse">
          <Leaf className="w-12 h-12 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
