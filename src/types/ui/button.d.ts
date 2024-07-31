import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

type ButtonProps = ChakraButtonProps & {
	checkLogin?: boolean;
};

export type { ButtonProps };
