import { apiConfig } from '@config/index';
import { http } from '@lib/request';
import { useMutation } from '@tanstack/react-query';
import { OrderStatusCollection } from '@type/collection';
import { OrderStatusType, ResponseType } from '@type/common';

const usePatch = (url: any) => {
	return useMutation<ResponseType<OrderStatusCollection>, Error, OrderStatusType>({
		mutationFn: async (data) => {
			const request = await http.patch(url, data);
			return request.data;
		},
		onSuccess(response) {
			return response;
		},
	});
};
export { usePatch };
