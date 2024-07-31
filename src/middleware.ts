import { NextRequest, NextResponse } from 'next/server';
import { cookieConfig, FALLBACK_LNG } from './configs';
import { addYears } from 'date-fns';

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

const middleware = (req: NextRequest, _res: NextResponse): NextResponse => {
	let lng = FALLBACK_LNG;
	const { pathname } = req.nextUrl;

	if (req.cookies.has(cookieConfig.i18n)) {
		const cookieValue = req.cookies.get(cookieConfig.i18n)?.value;

		if (cookieValue) {
			lng = cookieValue;
		}
	}

	const urlPattern = new RegExp(`^/${lng}(/|$)`);

	if (!urlPattern.test(pathname)) {
		return NextResponse.redirect(new URL(`/${lng}${pathname}`, req.url));
	}

	const response = NextResponse.next();

	if (!req.cookies.has(cookieConfig.i18n)) {
		response.cookies.set(cookieConfig.i18n, lng, { expires: addYears(new Date(), 1) });
	}

	return response;
};

export default middleware;
