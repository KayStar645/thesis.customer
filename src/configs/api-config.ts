const apiConfig = {
	'register': '/user/register',

	'login': '/user/login',

	'product': '/product',
	'product-detail': '/product/detail',
	'product-combo': '/product/combo-products',

	'category': '/category',
	'category-detail': '/category/detail',

	'add-to-cart': 'order/cart',
	'cart-detail': 'order/detail-cart',
	'apply-voucher': 'order/cart-add-coupon',
	'create-order': 'order/order-create',
	'order-history': '/order',
	'order-change-status': '/order/order-change-status',
	'order-detail': '/order/detail',
	'order-cancel': '/order/order-cancel',
	'cart-remove': '/order/cart-remove',

	'voucher': '/coupon',

	'payment': '/payment',
};

export { apiConfig };
