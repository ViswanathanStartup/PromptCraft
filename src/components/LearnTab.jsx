import {
  CheckCircle, XCircle, Lightbulb, Target, Zap, ArrowRight, Star, BookOpen
} from 'lucide-react';

// Progress Bar Component
const ProgressBar = ({ completedLessons, lessonsLength, getProgressPercentage }) => (
  <div className="max-w-md mx-auto mb-8">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-slate-400">Your Progress</span>
      <span className="text-sm text-purple-400 font-medium">{completedLessons.size}/{lessonsLength} lessons</span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-1000 ease-out"
        style={{ width: `${getProgressPercentage()}%` }}
      />
    </div>
    <div className="text-center mt-2">
      <span className="text-lg font-bold text-purple-400">{getProgressPercentage()}%</span>
      <span className="text-slate-400 text-sm ml-1">Complete</span>
    </div>
  </div>
);

// Completion Celebration Component
const CompletionCelebration = ({ onNavigateToTemplates }) => (
  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 text-center">
    <div className="mb-4">
      <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4 fill-yellow-400" />
      <h3 className="text-2xl font-bold text-white mb-2">🎉 Congratulations!</h3>
      <p className="text-green-400 text-lg">You&apos;ve mastered the CLEAR Framework!</p>
    </div>
    <p className="text-slate-300 text-sm mb-6">
      You&apos;re now ready to write professional-grade prompts that get you 80% of what you want on the first try. Keep practicing with the Analyzer and Templates!
    </p>
    <button
      onClick={onNavigateToTemplates}
      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
    >
      Explore 268+ Professional Templates
    </button>
  </div>
);

