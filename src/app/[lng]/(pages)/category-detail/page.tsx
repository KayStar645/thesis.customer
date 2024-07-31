'use client';

import { Box, Center, Grid, GridItem, Skeleton, Text } from '@chakra-ui/react';
import { BaseLayout } from '@component/layout';
import { Product, ReactIcon } from '@component/ui';
import { useSearchParam, useTranslation } from '@hook/index';
import { useGet } from '@hook/queries';
import { skeletons } from '@lib/index';
import { CategoryCollectionType, ProductCollectionType } from '@type/collection';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const CategoryDetailPage = () => {
	const params = useSearchParam();
	const { t } = useTranslation();
	const [currentPage, setCurrentPage] = useState(0);

	const categoryDetailQuery = useGet<CategoryCollectionType>({
		api: 'category-detail',
		filter: {
			id: params.id,
		},
	});

	const productQuery = useGet<ProductCollectionType[]>({
		api: 'product',
		enable: !!params.id,
		filter: {
			Filters: `categoryId==${params.id}`,
			pageSize: 20,
			Page: currentPage + 1,
			IsAllDetail: true
		},
	});

	return (
		<BaseLayout>
			<Box mt={8}>
				<Skeleton
					isLoaded={!!categoryDetailQuery.data?.data.name}
					width='fit-content'
				>
					<Text
						fontSize='2xl'
						fontWeight='700'
						mb={8}
					>
						{t('common:product_list_by_type', {
							category: categoryDetailQuery.data?.data.name,
						})}
					</Text>
				</Skeleton>

				<Grid
					templateColumns='repeat(5, 1fr)'
					gap={25}
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
						pageRangeDisplayed={8}
						pageCount={productQuery.data?.extra.totalPages || 1}
						renderOnZeroPageCount={null}
						containerClassName='paginate-container'
						onPageChange={(page) => setCurrentPage(page.selected)}
					/>
				</Center>
			</Box>
		</BaseLayout>
	);
};

export default CategoryDetailPage;
