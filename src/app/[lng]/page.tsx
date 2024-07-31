'use client';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { BaseLayout } from '@component/layout';
import { HomeBanner, HomeCategory, HomeHotSell, HomeProductList } from '@component/pages/home';
import { HomeAd } from '@component/pages/home/home-ad';

const AppPage = () => {
	return (
		<BaseLayout>
			<Grid
				templateColumns='repeat(12, 1fr)'
				gap={5}
			>
				{/* HomeBanner */}
				<GridItem colSpan={12}>
					<Box
						mt={4}
						p={4}
						h={'60vh'}
						bg='teal.100'
						boxShadow='md'
						borderRadius='md'
					>
						<HomeBanner />
					</Box>
				</GridItem>

				{/* HomeAd */}
				<GridItem colSpan={12}>
					<Box
						p={4}
						bg='gray.100'
						boxShadow='md'
						borderRadius='md'
					>
						<HomeAd />
					</Box>
				</GridItem>

				{/* HomeHotSell */}
				<GridItem colSpan={12}>
					<Box
						p={4}
						boxShadow='md'
						borderRadius='md'
					>
						<HomeHotSell />
					</Box>
				</GridItem>

				{/* HomeCategory */}
				<GridItem colSpan={3}>
					<HomeCategory />
				</GridItem>

				{/* HomeProductList */}
				<GridItem
					colSpan={9}
					pl={2}
				>
					<Box
						p={4}
						boxShadow='md'
						borderRadius='md'
					>
						<HomeProductList />
					</Box>
				</GridItem>
			</Grid>
		</BaseLayout>
	);
};

export default AppPage;
