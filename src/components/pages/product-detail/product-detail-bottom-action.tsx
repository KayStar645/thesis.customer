import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import { Button, Loading, ReactIcon } from '@component/ui';
import { useTranslation } from '@hook/index';
import { usePost } from '@hook/mutations';
import { useSelector } from '@redux/index';
import { AddToCartType } from '@type/collection';
import { toast } from 'react-toastify';

const ProductDetailBottomAction = () => {
	const { t } = useTranslation();
	const quantity = useSelector((state) => state.productDetail.quantity);
	const productId = useSelector((state) => state.productDetail.data?.id);
	const productQuantity = useSelector((state) => state.productDetail.data?.quantity);
	const addToCartMutate = usePost<any, AddToCartType>('add-to-cart');

	const onAddToCart = () => {
		if (productId) {
			addToCartMutate.mutate(
				{
					productId,
					quantity,
				},
				{
					onSuccess() {
						toast.success(t('request:ADD_TO_CART_SUCCESS'));
					},
					onError(error) {
						toast.error(error.message);
					},
				},
			);
		}
	};

	return (
		<Grid
			gridTemplateColumns='repeat(2, 1fr)'
			templateRows='repeat(1, 1fr)'
			gap={1}

		>

			<GridItem>

				<Loading
					show={addToCartMutate.isPending}
					onTop={true}
				/>
				<Button
					size='md'
					height='48px'
					width='200px'
					border='2px'
					isDisabled={!productQuantity}
					checkLogin={true}
					colorScheme='green'
					leftIcon={
						<ReactIcon
							icon='BsFillCreditCard2FrontFill'
							size={18}
						/>
					}
				>
					{t('common:buy_now')}
				</Button>


			</GridItem>
			<GridItem>
				<Button
					size='md'
					height='48px'
					width='200px'
					border='2px'
					checkLogin={true}
					colorScheme='teal'
					leftIcon={
						<ReactIcon
							icon='FaCartArrowDown'
							size={18}
						/>
					}
					onClick={onAddToCart}
				>
					{t('common:add_to_cart')}
				</Button>
			</GridItem>
		</Grid>
	);
};

export { ProductDetailBottomAction };
