import { BaseCollectionType } from './base-collection';

type VoucherCollectionType = BaseCollectionType & {
	name: string;
	internalCode: string;
	type: number;
	discount: number;
	percentMax: number;
	start: string;
	end: string;
};

export type { VoucherCollectionType };
