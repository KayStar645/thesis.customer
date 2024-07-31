import { DEFAULT_NS, FALLBACK_LNG, supportLanguage } from '@config/index';
import { PageParamType } from '@type/common';
import { createInstance } from 'i18next';
import { useParams } from 'next/navigation';
import { initReactI18next } from 'react-i18next/initReactI18next';

const useTranslation = (language?: keyof typeof supportLanguage, options: any = {}) => {
	const { lng } = useParams<PageParamType>();
	const i18nextInstance = createInstance();

	i18nextInstance.use(initReactI18next).init({
		lng: language || lng,
		ns: DEFAULT_NS,
		defaultNS: DEFAULT_NS,
		fallbackLng: FALLBACK_LNG,
		resources: {
			en: {
				common: require('../configs/i18n/locales/en/common.json'),
				app: require('../configs/i18n/locales/en/app.json'),
				auth: require('../configs/i18n/locales/en/auth.json'),
				menu: require('../configs/i18n/locales/en/menu.json'),
				request: require('../configs/i18n/locales/en/request.json'),
				validation: require('../configs/i18n/locales/en/validation.json'),
			},
			vi: {
				common: require('../configs/i18n/locales/vi/common.json'),
				app: require('../configs/i18n/locales/vi/app.json'),
				auth: require('../configs/i18n/locales/vi/auth.json'),
				menu: require('../configs/i18n/locales/vi/menu.json'),
				request: require('../configs/i18n/locales/vi/request.json'),
				validation: require('../configs/i18n/locales/vi/validation.json'),
			},
		},
	});

	return {
		t: i18nextInstance.getFixedT(language || lng, DEFAULT_NS, options.keyPrefix),
		i18n: i18nextInstance,
		lng,
	};
};

export { useTranslation };
