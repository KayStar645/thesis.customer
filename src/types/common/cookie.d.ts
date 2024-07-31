import { supportLanguage } from '@config/i18n';

type CookieType = {
	i18n: keyof typeof supportLanguage;
	access_token: string;
	refresh_token: string;
	expires: number;
	expires_at: number;
	is_login: boolean;
};

export type { CookieType };