const LearnTab = ({
  completedLessons,
  onLessonComplete,
  onTryExample,
  onNavigateToTemplates
}) => {
  const lessons = [
    {
      id: 'clear-intro',
      title: 'The CLEAR Framework: Why It Matters',
      level: 'Essential',
      description: 'The difference between frustrating AI interactions and productive ones comes down to clarity. Learn the 5 essential elements that consistently make prompts work.',
      concepts: [
        'Why vague prompts lead to vague results',
        'How CLEAR unlocks AI\'s true potential',
        'The 5 elements: Context, Length, Examples, Action, Requirements',
        'Getting 80% of what you want on the first try',
        'CLEAR works for both AI and human communication'
      ],
      example: {
        bad: 'Make something about AI for my website',
        good: '**Context:** As a small business consultant, I\'m updating my website to show clients how AI can help their operations.\n\n**Length:** Write a 400-word blog post section.\n\n**Examples:** Use this approachable tone: "AI isn\'t just for tech giants anymore. Small businesses are using simple AI tools to save 10+ hours per week on routine tasks like scheduling, email responses, and data entry."\n\n**Action:** Create a compelling section that explains practical AI applications for small businesses.\n\n**Requirements:**\n• Focus on 3-5 specific, easy-to-implement AI tools\n• Include real time/cost savings estimates\n• Use simple, non-technical language\n• End with a clear call-to-action\n• Maintain an encouraging, accessible tone',
        explanation: 'This CLEAR prompt provides everything the AI needs: who you are (Context), what size output (Length), style examples (Examples), clear action verb (Action), and a detailed requirements checklist (Requirements).'
      }
    },
    {
      id: 'context',
      title: 'C - Context: Set the Stage',
      level: 'Beginner',
      description: 'Before asking for anything, give your AI assistant the context it needs to understand your situation. Context transforms generic responses into tailored solutions.',
      concepts: [
        'Your role or perspective: "As a marketing manager..." or "I\'m a college student..."',
        'The situation: What\'s happening that prompted this request?',
        'Constraints: Budget, timeline, audience, or other limitations',
        'Background knowledge: What does the AI need to know about your industry, company, or circumstances?',
        'Context helps AI understand WHY you need what you\'re asking for'
      ],
      example: {
        bad: 'Write a social media post about our product.',
        good: 'As a B2B SaaS marketing manager, I need a LinkedIn post announcing our new project management feature. Our audience is tech-savvy operations directors at mid-size companies. The feature launches next week and focuses on automation.',
        explanation: 'The improved version provides role (B2B SaaS marketing manager), platform (LinkedIn), audience (operations directors at mid-size companies), timing (next week), and feature focus (automation). This context ensures the AI writes appropriately for LinkedIn\'s professional tone and B2B audience.'
      }
    },
    {
      id: 'length-examples',
      title: 'L - Length & E - Examples',
      level: 'Beginner',
      description: 'Specify exactly how much content you need, and show the AI your preferred style. Examples are the most powerful tool in your prompt-writing arsenal.',
      concepts: [
        'Length: Word count ("300-word blog post"), format ("Three bullet points"), or time ("5-minute presentation")',
        'Avoid vague phrases like "make it short" - be specific!',
        'Examples: Show good examples of style and tone you want',
        'Examples: Show bad examples to avoid ("Don\'t write like this...")',
        'Examples: Provide format examples to demonstrate exact structure',
        'Examples help AI understand your expectations without guessing'
      ],
      example: {
        bad: 'Write a professional email. Make it short.',
        good: 'Write a 100-word professional email (maximum 2 paragraphs) in this style:\n\n"Hi Sarah, I hope you\'re doing well. I wanted to follow up on our conversation about the quarterly report. Could we schedule 15 minutes this week to discuss the timeline? Best regards, Alex"\n\nUse a warm but professional tone. Include a specific call-to-action.',
        explanation: 'Specifies exact length (100 words, 2 paragraphs max), provides a style example showing the desired tone, and includes format requirements (warm, professional, with CTA).'
      }
    },
    {
      id: 'action-requirements',
      title: 'A - Action & R - Requirements',
      level: 'Intermediate',
      description: 'Use strong action verbs to tell the AI exactly what to produce, then end with a clear checklist of requirements. This ensures nothing gets missed.',
      concepts: [
        'Action: Instead of "help me with" → "create," "analyze," "rewrite," "summarize"',
        'Action: Instead of "think about" → "list," "compare," "evaluate," "recommend"',
        'Action: Instead of "work on" → "draft," "design," "plan," "calculate"',
        'Requirements: Must-haves (non-negotiable elements)',
        'Requirements: Nice-to-haves (preferred but optional)',
        'Requirements: Restrictions (what to avoid or exclude)',
        'Requirements: Format requirements (specific styling or structure)'
      ],
      example: {
        bad: 'Help me with my presentation',
        good: '**Action:** Create an outline for a 10-minute presentation that compares three marketing automation tools for a team of sales managers.\n\n**Requirements:**\n• Include statistics from the last 5 years\n• Mention our three main competitors (HubSpot, Salesforce, Marketo)\n• Use a confident but not aggressive tone\n• Include exactly 3 actionable recommendations\n• Avoid technical jargon\n• Format as a bulleted list with clear sections',
        explanation: 'Uses strong action verb "Create" with specifics (10-minute, three tools, sales managers audience), followed by detailed requirements covering statistics, competitors, tone, deliverables, restrictions (no jargon), and format.'
      }
    },
    {
      id: 'clear-practice',
      title: 'Putting CLEAR Into Practice',
      level: 'Intermediate',
      description: 'See how the complete CLEAR Framework transforms vague prompts into precise instructions that get results. This is where everything comes together.',
      concepts: [
        'A well-crafted CLEAR prompt should get you 80% of what you want on the first try',
        'All five CLEAR elements working together create powerful prompts',
        'You can adapt CLEAR for any task: writing, analysis, coding, planning',
        'Start simple, then add CLEAR elements where results fall short',
        'CLEAR prompts force you to think clearly about what you actually need'
      ],
      example: {
        bad: 'Explain machine learning',
        good: '**Context:** I\'m preparing a presentation for non-technical business executives who want to understand if machine learning could benefit their operations.\n\n**Length:** Write a 200-word explanation.\n\n**Examples:** Use accessible analogies like: "Machine learning is like teaching a child to recognize animals - you show many examples until they can identify new ones on their own."\n\n**Action:** Explain machine learning in simple terms that connect to business value.\n\n**Requirements:**\n• Avoid technical jargon (no "algorithms," "neural networks," etc.)\n• Include 2-3 concrete business use cases\n• Focus on benefits, not technical mechanics\n• Use analogies and metaphors\n• End with one actionable takeaway',
        explanation: 'This complete CLEAR prompt addresses all five elements systematically. Context (presentation for executives), Length (200 words), Examples (analogy provided), Action (explain in simple terms), Requirements (6 specific must-haves including restrictions).'
      }
    },
    {
      id: 'advanced-techniques',
      title: 'Advanced CLEAR Techniques',
      level: 'Advanced',
      description: 'Master advanced prompting strategies to handle complex tasks: iterative refinement, chain-of-thought reasoning, and role-playing for specialized expertise.',
      concepts: [
        'Iterative Prompting: Start with basic CLEAR, get results, identify gaps, refine with more CLEAR',
        'Chain of Thought: Break complex tasks into CLEAR steps: "First, analyze... Then, create... Finally, format..."',
        'Role-Playing: Enhance Context by having AI adopt personas: "Act as a senior data scientist explaining to marketers..."',
        'Combined Techniques: Use all three together for maximum effectiveness',
        'When to iterate vs when to add more detail upfront'
      ],
      example: {
        bad: 'Help me solve this business problem',
        good: '**Context:** You are a management consultant using structured problem-solving.\n\n**Action:** Analyze this challenge step-by-step:\n\n**Problem:** Our customer retention rate has declined 15% in 6 months.\n\n**Analysis Framework (Chain of Thought):**\n1. Root cause analysis using the 5 Whys method\n2. Stakeholder impact assessment\n3. Solution brainstorming (minimum 5 options)\n4. Cost-benefit evaluation of top 3 solutions\n5. Implementation roadmap with timelines\n\n**Requirements:**\n• Show your reasoning process for each step\n• Include specific metrics and KPIs\n• Cite industry benchmarks where relevant\n• Present in executive summary format\n• Length: 800-1000 words',
        explanation: 'Combines role-playing (management consultant), chain-of-thought (5 sequential steps with specific method), and complete CLEAR structure. The "show reasoning" requirement ensures transparency in AI\'s thinking process.'
      }
    },
    {
      id: 'common-mistakes',
      title: 'Avoiding Common CLEAR Mistakes',
      level: 'Advanced',
      description: 'Learn the top mistakes that weaken prompts and how to fix them. Master the CLEAR checklist to consistently write effective prompts.',
      concepts: [
        '❌ Skipping Context: Always set the stage with background before requesting',
        '❌ Vague Length: Avoid "make it short" → use "100 words maximum" or "three paragraphs"',
        '❌ No Examples: Don\'t expect AI to guess your style - show examples',
        '❌ Weak Action Verbs: Replace "do something about" with "create," "analyze," "rewrite"',
        '❌ Missing Requirements: Specify tone, format, restrictions that matter',
        '✅ Your CLEAR Checklist: Context? Length? Examples? Action? Requirements?',
        'If you\'re constantly re-prompting, revisit your CLEAR elements'
      ],
      example: {
        bad: 'Create a report about sales. Make it good and professional.',
        good: '**Context:** As sales director, I\'m presenting Q4 results to the executive team.\n\n**Length:** 500-word executive summary + 5 key data visualizations.\n\n**Examples:** Structure similar to McKinsey reports:\n"Q4 Results: Despite market headwinds, sales grew 12% YoY through strategic account expansion..."\n\n**Action:** Create a comprehensive Q4 sales performance report.\n\n**Requirements:**\n• Include YoY and QoQ comparisons\n• Highlight top 3 wins and top 2 challenges\n• Data-driven insights (cite specific numbers)\n• Professional but accessible language\n• Visualizations: revenue trend, top accounts, regional breakdown, pipeline, win rate\n• Conclude with Q1 strategic recommendations',
        explanation: 'The improved version fixes all common mistakes: adds Context (role + audience), specifies exact Length (500 words + 5 visuals), provides Examples (McKinsey style), uses strong Action verb (Create comprehensive), and lists detailed Requirements (11 specific elements including format, metrics, and deliverables).'
      }
    }
  ];

  const getProgressPercentage = () => {
    return Math.round((completedLessons.size / lessons.length) * 100);
  };

  const LessonCard = ({ lesson, index, isCompleted }) => {
    const levelColor = lesson.level === 'Essential' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                     lesson.level === 'Beginner' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                     lesson.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                     'bg-red-500/20 text-red-400 border-red-500/30';

    return (
      <div
        className={'bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ' + (
          isCompleted
            ? 'border-green-500/50 bg-green-500/5'
            : 'border-white/10 hover:border-purple-500/30'
        )}
      >
        {/* Lesson Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ' + (
              isCompleted
                ? 'bg-green-600 text-white'
                : 'bg-slate-700 text-slate-300'
            )}>
              {isCompleted ? <CheckCircle className="w-5 h-5" /> : index + 1}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{lesson.title}</h3>
              <span className={'px-2 py-1 rounded-full text-xs font-medium border ' + levelColor}>
                {lesson.level}
              </span>
            </div>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Complete</span>
            </div>
          )}
        </div>

        {/* Lesson Description */}
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">{lesson.description}</p>

        {/* Key Concepts */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            Key Learnings
          </h4>
          <ul className="space-y-2">
            {lesson.concepts.map((concept, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2 leading-relaxed">
                <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                <span>{concept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Example Section */}
        <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-slate-700">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            Before vs After
          </h4>

          {/* Bad Example */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-xs font-semibold">❌ Unclear Prompt</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <code className="text-xs text-slate-200 leading-relaxed">{lesson.example.bad}</code>
            </div>
          </div>

          {/* Good Example */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs font-semibold">✅ CLEAR Prompt</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 max-h-64 overflow-y-auto">
              <code className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">{lesson.example.good}</code>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-blue-200 text-xs leading-relaxed"><strong>Why it works:</strong> {lesson.example.explanation}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onTryExample(lesson.example.good)}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <ArrowRight className="w-4 h-4" />
            Try This Example
          </button>
          {!isCompleted && (
            <button
              onClick={() => onLessonComplete(lesson.id)}
              className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <BookOpen className="w-8 h-8 text-purple-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Master the CLEAR Framework</h2>
        </div>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto mb-2">
          Learn the systematic approach to writing prompts that get you the results you want, every time.
        </p>
        <p className="text-purple-400 text-sm font-medium mb-6">
          A well-crafted CLEAR prompt should get you 80% of what you want on the first try.
        </p>

        <ProgressBar
          completedLessons={completedLessons}
          lessonsLength={lessons.length}
          getProgressPercentage={getProgressPercentage}
        />
      </div>

      {/* CLEAR Framework Overview */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 text-center">The CLEAR Framework</h3>
        <div className="grid sm:grid-cols-5 gap-3 text-center">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400 mb-1">C</div>
            <div className="text-white font-semibold text-sm mb-1">Context</div>
            <div className="text-slate-400 text-xs">Set the stage</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400 mb-1">L</div>
            <div className="text-white font-semibold text-sm mb-1">Length</div>
            <div className="text-slate-400 text-xs">Specify size</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-green-500/20">
            <div className="text-2xl font-bold text-green-400 mb-1">E</div>
            <div className="text-white font-semibold text-sm mb-1">Examples</div>
            <div className="text-slate-400 text-xs">Show style</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-400 mb-1">A</div>
            <div className="text-white font-semibold text-sm mb-1">Action</div>
            <div className="text-slate-400 text-xs">State clearly</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-red-500/20">
            <div className="text-2xl font-bold text-red-400 mb-1">R</div>
            <div className="text-white font-semibold text-sm mb-1">Requirements</div>
            <div className="text-slate-400 text-xs">List needs</div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.has(lesson.id);
          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>

      {/* Completion Celebration */}
      {completedLessons.size === lessons.length && <CompletionCelebration onNavigateToTemplates={onNavigateToTemplates} />}
    </div>
  );
};

export default LearnTab;
