import { ComponentPropsWithoutRef } from 'react';

const TextShadow = ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => {
	return (
		<p
			{...props}
			className='after:block after:font-bold after:h-[1px] after:bg-transparent after:overflow-hidden after:invisible'
		>
			{children}
		</p>
	);
};

export { TextShadow };
