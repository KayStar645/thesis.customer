import { tokenExpiresSlice } from '@redux/slices';
import { AuthenticationDataType, ResponseType } from '@type/common';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isBefore } from 'date-fns';
import { toast } from 'react-toastify';
import { apiConfig } from '../configs/api-config';
import { cookies } from './cookies';
import { reduxStore } from '@redux/index';
import https from 'https';

const request = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	httpsAgent: new https.Agent({
		rejectUnauthorized: process.env.NODE_ENV === 'development' ? false : true,
	}),
	headers: {
		accept: 'application/json',
	},
});

const handleError = (error: AxiosError) => {
	const response = error.response as AxiosResponse<ResponseType>;

	if (response.data.messages && response.data.messages.length > 0) {
		error.message = response.data.messages[0];
	}

	toast.error(error.message);

	return Promise.reject(error);
};

request.interceptors.request.use(
	(config) => {
		const accessToken = cookies.get('access_token');
		const expires = cookies.get('expires_at');

		if (isBefore(new Date(expires), new Date())) {
			reduxStore.dispatch(tokenExpiresSlice.actions.setTokenExpires(true));
		}

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error: AxiosError) => handleError(error),
);

request.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError) => handleError(error),
);

const get = <T = any>(
	path: keyof typeof apiConfig,
	configs?: AxiosRequestConfig,
): Promise<AxiosResponse<ResponseType<T>, any>> => {
	const response = request.get(apiConfig[path], configs);

	return response;
};

const post = <T = any>(
	path: keyof typeof apiConfig,
	data: any,
	configs?: AxiosRequestConfig,
): Promise<AxiosResponse<ResponseType<T>, any>> => {
	const response = request.post(apiConfig[path], data, configs);

	return response;
};

const update = (path: keyof typeof apiConfig, data: any, configs?: AxiosRequestConfig) => {
	const response = request.put(apiConfig[path], data, configs);

	return response;
};

const remove = (path: keyof typeof apiConfig, configs?: AxiosRequestConfig) => {
	const response = request.delete(apiConfig[path], configs);

	return response;
};

const patch = (path: keyof typeof apiConfig, data: any, configs?: AxiosRequestConfig) => {
	const response = request.patch(apiConfig[path], data, configs); // Use patch method here
	return response;
};

const login = (data: AuthenticationDataType) => {
	if (!data.expires) {
		return;
	}

	const expiresAt = new Date(data.expires * 1000);

	cookies.set('access_token', data.access_token!, {
		expires: expiresAt,
	});

	cookies.set('refresh_token', data.refresh_token!, {
		expires: expiresAt,
	});

	cookies.set('expires', data.expires, {
		expires: expiresAt,
	});

	cookies.set('expires_at', data.expires, {
		expires: expiresAt,
	});

	cookies.set('is_login', true, {
		expires: expiresAt,
	});
};

const logout = () => {
	cookies.remove('access_token');
	cookies.remove('refresh_token');
	cookies.remove('expires');
	cookies.remove('expires_at');

	cookies.set('is_login', false);
};

const http = { get, post, remove, update, patch };

export { http, login, logout, request };
