import { BaseCollectionType } from './base-collection';

export type PromotionCollectionType = BaseCollectionType & {
	internalCode: string;
	name: string;
	start: string;
	end: string;
	limit: number;
	discount: number;
	percentMax: number;
	percent: any;
	discountMax: any;
	type: number;
	status: number;
	promotionForProduct: any;
	id: number;
};
