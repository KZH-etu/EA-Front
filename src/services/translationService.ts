//import { TranslateTextRequest } from '@google-cloud/translate';

class TranslationService {
  private static instance: TranslationService;
  private cache: Map<string, string>;

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  private getCacheKey(text: string, targetLang: string): string {
    return `${text}:${targetLang}`;
  }

  public async translate(text: string, targetLang: string): Promise<string> {
    if (!text) return '';
    
    const cacheKey = this.getCacheKey(text, targetLang);
    
    // Check cache first
    const cachedTranslation = this.cache.get(cacheKey);
    if (cachedTranslation) {
      return cachedTranslation;
    }

    try {
      const response = await fetch(`/api/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const { translatedText } = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, translatedText);
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }

  public async translateBatch(texts: string[], targetLang: string): Promise<string[]> {
    return Promise.all(texts.map(text => this.translate(text, targetLang)));
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

export const translationService = TranslationService.getInstance();