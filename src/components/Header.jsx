import { Brain, MessageCircle, Menu, X } from 'lucide-react';
import TabNavigation from './TabNavigation';

const Header = ({ 
  onShowFeedback, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  activeTab,
  setActiveTab,
  historyCount,
  favoritesCount,
  showComparison = false
}) => {
  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg blur-md opacity-50"></div>
              <Brain className="relative w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                PromptCraft
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">AI Prompt Engineering</p>
            </div>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/40 backdrop-blur-sm border-t border-white/10">
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            historyCount={historyCount}
            favoritesCount={favoritesCount}
            onShowFeedback={onShowFeedback}
            setMobileMenuOpen={setMobileMenuOpen}
            isMobile={true}
            showComparison={showComparison}
          />
        </div>
      )}
    </header>
  );
};

export default Header;