import '@asset/styles/global.css';
import { ReduxProvider } from '@provider/index';
import { PageType } from '@type/common';
import type { Metadata } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export const metadata: Metadata = {
	title: 'app name',
};

const RootLayout = ({ children }: PageType) => {
	return (
		<ReduxProvider>
			<CookiesProvider>{children}</CookiesProvider>
		</ReduxProvider>
	);
};

export default RootLayout;
