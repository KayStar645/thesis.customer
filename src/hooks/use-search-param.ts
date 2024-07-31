import { KeyValueType } from '@type/common';
import { useSearchParams } from 'next/navigation';

const useSearchParam = (): KeyValueType => {
	const params = useSearchParams();
	const result: KeyValueType = {};

	params.forEach((value, key) => (result[key] = value));

	return result;
};

export { useSearchParam };
