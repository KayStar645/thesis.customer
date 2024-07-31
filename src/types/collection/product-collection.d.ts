import { BaseCollectionType } from './base-collection';
import { CategoryCollectionType } from './category-collection';
import { PromotionCollectionType } from './promotion-collection';

type ProductCollectionType = BaseCollectionType & {
	internalCode: number;
	name: string;
	price: number;
	newPrice?: number;
	images: string[];
	describes: string;
	category?: CategoryCollectionType;
	quantity: number;
	feature: string;
	specifications: string;
};

type ProductComboType = BaseCollectionType & {
	products: ProductCollectionType[];
	promotion: PromotionCollectionType;
	price: number;
	newPrice: number;
};

export type { ProductCollectionType, ProductComboType };
