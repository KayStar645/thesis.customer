import { BaseCollectionType } from './base-collection';

type PaymentCollectionType = BaseCollectionType & {
	internalCode: string;
	name: string;
	id: number;
};

export type { PaymentCollectionType };
