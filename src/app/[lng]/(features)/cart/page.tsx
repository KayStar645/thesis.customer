'use client';

import { Box } from '@chakra-ui/react';
import { RouteChecking } from '@component/auth';
import { BaseLayout } from '@component/layout';
import { CartOrderForm } from '@component/pages/cart';
import { CartProductList } from '@component/pages/cart/cart-product-list';
import { Loading } from '@component/ui';
import { useGet } from '@hook/queries';
import { useDispatch } from '@redux/index';
import { cartSlice } from '@redux/slices';
import { CartDetailType } from '@type/collection';
import { useEffect } from 'react';

const CartPage = () => {
	const dispatch = useDispatch();

	const productCartsQuery = useGet<CartDetailType>({
		api: 'cart-detail',
	});

	useEffect(() => {
		dispatch(cartSlice.actions.setData(productCartsQuery.data?.data));
	}, [productCartsQuery.data?.data]);

	return (
		<BaseLayout>
			<Loading
				show={productCartsQuery.isFetching}
				onTop={true}
			/>

			<RouteChecking>
				<Box mt={8}>
					<CartOrderForm order={productCartsQuery.data?.data} />

					<CartProductList />
				</Box>
			</RouteChecking>
		</BaseLayout>
	);
};

export default CartPage;
