import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, LanguageCode } from '../../i18n';
import 'flag-icons/css/flag-icons.min.css';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const normalizedLang = i18n.language.split('-')[0] as LanguageCode;
  const currentLanguage = languages[normalizedLang] ? normalizedLang : 'en';

  const handleLanguageChange = (languageCode: LanguageCode) => {
    i18n.changeLanguage(languageCode);
    
    // dispatch custom event to notify other parts of the app
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: languageCode }));
    
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-68">
      {/* main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/90 backdrop-blur-sm hover:bg-white 
                   border border-gray-200 rounded-lg shadow-lg 
                   px-3 py-2 transition-all duration-200 
                   flex items-center gap-2 min-w-[80px]
                   hover:shadow-xl hover:scale-105"
        aria-label={t('language.select')}
      >
        {/* flag icon closed */}
        <span className={`fi fi-${languages[currentLanguage]?.flag} text-lg`}></span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute bottom-full left-0 mb-2 w-48 
                          bg-white rounded-xl shadow-2xl border border-gray-200 
                          overflow-hidden z-50
                          duration-200">
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                {t('language.select')}
              </div>
      {/* Language list */}
              <ul role="listbox" aria-label={t('language.select')}>
                {Object.entries(languages).map(([code, lang]) => {
                  const isActive = code === currentLanguage;
                  
                  return (
                    <li key={code} role="option" aria-selected={isActive}>
                      <button
                        onClick={() => handleLanguageChange(code as LanguageCode)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 
                                   transition-colors duration-150 flex items-center gap-3
                                   ${isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''}`}
                      >
      {/* Flag */}
                        <span className={`fi fi-${lang.flag} text-lg`}></span>
      {/* Language name */}
                        <span className={`font-medium ${
                          isActive ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {lang.name}
                        </span>
                        {isActive && (
                          <svg className="w-4 h-4 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;