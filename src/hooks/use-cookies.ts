import { cookieConfig } from '@config/index';
import { parse } from '@lib/index';
import { CookieType } from '@type/common';
import { CookieAttributes, useCookies as useNextClientCookies } from 'next-client-cookies';

const useCookies = () => {
	const { get: getCookie, remove: removeCookie, set: setCookie } = useNextClientCookies();

	const get = <T extends keyof CookieType>(key: T): CookieType[T] => {
		return parse(getCookie(key)) as CookieType[T];
	};

	const remove = (key: keyof typeof cookieConfig, options?: CookieAttributes) => {
		removeCookie(key, options);
	};

	const set = <T extends keyof CookieType>(key: T, value: CookieType[T], options?: CookieAttributes) => {
		if (typeof value === 'string') {
			setCookie(key, value, options);
		} else {
			setCookie(key, JSON.stringify(value), options);
		}
	};

	return {
		get,
		remove,
		set,
	};
};

export { useCookies };
