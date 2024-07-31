import { iconConfig } from '@config/index';
import { IconBaseProps } from 'react-icons';

type ReactIconProps = Omit<IconBaseProps, 'onClick'> & {
	size?: number;
	icon: keyof typeof iconConfig;
};

export type { ReactIconProps };
