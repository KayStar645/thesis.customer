const parse = (object?: any) => {
	try {
		if (object) {
			return JSON.parse(object);
		}
	} catch (error) {}

	return object;
};

const skeletons = <T = any>(amount: number, key: string = 'id'): T[] => {
	return Array(amount)
		.fill('')
		.map((t, index) => ({
			[key]: index.toString(),
		})) as T[];
};

const currency = (value?: number) => {
	if (!value) {
		return '0đ';
	}

	return `${value.toLocaleString('vi-VN')}đ`;
};

const HTML = (rawHTML?: string) => {
	return { __html: rawHTML || '' };
};

export { parse, skeletons, currency, HTML };
