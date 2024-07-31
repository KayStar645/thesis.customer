'use client';

import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Company } from './company';
import { Policy } from './policy';
import { CustomerSupport } from './customer-support';
import { RelatedChannel } from './related-channel';
import { MAX_WIDTH } from '@config/index';

const Footer = () => {
	return (
		<Box
			backgroundColor='black'
			py={5}
			mt={20}
		>
			<Grid
				mx='auto'
				maxWidth={MAX_WIDTH}
				templateColumns='repeat(4, 1fr)'
				gap={6}
				textColor='white'
			>
				<GridItem w='100%'>
					<Company />
				</GridItem>

				<GridItem w='100%'>
					<Policy />
				</GridItem>

				<GridItem w='100%'>
					<CustomerSupport />
				</GridItem>

				<GridItem w='100%'>
					<RelatedChannel />
				</GridItem>
			</Grid>
		</Box>
	);
};

export { Footer };
