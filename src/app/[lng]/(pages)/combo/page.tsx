'use client';

import { Card, CardBody, CardHeader, Center, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import { RouteChecking } from '@component/auth';
import { BaseLayout } from '@component/layout';
import { Product, ReactIcon } from '@component/ui';
import { useGet } from '@hook/queries';
import { ProductComboType } from '@type/collection';
import { format } from 'date-fns';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const ComboPage = () => {
	const comboQuery = useGet<ProductComboType[]>({
		api: 'product-combo',
		filter: {
			pageSize: 5,
		},
	});
	const [currentPage, setCurrentPage] = useState(0);

	return (
		<BaseLayout>
			<RouteChecking>
				<VStack
					align='stretch'
					spacing={4}
					mt={8}
				>
					{comboQuery.data?.data.map((combo) => (
						<Card key={combo.id}>
							<CardHeader>
								<HStack justify='space-between'>
									<VStack
										align='stretch'
										spacing={3}
									>
										<Text
											fontSize='xl'
											fontWeight={600}
										>
											[{combo.promotion.internalCode}] - {combo.promotion.name}
										</Text>

										<HStack>
											<Text>Kết thúc:</Text>
											<Text fontWeight={600}>{format(combo.promotion.end, 'dd/MM/yyyy')}</Text>
										</HStack>
									</VStack>

									<VStack align='flex-end'>
										<Text
											fontSize={combo.price !== combo.newPrice ? 'lg' : 'xl'}
											color={combo.price !== combo.newPrice ? 'gray' : 'red'}
											fontWeight={600}
											textDecoration={combo.price !== combo.newPrice ? 'line-through' : 'none'}
										>
											{combo.price.toLocaleString('vi-VN')}đ
										</Text>

										{combo.price !== combo.newPrice && (
											<Text
												color='red'
												fontSize='xl'
												fontWeight={600}
											>
												{combo.newPrice.toLocaleString('vi-VN')}đ
											</Text>
										)}
									</VStack>
								</HStack>
							</CardHeader>

							<CardBody>
								<Grid
									templateColumns='repeat(4, 1fr)'
									gap={5}
								>
									{combo.products.map((product) => (
										<GridItem key={product.id}>
											<Product data={product} />
										</GridItem>
									))}
								</Grid>
							</CardBody>
						</Card>
					))}
				</VStack>

				<Center>
					<ReactPaginate
						breakLabel='...'
						previousLabel={<ReactIcon icon='IoChevronBack' />}
						nextLabel={<ReactIcon icon='IoChevronForward' />}
						forcePage={currentPage}
						pageRangeDisplayed={9}
						pageCount={comboQuery.data?.extra.totalPages || 1}
						renderOnZeroPageCount={null}
						containerClassName='paginate-container'
						onPageChange={(page) => setCurrentPage(page.selected)}
					/>
				</Center>
			</RouteChecking>
		</BaseLayout>
	);
};

export default ComboPage;
