import { routeConfig, supportLanguage } from '@config/index';
import { PageParamType } from '@type/common';
import { useRouter as useNextRouter, useParams } from 'next/navigation';
import queryString from 'query-string';

const useRouter = () => {
	const { lng } = useParams<PageParamType>();
	const router = useNextRouter();

	const push = (
		path: keyof typeof routeConfig | (string & {}),
		params?: { [key: string]: string },
		newLng?: keyof typeof supportLanguage,
	) => {
		const _params = params ? `?${queryString.stringify(params)}` : '';

		if (routeConfig[path as keyof typeof routeConfig]) {
			if (lng && supportLanguage[lng]) {
				return router.push(`/${lng}${routeConfig[path as keyof typeof routeConfig]}${_params}`);
			}

			if (newLng && supportLanguage[newLng]) {
				return router.push(`/${newLng}${routeConfig[path as keyof typeof routeConfig]}${_params}`);
			}
		}

		return router.push(path);
	};

	return {
		...router,
		push,
	};
};

export { useRouter };
