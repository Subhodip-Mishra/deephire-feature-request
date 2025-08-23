import { Brain } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-professional-surface border-b border-professional-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section: Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-professional-accent rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-professional-text">DeepHireAI</h1>
            <p className="text-sm text-professional-text-light">Feature Requests</p>
          </div>
        </div>

        {/* Right Section: Badge */}
        <span className="text-sm font-medium text-professional-text-light bg-professional-bg px-3 py-1 rounded-full border border-professional-border shadow-sm">
          💡 Your Ideas Matter
        </span>
      </div>
    </header>
  );
};

export default Header;
