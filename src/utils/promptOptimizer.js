import { analyzePrompt } from './promptAnalyzer.js';

// CLEAR Framework Optimizer: Transforms prompts to follow Context, Length, Examples, Action, Requirements
export const optimizePrompt = (prompt, INDUSTRY_STANDARD = 85) => {
  if (!prompt.trim()) return null;

  const currentAnalysis = analyzePrompt(prompt);

  if (currentAnalysis.overallScore >= INDUSTRY_STANDARD) {
    return null; // Already optimized
  }

  const original = prompt.trim();
  const sections = [];

  // Helper to detect strong action verbs
  const strongVerbs = ['create', 'analyze', 'write', 'develop', 'design', 'build', 'generate', 'explain',
                       'summarize', 'compare', 'evaluate', 'list', 'draft', 'plan', 'calculate', 'rewrite'];
  const hasStrongVerb = strongVerbs.some(verb => original.toLowerCase().includes(verb));

  // Detect if prompt has weak action phrases
  const weakPhrases = ['help me', 'can you', 'please', 'i need', 'i want'];
  const hasWeakPhrase = weakPhrases.some(phrase => original.toLowerCase().includes(phrase));

  // Extract or infer the core action
  let coreAction = original;
  if (hasWeakPhrase) {
    // Try to extract what they actually want
    coreAction = original.replace(/^(help me|can you|please|i need|i want)\s*(to\s*)?/i, '').trim();
    // Capitalize first letter
    coreAction = coreAction.charAt(0).toUpperCase() + coreAction.slice(1);
  }

  // C - CONTEXT: Add if missing (score < 80 for more aggressive optimization)
  if (currentAnalysis.scores.context < 80) {
    const hasRole = /you are|act as|as a|i am a|i'm a/i.test(original);
    if (!hasRole) {
      // Infer domain from prompt content
      let domain = 'professional';
      if (/market|business|sales|revenue|strategy/i.test(original)) domain = 'business strategist';
      else if (/code|program|software|develop|debug|api/i.test(original)) domain = 'senior software engineer';
      else if (/design|ux|ui|user|interface/i.test(original)) domain = 'UX/UI designer';
      else if (/write|content|blog|article|copy/i.test(original)) domain = 'content strategist';
      else if (/data|analysis|analytics|statistics/i.test(original)) domain = 'data analyst';

      sections.push(`**Context:** You are an experienced ${domain} with deep expertise in your field. You understand industry best practices, current trends, and can tailor your output for the specific audience and situation.`);
    } else {
      // Keep the existing role but enhance it
      const roleText = original.split(/\n\n/)[0];
      sections.push(`**Context:** ${roleText}`);
    }
  }

  // L - LENGTH: Add if missing (score < 80)
  if (currentAnalysis.scores.length < 80) {
    const wordCount = currentAnalysis.stats.words;
    let suggestedLength = '300-500 words with clear sections';

    if (wordCount < 20) suggestedLength = '200-300 words, structured in 3-4 paragraphs';
    else if (/brief|short|concise|summary/i.test(original)) suggestedLength = '150-200 words, concise and to-the-point';
    else if (/detailed|comprehensive|thorough|in-depth/i.test(original)) suggestedLength = '500-800 words with detailed sections';

    sections.push(`**Length:** Provide a response of approximately ${suggestedLength}. Use bullet points for lists and clear formatting for readability.`);
  }

  // E - EXAMPLES: Add if missing (score < 80)
  if (currentAnalysis.scores.examples < 80) {
    let exampleText = 'Use a professional but accessible tone. For example, when explaining concepts, use clear analogies and concrete examples.';

    if (/technical|code|programming/i.test(original)) {
      exampleText = 'Use clear, technical language with specific code examples. For instance: "This function iterates through the array and returns the filtered results." Include practical examples that demonstrate the concept.';
    } else if (/business|strategy|market/i.test(original)) {
      exampleText = 'Use business-focused language with data-driven examples. For instance: "Based on market analysis, we recommend increasing digital spend by 20%." Support recommendations with concrete numbers and case studies.';
    } else if (/creative|content|writing/i.test(original)) {
      exampleText = 'Use engaging, creative language. For example: "Imagine a world where your customers feel truly heard..." Make it compelling with vivid examples and relatable scenarios.';
    }

    sections.push(`**Examples:** ${exampleText} Include specific examples such as industry benchmarks, case studies, or similar successful implementations.`);
  }

  // A - ACTION: Enhance with strong verbs (score < 80)
  let actionSection = '';
  if (currentAnalysis.scores.action < 80) {
    if (!hasStrongVerb || hasWeakPhrase) {
      // Replace weak phrase with strong action verb
      let strongAction = coreAction;
      if (!/^(create|analyze|write|develop|design|build|generate|explain|summarize|compare|evaluate|list|draft|plan|calculate|implement)/i.test(strongAction)) {
        // Add a strong verb
        if (/about|on|regarding/i.test(strongAction)) {
          strongAction = 'Analyze and create a comprehensive response about ' + strongAction.toLowerCase();
        } else {
          strongAction = 'Develop and provide ' + strongAction.toLowerCase();
        }
      }
      actionSection = `**Action:** ${strongAction.charAt(0).toUpperCase() + strongAction.slice(1)}. Ensure the response is specific, actionable, and directly addresses the core request.`;
    } else {
      actionSection = `**Action:** ${coreAction}. Provide clear, specific, and actionable results.`;
    }
  } else {
    actionSection = `**Action:** ${coreAction}`;
  }
  if (actionSection) sections.push(actionSection);

  // R - REQUIREMENTS: Add comprehensive checklist (score < 80)
  if (currentAnalysis.scores.requirements < 80) {
    const requirements = [];

    // Add must-haves
    requirements.push('Include specific, actionable insights and clear recommendations');
    requirements.push('Support all claims with evidence, data, examples, or industry standards');
    requirements.push('Use clear section headers, bullet points, and organized formatting');

    // Add format requirements
    if (/list|bullet/i.test(original)) {
      requirements.push('Format as a well-organized bulleted list with clear categories and subcategories');
    } else {
      requirements.push('Structure with clear paragraphs, logical flow, and smooth transitions between sections');
    }

    // Add tone requirements
    const professionalLevel = /formal|professional|executive/i.test(original) ? 'formal and professional' :
                               /casual|friendly/i.test(original) ? 'conversational and friendly' :
                               'professional yet accessible';
    requirements.push(`Maintain a ${professionalLevel} tone throughout, appropriate for the target audience`);

    // Add quality standards
    requirements.push('Ensure accuracy, attention to detail, and industry-standard quality');
    requirements.push('Provide practical, implementable suggestions where applicable');
    requirements.push('Conclude with key takeaways, action items, or recommended next steps');

    sections.push(`**Requirements:**\n${requirements.map(req => `• ${req}`).join('\n')}`);
  }

  // Combine all sections into optimized prompt
  let optimized = sections.join('\n\n');

  // Validate that the optimized prompt reaches industry standard
  let optimizedAnalysis = analyzePrompt(optimized);

  // If still below target, add additional enhancement
  if (optimizedAnalysis.overallScore < INDUSTRY_STANDARD) {
    const additionalEnhancements = [];

    // Add more context if needed
    if (optimizedAnalysis.scores.context < 75) {
      additionalEnhancements.push('Background information and relevant constraints should be considered when formulating the response.');
    }

    // Add more examples if needed
    if (optimizedAnalysis.scores.examples < 75) {
      additionalEnhancements.push('Include concrete examples similar to: "For instance, when implementing this approach..." to illustrate key points effectively.');
    }

    // Add more requirements if needed
    if (optimizedAnalysis.scores.requirements < 75) {
      additionalEnhancements.push('Additional requirements: Prioritize clarity and completeness. Ensure all aspects are thoroughly addressed with attention to detail.');
    }

    if (additionalEnhancements.length > 0) {
      optimized += '\n\n' + additionalEnhancements.join('\n\n');
      optimizedAnalysis = analyzePrompt(optimized);
    }
  }

  return {
    originalPrompt: original,
    optimizedPrompt: optimized,
    originalAnalysis: currentAnalysis,
    optimizedAnalysis: optimizedAnalysis
  };
};