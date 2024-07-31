'use client';

import { Box, Center, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { BaseLayout } from '@component/layout';
import { Product, ReactIcon } from '@component/ui';
import { useSearchParam } from '@hook/index';
import { useGet } from '@hook/queries';
import { ProductCollectionType } from '@type/collection';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const SearchPage = () => {
	const param = useSearchParam();
	const [currentPage, setCurrentPage] = useState(0);

	const productQuery = useGet<ProductCollectionType[]>({
		api: 'product',
		filter: {
			filters: `name@=${param.keyword}`,
		},
	});

	return (
		<BaseLayout>
			<VStack
				align='stretch'
				spacing={8}
				mt={8}
			>
				<Box>
					<Text
						fontWeight='600'
						fontSize='2xl'
						display='inline'
					>
						Danh sách sản phẩm theo từ khóa{' '}
					</Text>

					<Text
						fontWeight='600'
						fontSize='2xl'
						display='inline'
						color='green'
					>
						"{param.keyword}"
					</Text>
				</Box>

				<Grid
					templateColumns='repeat(4, 1fr)'
					gap={5}
				>
					{productQuery.data?.data.map((product) => (
						<GridItem key={product.id}>
							<Product data={product} />
						</GridItem>
					))}
				</Grid>

				{productQuery.data?.data.length === 0 && (
					<Center py={40}>
						<Text
							fontWeight='600'
							fontSize='2xl'
							display='inline'
							color='red.400'
						>
							Không tìm sản phẩm nào
						</Text>
					</Center>
				)}

				<Center>
					<ReactPaginate
						breakLabel='...'
						previousLabel={<ReactIcon icon='IoChevronBack' />}
						nextLabel={<ReactIcon icon='IoChevronForward' />}
						forcePage={currentPage}
						pageRangeDisplayed={9}
						pageCount={productQuery.data?.extra.totalPages || 0}
						renderOnZeroPageCount={null}
						containerClassName='paginate-container'
						onPageChange={(page) => setCurrentPage(page.selected)}
					/>
				</Center>
			</VStack>
		</BaseLayout>
	);
};

export default SearchPage;
