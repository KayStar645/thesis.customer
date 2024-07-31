import { cookies, http } from '@lib/index';
import { useMutation } from '@tanstack/react-query';
import { LoginResponse, LoginType, RegisterType, ResetPasswordType, ResponseType } from '@type/common';

const useLoginMutate = () => {
	return useMutation<ResponseType<LoginResponse>, Error, LoginType>({
		mutationFn: async (data) => {
			const request = await http.post('login', data);

			return request.data;
		},
		onSuccess(response) {
			const expires = new Date(response.data.exp);

			cookies.set('access_token', response.data.token, { expires });
			cookies.set('expires_at', expires.getTime(), { expires });
			cookies.set('is_login', true, { expires });
		},
	});
};

const useRegisterMutate = () => {
	return useMutation<any, Error, RegisterType>({
		mutationFn: async (data) => {
			const request = http.post('register', data);

			return request;
		},
	});
};

const useRequestResetPasswordMutate = () => {
	return useMutation<any, Error, string>({
		mutationFn: async (email) => {
			return {};
		},
	});
};

const useResetPasswordMutate = () => {
	return useMutation<any, Error, ResetPasswordType>({
		mutationFn: async (data) => {
			return {};
		},
	});
};

export { useLoginMutate, useRegisterMutate, useRequestResetPasswordMutate, useResetPasswordMutate };
