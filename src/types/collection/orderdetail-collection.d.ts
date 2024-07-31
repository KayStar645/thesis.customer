import { BaseCollectionType } from './base-collection';

type Product = {
	internalCode: string;
	name: string;
	images: string[];
	price: number;
	newPrice: number | null;
	quantity: number;
	describes: string;
	feature: string;
	specifications: string;
	status: number;
	parentId: number | null;
	parent: any; // Type may vary based on actual usage
	categoryId: number;
	category: any; // Type may vary based on actual usage
	promotionDto: any; // Type may vary based on actual usage
	id: number;
};

type Customer = {
	name: string;
	phone: string;
	email: string;
	address: string;
	gender: string;
	user: any; // Type may vary based on actual usage
	id: number;
};

type Staff = {
	internalCode: string;
	name: string;
	dateOfBirth: string;
	gender: string;
	address: string;
	phoneNumber: string;
	email: string;
	avatar: string;
	idCard: string;
	idCardImage: { front: string; back: string };
	positionId: number;
	position: any; // Type may vary based on actual usage
	id: number;
};

type OrderDetail = {
	cost: number;
	reducedPrice: number;
	price: number;
	profit: number;
	quantity: number;
	groupPromotion: any; // Type may vary based on actual usage
	productId: number;
	product: Product;
};

type OrderDetailCollectionType = BaseCollectionType & {
	internalCode: string;
	date: string;
	totalAmount: number;
	totalDecrease: number;
	total: number;
	message: string | null;
	status: number;
	type: number;
	isPay: boolean;
	details: OrderDetail[];
	paymentId: number | null;
	payment: any;
	customerId: number;
	customer: Customer;
	deliveryId: number | null;
	delivery: any;
	staffApprovedId: number;
	staffApproved: Staff;
};

type ApiResponse = {
	data: Order;
	messages: any[];
	succeeded: boolean;
	code: number;
};
export type { ApiResponse, Order, OrderDetailCollectionType, Product, Customer, Staff };
