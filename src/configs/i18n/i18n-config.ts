import { OptionType } from '@type/common';

const FALLBACK_LNG = 'vi';
const LANGUAGES = ['vi', 'en'];
const DEFAULT_NS = 'common';

const supportLanguage = {
	vi: {
		code: 'vi',
		translate: 'Tiếng Việt',
	},
	en: {
		code: 'en',
		translate: 'English',
	},
};

const supportLanguages: OptionType[] = [
	{
		code: supportLanguage.vi.code,
		label: supportLanguage.vi.translate,
	},
	{
		code: supportLanguage.en.code,
		label: supportLanguage.en.translate,
	},
];

export { FALLBACK_LNG, LANGUAGES, DEFAULT_NS, supportLanguages, supportLanguage };
