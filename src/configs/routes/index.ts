import { authRoute } from './auth-route';
import { privateRoute } from './private-route';
import { pubicRoute } from './public-route';

const baseURL = 'http://localhost:8888/';

const routeConfig = {
	...authRoute,
	...privateRoute,
	...pubicRoute,
};

const DEFAULT_LOGIN_REDIRECT = routeConfig.root;

export * from './auth-route';
export * from './private-route';
export * from './public-route';

export { baseURL, DEFAULT_LOGIN_REDIRECT, routeConfig };
