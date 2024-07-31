import { iconConfig } from '@config/index';
import { ReactIconProps } from '@type/ui';

const ReactIcon = ({ icon, size = 16, ...props }: ReactIconProps) => {
	const Icon = iconConfig[icon] || (() => <></>);

	return (
		<Icon
			{...props}
			size={size}
		/>
	);
};

export { ReactIcon };
