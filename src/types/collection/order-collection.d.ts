import { ProductCollectionType } from './product-collection';
import { VoucherCollectionType } from './voucher-collection';

type AddToCartType = {
	productId: number;
	quantity: number;
};

type CartDetailType = {
	details: CartDetailItemType[];
	total: number;
	totalAmount: number;
	totalDecrease: number;
	message?: string;
	voucher?: VoucherCollectionType;
};

type CartDetailItemType = {
	cost: number;
	isSelected: boolean;
	price: number;
	reducedPrice: number;
	productId: number;
	product: ProductCollectionType;
	quantity: number;
};

export { AddToCartType, CartDetailType, CartDetailItemType };
