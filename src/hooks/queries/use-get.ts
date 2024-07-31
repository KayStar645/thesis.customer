import { queryKeyConfig } from '@config/index';
import { http } from '@lib/index';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from '@type/common';
import { UseGetType } from '@type/hook';
import { useCookies } from '..';

const useGet = <ItemType>({ api, filter, checkLogin, enable = true, queryKey = 'default' }: UseGetType<ItemType>) => {
	const cookies = useCookies();

	const shouldEnable = (() => {
		if (checkLogin && !cookies.get('is_login')) {
			return false;
		}

		return enable;
	})();

	return useQuery<ResponseType<ItemType>, Error>({
		refetchOnWindowFocus: false,
		enabled: shouldEnable,
		queryKey: queryKeyConfig[api][queryKey](filter),
		queryFn: async () => {
			const response = await http.get<ItemType>(api, {
				params: filter,
			});

			return response.data;
		},
	});
};

export { useGet };
