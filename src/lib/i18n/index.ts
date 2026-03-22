import { Tolgee, DevTools, FormatSimple, LanguageDetector, LanguageStorage } from '@tolgee/svelte';

export const availableLanguages = ['en', 'de'];
export const defaultLanguage = 'en';

export const createTolgee = () => {
	const tolgee = Tolgee()
		.use(DevTools())
		.use(FormatSimple())
		.use(LanguageDetector())
		.use(LanguageStorage())
		.init({
			defaultLanguage,
			availableLanguages,
			apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
			apiKey: import.meta.env.VITE_TOLGEE_API_KEY,
			staticData: {
				en: () => import('./en.json').then(m => m.default),
				de: () => import('./de.json').then(m => m.default)
			}
		});
	return tolgee;
};