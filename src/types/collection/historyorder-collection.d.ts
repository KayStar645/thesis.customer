// orderTypes.ts
import { BaseCollectionType } from './base-collection';

type Customer = {
	name: string;
	phone: string;
	email: string;
	address: string;
	gender: string;
	id: number;
};

type StaffApproved = {
	internalCode: string;
	name: string;
	dateOfBirth: string;
	gender: string;
	address: string;
	phoneNumber: string;
	email: string;
	avatar: string;
	idCard: string;
	id: number;
};

type OrderHistoryCollectionType = BaseCollectionType & {
	internalCode: string;
	date: string;
	totalAmount: number;
	totalDecrease: number;
	total: number;
	message: null | string;
	status: number;
	type: number;
	isPay: boolean;
	details: null;
	paymentId: null | string;
	payment: null;
	customerId: number;
	//customer: Customer | null;
	deliveryId: null | string;
	delivery: null;
	staffApprovedId: number | null;
	//staffApproved: StaffApproved | null;
	id: number;
};

export type { OrderHistoryCollectionType };
