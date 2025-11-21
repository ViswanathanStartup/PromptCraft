// CLEAR Framework: Context, Length, Examples, Action, Requirements
export const analyzePrompt = (promptText) => {
  if (!promptText.trim()) return null;

  const text = promptText.trim();
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;

  // C - CONTEXT: Role, situation, constraints, background
  const contextScore = (() => {
    let score = 30;

    // Role/Perspective indicators
    const roleIndicators = ['you are', 'act as', 'imagine you', 'as a', 'role:', 'persona:', 'I am a', "I'm a"];
    const roleMatches = roleIndicators.filter(indicator => text.toLowerCase().includes(indicator.toLowerCase())).length;
    score += Math.min(roleMatches * 15, 25);

    // Situation/Background
    const situationTerms = ['background', 'context', 'situation', 'scenario', 'environment', 'industry', 'market', 'company', 'project'];
    const situationCount = situationTerms.filter(term => text.toLowerCase().includes(term.toLowerCase())).length;
    score += Math.min(situationCount * 6, 20);

    // Constraints
    const constraintTerms = ['budget', 'timeline', 'deadline', 'limitation', 'constraint', 'restriction', 'audience', 'target'];
    const constraintCount = constraintTerms.filter(term => text.toLowerCase().includes(term.toLowerCase())).length;
    score += Math.min(constraintCount * 8, 20);

    // Background knowledge
    if (words > 50) score += 10;
    if (words > 100) score += 15;

    return Math.max(0, Math.min(100, score));
  })();

  // L - LENGTH: Specific word count, format, time specifications
  const lengthScore = (() => {
    let score = 40;

    // Word count specifications
    const wordCountPatterns = [/\d+\s*words?/i, /\d+\s*characters?/i, /word count/i, /character count/i];
    const hasWordCount = wordCountPatterns.some(pattern => pattern.test(text));
    if (hasWordCount) score += 25;

    // Format constraints
    const formatConstraints = ['paragraph', 'bullet points', 'list', 'sentences', 'pages', 'sections'];
    const formatCount = formatConstraints.filter(term => text.toLowerCase().includes(term.toLowerCase())).length;
    score += Math.min(formatCount * 10, 25);

    // Time/Length specifications
    const timePatterns = [/\d+\s*minute/i, /\d+\s*second/i, /\d+\s*hour/i, /brief/i, /concise/i, /detailed/i, /comprehensive/i];
    const hasTimeSpec = timePatterns.some(pattern => pattern.test(text));
    if (hasTimeSpec) score += 15;

    // Explicit length terms
    const lengthTerms = ['length:', 'size:', 'scope:', 'keep it under', 'maximum', 'minimum', 'exactly'];
    const lengthCount = lengthTerms.filter(term => text.toLowerCase().includes(term.toLowerCase())).length;
    score += Math.min(lengthCount * 8, 15);

    return Math.max(0, Math.min(100, score));
  })();

  // E - EXAMPLES: Good/bad examples, format examples, tone examples
  const examplesScore = (() => {
    let score = 35;

    // Example indicators
    const exampleIndicators = ['example', 'for instance', 'such as', 'like this', 'e.g.', 'for example', 'similar to'];
    const exampleCount = exampleIndicators.filter(indicator => text.toLowerCase().includes(indicator.toLowerCase())).length;
    score += Math.min(exampleCount * 15, 30);

    // "Show don't tell" indicators
    const showIndicators = ['write something like', 'in this style', 'tone like', 'format like', 'similar to this'];
    const showCount = showIndicators.filter(indicator => text.toLowerCase().includes(indicator.toLowerCase())).length;
    score += Math.min(showCount * 12, 25);

    // Counter-example indicators
    const counterExamples = ["don't write like", 'avoid', 'not like', 'bad example', 'wrong'];
    const counterCount = counterExamples.filter(indicator => text.toLowerCase().includes(indicator.toLowerCase())).length;
    score += Math.min(counterCount * 10, 20);

    // Quoted examples
    const quoteCount = (text.match(/["']/g) || []).length;
    if (quoteCount >= 2) score += 15;

    return Math.max(0, Math.min(100, score));
  })();

  // A - ACTION: Strong, specific action verbs
  const actionScore = (() => {
    let score = 45;

    // Strong action verbs (from CLEAR framework)
    const strongVerbs = ['create', 'analyze', 'rewrite', 'summarize', 'list', 'compare', 'evaluate', 'recommend',
                          'draft', 'design', 'plan', 'calculate', 'develop', 'generate', 'write', 'explain',
                          'implement', 'optimize', 'build', 'construct'];
    const strongCount = strongVerbs.filter(verb => text.toLowerCase().includes(verb.toLowerCase())).length;
    score += Math.min(strongCount * 8, 35);

    // Weak/vague phrases (penalties)
    const weakPhrases = ['help me with', 'help me', 'think about', 'work on', 'do something about', 'make something'];
    const weakCount = weakPhrases.filter(phrase => text.toLowerCase().includes(phrase.toLowerCase())).length;
    score -= weakCount * 12;

    // Vague words (penalties)
    const vagueWords = ['better', 'good', 'nice', 'some', 'stuff', 'things'];
    const vagueCount = vagueWords.filter(word =>
      text.toLowerCase().includes(' ' + word + ' ') ||
      text.toLowerCase().includes(' ' + word + '.') ||
      text.toLowerCase().includes(' ' + word + ',')
    ).length;
    score -= vagueCount * 6;

    return Math.max(0, Math.min(100, score));
  })();

  // R - REQUIREMENTS: Must-haves, restrictions, format requirements
  const requirementsScore = (() => {
    let score = 40;

    // Must-have indicators
    const mustHaveTerms = ['must', 'required', 'requirement', 'essential', 'mandatory', 'necessary', 'critical', 'need to'];
    const mustHaveCount = mustHaveTerms.filter(term => text.toLowerCase().includes(term.toLowerCase())).length;
    score += Math.min(mustHaveCount * 8, 25);

    // Restriction indicators
    const restrictionTerms = ['should', 'avoid', 'exclude', "don't", 'not', 'restrict', 'limit', 'constraint', 'without'];
    const restrictionCount = restrictionTerms.filter(term => text.toLowerCase().includes(term.toLowerCase())).length;
    score += Math.min(restrictionCount * 6, 20);

    // Format requirements
    const formatTerms = ['format:', 'structure:', 'style:', 'output:', 'deliverable:', 'json', 'markdown', 'table', 'bullet'];
    const formatCount = formatTerms.filter(term => text.toLowerCase().includes(term.toLowerCase())).length;
    score += Math.min(formatCount * 7, 20);

    // Checklist indicators (requirements as lists)
    const checklistIndicators = ['requirements:', 'must include:', 'criteria:', 'specifications:', '•', '-', '*'];
    const hasChecklist = checklistIndicators.some(indicator => text.includes(indicator));
    if (hasChecklist) score += 20;

    // Numbers (specific requirements)
    const numberMatches = text.match(/\d+/g) || [];
    score += Math.min(numberMatches.length * 2, 15);

    return Math.max(0, Math.min(100, score));
  })();

  // Calculate overall score based on CLEAR components (equal weight)
  const overallScore = Math.round(
    (contextScore * 0.20) +      // C - Context
    (lengthScore * 0.20) +       // L - Length
    (examplesScore * 0.20) +     // E - Examples
    (actionScore * 0.20) +       // A - Action
    (requirementsScore * 0.20)   // R - Requirements
  );

  // Generate suggestions based on CLEAR framework
  const suggestions = [];

  if (contextScore < 70) {
    suggestions.push({
      type: 'error',
      category: 'Context (C)',
      text: 'Add role, situation, and background information.',
      example: 'Start with "As a [role], I need..." and include relevant background about your situation, constraints, and audience.'
    });
  }

  if (lengthScore < 70) {
    suggestions.push({
      type: 'warning',
      category: 'Length (L)',
      text: 'Specify exactly how much content you need.',
      example: 'Add specific requirements like "Write a 300-word blog post" or "Keep it under 100 words" or "Three bullet points".'
    });
  }

  if (examplesScore < 70) {
    suggestions.push({
      type: 'info',
      category: 'Examples (E)',
      text: 'Show, don\'t just tell. Provide examples of what you want.',
      example: 'Include examples like: "Write something like this: [example]" or demonstrate the tone/style you want.'
    });
  }

  if (actionScore < 70) {
    suggestions.push({
      type: 'error',
      category: 'Action (A)',
      text: 'Use strong, specific action verbs instead of vague phrases.',
      example: 'Replace "help me with" with specific verbs like "create", "analyze", "rewrite", "summarize", or "list".'
    });
  }

  if (requirementsScore < 70) {
    suggestions.push({
      type: 'warning',
      category: 'Requirements (R)',
      text: 'Add a clear checklist of requirements and constraints.',
      example: 'End with "Requirements:" followed by bullet points listing must-haves, restrictions, tone, and format needs.'
    });
  }

  // Add positive reinforcement for high scores
  if (overallScore >= 80) {
    suggestions.unshift({
      type: 'success',
      category: 'CLEAR Prompt',
      text: 'Excellent prompt quality! This follows the CLEAR framework well.',
      example: 'Your prompt should get you 80% of what you want on the first try.'
    });
  }

  return {
    overallScore,
    scores: {
      context: contextScore,      // C
      length: lengthScore,         // L
      examples: examplesScore,     // E
      action: actionScore,         // A
      requirements: requirementsScore  // R
    },
    suggestions,
    stats: { words, sentences, characters: text.length }
  };
};