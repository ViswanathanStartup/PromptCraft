import { Inbox, Star, History, Search, BookOpen } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = Inbox, 
  title, 
  description, 
  actionLabel, 
  onAction,
  variant = 'default'
}) => {
  const variants = {
    default: 'from-slate-500/10 to-slate-600/10 border-slate-500/20',
    history: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20',
    favorites: 'from-red-500/10 to-pink-500/10 border-red-500/20',
    search: 'from-purple-500/10 to-pink-500/10 border-purple-500/20',
    templates: 'from-emerald-500/10 to-green-500/10 border-emerald-500/20',
  };

  const iconColors = {
    default: 'text-slate-400',
    history: 'text-blue-400',
    favorites: 'text-red-400',
    search: 'text-purple-400',
    templates: 'text-emerald-400',
  };

  return (
    <div className={`bg-gradient-to-br ${variants[variant]} backdrop-blur-sm rounded-2xl p-12 border text-center animate-fade-in`}>
      <div className={`inline-flex p-6 bg-white/5 rounded-full mb-6 ${iconColors[variant]}`}>
        <Icon className="w-16 h-16" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-300 mb-6 max-w-md mx-auto">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-glow hover:scale-105 active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

// Pre-configured empty states
export const EmptyHistory = ({ onNavigateToAnalyzer }) => (
  <EmptyState
    icon={History}
    variant="history"
    title="No History Yet"
    description="Your analyzed prompts will appear here. Start by analyzing a prompt in the Analyzer tab!"
    actionLabel="Go to Analyzer"
    onAction={onNavigateToAnalyzer}
  />
);

export const EmptyFavorites = ({ onNavigateToTemplates }) => (
  <EmptyState
    icon={Star}
    variant="favorites"
    title="No Favorites Yet"
    description="Save your favorite prompts and templates here for quick access. Start by exploring templates or favoriting analyzed prompts!"
    actionLabel="Browse Templates"
    onAction={onNavigateToTemplates}
  />
);

export const EmptySearch = () => (
  <EmptyState
    icon={Search}
    variant="search"
    title="No Results Found"
    description="Try adjusting your search terms or filters to find what you're looking for."
  />
);

export const EmptyTemplates = () => (
  <EmptyState
    icon={BookOpen}
    variant="templates"
    title="No Templates Match Your Search"
    description="Try different keywords or clear your filters to see more templates."
  />
);

export default EmptyState;
