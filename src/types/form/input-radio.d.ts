import { RadioGroupProps, RadioProps, TextProps } from '@chakra-ui/react';
import { OptionType } from '../common';

type InputRadioType = {
	options: OptionType[];
	container?: Omit<RadioGroupProps, 'children' | 'value' | 'onChange'>;
	label?: TextProps;
	input?: {
		value: string;
		label?: string;
		required?: boolean;
		message?: string;
		onChange?: (_value: string) => void;
	};
};

export type { InputRadioType };
