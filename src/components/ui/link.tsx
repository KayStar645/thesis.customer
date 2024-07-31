'use client';

import { Link as ChakraLink } from '@chakra-ui/react';
import { routeConfig } from '@config/index';
import { useParams } from 'next/navigation';
import { default as NextLink } from 'next/link';
import { LinkProps } from '@type/ui';
import { PageParamType } from '@type/common';
import queryString from 'query-string';
import { forwardRef } from 'react';

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
	const { lng } = useParams<PageParamType>();

	const param = (() => {
		if (props.params) {
			return `?${queryString.stringify(props.params)}`;
		}

		return '';
	})();

	const href = (() => {
		if (routeConfig[props.href as keyof typeof routeConfig]) {
			return `/${lng}${routeConfig[props.href as keyof typeof routeConfig]}${param}`;
		}

		return props.href;
	})();

	return (
		<ChakraLink
			display='block'
			{...props}
			ref={ref}
			as={NextLink}
			href={href}
		>
			{props.children}
		</ChakraLink>
	);
});

Link.displayName = 'Link';

export { Link };
