import { CheckCircle, Heart, X } from 'lucide-react';

export const CopySuccessNotification = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-down">
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-xl shadow-glow-lg backdrop-blur-sm border border-emerald-400/20 flex items-center gap-3 min-w-[300px]">
        <div className="bg-white/20 p-2 rounded-lg">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">Success!</p>
          <p className="text-xs text-emerald-50">Copied to clipboard</p>
        </div>
        <button 
          onClick={onClose}
          className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const FeedbackSubmittedNotification = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-down">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4 rounded-xl shadow-glow-lg backdrop-blur-sm border border-indigo-400/20 flex items-center gap-3 min-w-[300px]">
        <div className="bg-white/20 p-2 rounded-lg">
          <Heart className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">Thank you!</p>
          <p className="text-xs text-indigo-50">Feedback submitted successfully</p>
        </div>
        <button 
          onClick={onClose}
          className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};