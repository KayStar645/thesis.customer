import { cookieConfig } from '@config/index';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import { parse } from './util';
import { CookieType } from '@type/common';

const get = <T extends keyof CookieType>(key: T): CookieType[T] => {
	return parse(getCookie(key)) as CookieType[T];
};

const set = <T extends keyof CookieType>(key: T, value: CookieType[T], options?: OptionsType) => {
	setCookie(cookieConfig[key], value, options);
};

const remove = (key: keyof typeof cookieConfig, options?: OptionsType) => {
	deleteCookie(cookieConfig[key], options);
};

export const cookies = { get, set, remove };
