import { apiConfig } from '@config/index';
import { http } from '@lib/request';
import { useMutation } from '@tanstack/react-query';
import { ResponseType } from '@type/common';

const usePost = <TData = any, TVariables = any>(api: keyof typeof apiConfig, method: 'post' | 'update' = 'post') => {
	return useMutation<ResponseType<TData>, Error, TVariables>({
		mutationFn: async (data) => {
			const request = await http[method](api, data);

			return request.data;
		},
	});
};

export { usePost };
