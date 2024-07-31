'use client';

import { Box, Grid, GridItem, StackDivider, VStack } from '@chakra-ui/react';
import { BaseLayout } from '@component/layout';
import {
	ProductDetailDescribe,
	ProductDetailFeature,
	ProductDetailImage,
	ProductDetailInfo,
	ProductDetailParameter,
} from '@component/pages/product-detail';
import { useGet } from '@hook/queries';
import { useDispatch } from '@redux/index';
import { productDetailSlice } from '@redux/slices';
import { ProductCollectionType } from '@type/collection';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const ProductDetailPage = () => {
	const params = useSearchParams();
	const dispatch = useDispatch();

	const productDetailQuery = useGet<ProductCollectionType>({
		api: 'product-detail',
		filter: {
			id: params.get('id'),
			IsAllDetail: true,
		},
	});

	useEffect(() => {
		dispatch(productDetailSlice.actions.setData(productDetailQuery.data?.data));
	}, [productDetailQuery.data]);

	return (
		<BaseLayout>
			<Grid
				gridTemplateColumns='repeat(2, 1fr)'
				gap={8}
				mt={10}
				h='calc(100vh - 170px)'
			>
				<GridItem
					w='100%'
					overflow='hidden'
					borderRadius={8}
				>
					<ProductDetailImage />
				</GridItem>

				<GridItem w='100%'>
					<ProductDetailInfo />
				</GridItem>

			</Grid>
			<hr></hr>
			<ProductDetailDescribe />
			<hr></hr>
			<ProductDetailFeature />
			<hr></hr>
			<ProductDetailParameter />
		</BaseLayout>
	);
};

export default ProductDetailPage;
