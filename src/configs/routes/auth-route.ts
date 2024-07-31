const resetPasswordCallBack = '/auth/reset-password?tab=new_password';

const authRoute = {
	'login': '/auth/login',
	'register': '/auth/register',
	'reset-password': '/auth/reset-password?tab=email',
};

const authRoutes = Object.keys(authRoute).map((key) => {
	const _key = key as keyof typeof authRoute;

	return authRoute[_key];
});

export { authRoute, authRoutes, resetPasswordCallBack };
