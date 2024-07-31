import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { routeConfig } from '@config/index';
import { KeyValueType } from '@type/common';

type LinkProps = Omit<ChakraLinkProps, 'href'> & {
	href: keyof typeof routeConfig | (string & {});
	params?: KeyValueType<string | undefined | number>;
};

export type { LinkProps };
