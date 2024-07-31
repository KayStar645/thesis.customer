import { LoginCheckingModal } from '@component/modal';
import { privateRoutes } from '@config/routes';
import { useCookies } from '@hook/index';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const RouteChecking = ({ children }: { children: ReactNode }) => {
	const pathName = usePathname();
	const cookies = useCookies();
	const isPrivateRoute = !!privateRoutes.find((route) => pathName.endsWith(route));

	if (!cookies.get('is_login') && isPrivateRoute) {
		return <LoginCheckingModal />;
	}

	return children;
};

export { RouteChecking };
