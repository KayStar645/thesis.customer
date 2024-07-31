import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { Product } from '@component/ui';
import { useTranslation } from '@hook/index';
import { useGet } from '@hook/queries';
import { skeletons } from '@lib/util';
import { ProductCollectionType } from '@type/collection';
import Slider from 'react-slick';

const HomeHotSell = () => {
	const { t } = useTranslation();

	const productQuery = useGet<ProductCollectionType[]>({
		api: 'product',
		filter: {
			sorts: '-selling',
			pageSize: 6,
			IsAllDetail: true,
		},
	});

	return (
		<Box p={4}>
			<Text
				textAlign='center'
				mb={8}
				fontWeight='bold'
				fontSize='2xl'
			>
				{t('common:hot_sell_product')}
			</Text>

			<Box mx='-1rem'>
				{productQuery.data?.data && productQuery.data?.data.length > 5 ? (
					<Slider
						slidesToShow={5}
						slidesToScroll={5}
						dots={true}
					>
						{(productQuery.data?.data || skeletons<ProductCollectionType>(10)).map((product) => (
							<Box
								key={product.id}
								px={4}
								pb={1}
							>
								<Product data={product} />
							</Box>
						))}
					</Slider>
				) : (
					<Grid
						templateColumns='repeat(5, 1fr)'
						gap={5}
					>
						{(productQuery.data?.data || skeletons<ProductCollectionType>(5)).map((product) => (
							<GridItem key={product.id}>
								<Product data={product} />
							</GridItem>
						))}
					</Grid>
				)}
			</Box>
		</Box>
	);
};

export { HomeHotSell };
