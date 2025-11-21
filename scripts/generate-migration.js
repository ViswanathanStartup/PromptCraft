const fs = require('fs');
const path = require('path');

// Read the prompts.json file
const promptsPath = path.join(__dirname, '..', 'src', 'data', 'prompts.json');
const prompts = JSON.parse(fs.readFileSync(promptsPath, 'utf8'));

// Map categories
const categoryMapping = {
  'development': 'DEVELOPMENT',
  'general': 'GENERAL',
  'business': 'BUSINESS',
  'creative': 'CREATIVE',
  'education': 'EDUCATION',
  'language': 'LANGUAGE',
  'entertainment': 'ENTERTAINMENT',
  'productivity': 'PRODUCTIVITY',
};

function guessCategory(act, prompt, forDevs) {
  const text = (act + ' ' + prompt).toLowerCase();
  
  if (forDevs) return 'DEVELOPMENT';
  if (text.includes('translate') || text.includes('language') || text.includes('pronunciation')) return 'LANGUAGE';
  if (text.includes('teacher') || text.includes('learn') || text.includes('education')) return 'EDUCATION';
  if (text.includes('business') || text.includes('interview') || text.includes('advertis')) return 'BUSINESS';
  if (text.includes('story') || text.includes('poet') || text.includes('creative') || text.includes('rapper')) return 'CREATIVE';
  if (text.includes('excel') || text.includes('productivity')) return 'PRODUCTIVITY';
  if (text.includes('game') || text.includes('entertain') || text.includes('comedian')) return 'ENTERTAINMENT';
  
  return 'GENERAL';
}

// Generate SQL INSERT statements
let sql = `-- Migration generated from prompts.json
-- Total templates: ${prompts.length}

INSERT INTO templates (title, content, category, for_devs, is_public, is_official, user_id) VALUES\n`;

const values = prompts.map((prompt, index) => {
  const title = prompt.act.replace(/'/g, "''");
  const content = prompt.content || prompt.prompt.replace(/'/g, "''");
  const category = guessCategory(prompt.act, content, prompt.for_devs);
  const forDevs = prompt.for_devs ? 'TRUE' : 'FALSE';
  
  return `('${title}', '${content}', '${category}', ${forDevs}, TRUE, TRUE, NULL)`;
});

sql += values.join(',\n') + ';\n';

// Write to migration file
const outputPath = path.join(__dirname, '..', 'backend', 'src', 'main', 'resources', 'db', 'migration', 'V3__Seed_All_Templates.sql');
fs.writeFileSync(outputPath, sql);

console.log(`✅ Generated migration file with ${prompts.length} templates`);
console.log(`📝 File: ${outputPath}`);
console.log('\nRun the backend to apply this migration automatically!');
