import { BaseCollectionType } from './base-collection';

type CategoryCollectionType = BaseCollectionType & {
	name: string;
	internalCode: string;
	icon: string;
	parentId: number;
	children: CategoryCollectionType[];
};

export type { CategoryCollectionType };
