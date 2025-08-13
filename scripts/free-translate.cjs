const translate = require('translate-google');
const fs = require('fs').promises;
const path = require('path');

// Language mappings for translate-google
const languages = {
  es: 'es',      // Spanish
  fr: 'fr',      // French
  de: 'de',      // German
  it: 'it',      // Italian
  pt: 'pt',      // Portuguese
  ru: 'ru',      // Russian
  ja: 'ja',      // Japanese
  ko: 'ko',      // Korean
  zh: 'zh-cn',   // Chinese Simplified
};

async function translateText(text, targetLang) {
  try {
    // Handle interpolation variables like {{seconds}}
    const hasVariables = /\{\{.*?\}\}/.test(text);

    if (hasVariables) {
      const parts = text.split(/(\{\{.*?\}\})/);
      const translatedParts = await Promise.all(
        parts.map(async (part) => {
          if (/\{\{.*?\}\}/.test(part)) {
            return part;
          } else if (part.trim()) {
            return await translate(part, { from: 'en', to: targetLang });
          }
          return part;
        })
      );
      return translatedParts.join('');
    } else {
      return await translate(text, { from: 'en', to: targetLang });
    }
  } catch (error) {
    console.warn(`Warning: Failed to translate "${text}": ${error.message}`);
    return text;
  }
}

async function translateObject(obj, targetLang) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = await translateText(value, targetLang);
      await new Promise((resolve) => setTimeout(resolve, 100));
    } else if (typeof value === 'object' && value !== null) {
      result[key] = await translateObject(value, targetLang);
    } else {
      result[key] = value;
    }
  }

  return result;
}

async function generateTranslations() {
  try {
    const enPath = path.join(__dirname, '../src/i18n/resources/en.json');
    const enContent = await fs.readFile(enPath, 'utf8');
    const enTranslations = JSON.parse(enContent);

    console.log('Starting translation process...');
    console.log(`Source file: ${enPath}`);
    console.log(`Languages: ${Object.keys(languages).join(', ')}`);

    const completedLanguages = [];

    for (const [langCode, googleLangCode] of Object.entries(languages)) {
      console.log(`Translating ${langCode}...`);

      const translated = await translateObject(enTranslations, googleLangCode);
      const outputPath = path.join(__dirname, `../src/i18n/resources/${langCode}.json`);
      await fs.writeFile(outputPath, JSON.stringify(translated, null, 2), 'utf8');

      console.log(`✔ Completed: ${langCode}.json`);
      completedLanguages.push(langCode);
    }

    console.log('\nTranslation Summary:');
    console.log(`Files generated: ${completedLanguages.length}`);
    console.log(`Languages: ${completedLanguages.join(', ')}`);
    console.log('All translations generated successfully.');
  } catch (error) {
    console.error('Error: Failed to generate translations.', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateTranslations();
}

module.exports = { generateTranslations };