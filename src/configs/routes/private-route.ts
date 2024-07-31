const privateRoute = {
	cart: '/cart',
	orderhistory: '/order-history',
	combo: '/combo',
};

const privateRoutes: string[] = Object.keys(privateRoute).map((key) => {
	const _key = key as keyof typeof privateRoute;

	return privateRoute[_key];
});

export { privateRoute, privateRoutes };
