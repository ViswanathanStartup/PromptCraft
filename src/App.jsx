import { useState, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Components
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import AnalyzerTab from './components/AnalyzerTab';
import TemplatesTab from './components/TemplatesTab';
import HistoryTab from './components/HistoryTab';
import FavoritesTab from './components/FavoritesTab';
import LearnTab from './components/LearnTab';
import FeedbackModal from './components/FeedbackModal';
import { CopySuccessNotification, FeedbackSubmittedNotification } from './components/Notifications';

// Utils and Hooks
import { analyzePrompt } from './utils/promptAnalyzer';
import { optimizePrompt } from './utils/promptOptimizer';
import { usePromptHistory, useFavorites, useCompletedLessons } from './hooks/useLocalStorage';

const INDUSTRY_STANDARD = 85;

function App() {
  // State Management
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('analyzer');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Notifications
  const [copySuccess, setCopySuccess] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  // Feedback Modal
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  // Custom Hooks
  const { history, addToHistory, removeFromHistory, clearHistory } = usePromptHistory();
  const { favorites, isFavorited, toggleFavorite, removeFromFavorites, clearFavorites } = useFavorites();
  const { completedLessons, markLessonComplete } = useCompletedLessons();

  // Real-time analysis using useMemo
  const analysis = useMemo(() => {
    if (prompt.trim()) {
      return analyzePrompt(prompt);
    }
    return null;
  }, [prompt]);

  // Handle prompt optimization
  const handleOptimize = () => {
    if (!prompt.trim()) return;

    // Check current score - only optimize if below industry standard
    if (analysis && analysis.overallScore >= INDUSTRY_STANDARD) {
      return; // Already optimized
    }

    const optimizationResult = optimizePrompt(prompt, INDUSTRY_STANDARD);

    if (optimizationResult) {
      // Update current prompt with optimized version
      setPrompt(optimizationResult.optimizedPrompt);
    }
  };

  // Handle loading prompts (from templates, history, etc.)
  const handleLoadPrompt = (promptText) => {
    setPrompt(promptText);
    setActiveTab('analyzer'); // Switch to analyzer tab
  };

  // Handle copying to clipboard
  const handleCopyToClipboard = async (text = prompt) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Handle copy success notification with timeout
  const handleCopySuccess = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Handle saving to history
  const handleSaveToHistory = () => {
    if (prompt.trim() && analysis) {
      addToHistory(prompt, analysis);
    }
  };

  // Handle favorite toggling with refresh callback
  const handleToggleFavorite = (item, type) => {
    return toggleFavorite(item, type);
  };

  // Feedback submission
  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) return;

    // EmailJS Configuration
    const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
    const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
    const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS Public Key

    try {
      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          message: feedback,
          to_email: 'humanxai2025@gmail.com',
          from_name: 'Prompt Craft User',
          timestamp: new Date().toLocaleString()
        },
        publicKey
      );

      // Show success notification
      setFeedbackSubmitted(true);
      setShowFeedback(false);
      setFeedback('');
      setTimeout(() => setFeedbackSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to send feedback:', error);
      alert('Failed to send feedback. Please try again.');
    }
  };

  // Handle lesson completion
  const handleLessonComplete = (lessonId) => {
    markLessonComplete(lessonId);
  };

  // Handle template/example usage from learn tab
  const handleTryExample = (examplePrompt) => {
    setPrompt(examplePrompt);
    setActiveTab('analyzer');
  };

  // Navigate to templates from learn tab
  const handleNavigateToTemplates = () => {
    setActiveTab('templates');
  };

  // Refresh function for state updates
  const handleRefresh = () => {
    // This can be used to trigger re-renders if needed
    // Currently not needed as React handles state updates automatically
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'analyzer':
        return (
          <AnalyzerTab
            prompt={prompt}
            setPrompt={setPrompt}
            analysis={analysis}
            onOptimize={handleOptimize}
            onCopyToClipboard={handleCopyToClipboard}
            onToggleFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
            onSaveToHistory={handleSaveToHistory}
            favorites={favorites}
            INDUSTRY_STANDARD={INDUSTRY_STANDARD}
          />
        );
      case 'templates':
        return (
          <TemplatesTab
            onLoadPrompt={handleLoadPrompt}
            onCopySuccess={handleCopySuccess}
            onToggleFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
          />
        );
      case 'history':
        return (
          <HistoryTab
            history={history}
            removeFromHistory={removeFromHistory}
            clearHistory={clearHistory}
            toggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
            onLoadPrompt={handleLoadPrompt}
            onCopySuccess={handleCopySuccess}
          />
        );
      case 'favorites':
        return (
          <FavoritesTab
            favorites={favorites}
            removeFromFavorites={removeFromFavorites}
            clearFavorites={clearFavorites}
            onLoadPrompt={handleLoadPrompt}
            onCopySuccess={handleCopySuccess}
            onLoadTemplate={handleLoadPrompt}
          />
        );
      case 'learn':
        return (
          <LearnTab
            completedLessons={completedLessons}
            onLessonComplete={handleLessonComplete}
            onTryExample={handleTryExample}
            onNavigateToTemplates={handleNavigateToTemplates}
          />
        );
      default:
        return (
          <AnalyzerTab
            prompt={prompt}
            setPrompt={setPrompt}
            analysis={analysis}
            onOptimize={handleOptimize}
            onCopyToClipboard={handleCopyToClipboard}
            onToggleFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
            onSaveToHistory={handleSaveToHistory}
            favorites={favorites}
            INDUSTRY_STANDARD={INDUSTRY_STANDARD}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative z-10">
        {/* Header */}
        <Header
          onShowFeedback={() => setShowFeedback(true)}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          historyCount={history.length}
          favoritesCount={favorites.length}
        />

        {/* Tab Navigation - Desktop */}
        <div className="hidden md:block">
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            historyCount={history.length}
            favoritesCount={favorites.length}
            onShowFeedback={() => setShowFeedback(true)}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {renderActiveTab()}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3">
              <span className="text-slate-400 text-xs sm:text-sm">Built with</span>
              <span className="text-red-400 text-base sm:text-lg">❤️</span>
              <span className="text-slate-400 text-xs sm:text-sm">by</span>
              <span className="text-purple-400 font-semibold text-xs sm:text-sm">Sriram Srinivasan</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setShowFeedback(true)}
        className="fixed bottom-6 right-6 z-50 group"
        title="Send Feedback"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

          {/* Button */}
          <div className="relative flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6 py-4 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-purple-500/50">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold text-sm hidden sm:inline">Feedback</span>
          </div>
        </div>
      </button>

      {/* Modals and Notifications */}
      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        feedback={feedback}
        setFeedback={setFeedback}
        onSubmit={handleSubmitFeedback}
      />

      <CopySuccessNotification
        isVisible={copySuccess}
        onClose={() => setCopySuccess(false)}
      />

      <FeedbackSubmittedNotification
        isVisible={feedbackSubmitted}
        onClose={() => setFeedbackSubmitted(false)}
      />
    </div>
  );
}

export default App;