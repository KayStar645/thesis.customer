import { supportLanguage } from '@config/i18n';
import { PropsWithChildren } from 'react';

type PageParamType = {
	lng: keyof typeof supportLanguage;
};

type PageType = never;

export type { PageType, PageParamType };
