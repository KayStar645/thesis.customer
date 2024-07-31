import { Box, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import { Product, ReactIcon } from '@component/ui';
import { useTranslation } from '@hook/index';
import { useGet } from '@hook/queries';
import { skeletons } from '@lib/util';
import { ProductCollectionType } from '@type/collection';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const HomeProductList = () => {
	const { t } = useTranslation();
	const [currentPage, setCurrentPage] = useState(0);

	const productQuery = useGet<ProductCollectionType[]>({
		api: 'product',
		filter: {
			PageSize: 9,
			Page: currentPage + 1,
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
				{t('common:all_products')}
			</Text>

			<Grid
				templateColumns='repeat(3, 1fr)'
				gap={5}
			>
				{(productQuery.data?.data || skeletons<ProductCollectionType>(10)).map((product) => (
					<GridItem key={product.id}>
						<Product data={product} />
					</GridItem>
				))}
			</Grid>
			<Center>
				<ReactPaginate
					breakLabel='...'
					previousLabel={<ReactIcon icon='IoChevronBack' />}
					nextLabel={<ReactIcon icon='IoChevronForward' />}
					forcePage={currentPage}
					pageRangeDisplayed={9}
					pageCount={productQuery.data?.extra.totalPages || 1}
					renderOnZeroPageCount={null}
					containerClassName='paginate-container'
					onPageChange={(page) => setCurrentPage(page.selected)}
				/>
			</Center>
		</Box>
	);
};

export { HomeProductList };
