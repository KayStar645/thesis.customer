import { Checkbox, Flex, Grid, Skeleton, Text, VStack, Button, Box } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Image } from '@component/ui';
import { useTranslation } from '@hook/index';
import { usePost } from '@hook/mutations';
import { useDispatch } from '@redux/index';
import { cartSlice } from '@redux/slices';
import { CartDetailItemType } from '@type/collection';
import { ProductDetailQuantity } from '../product-detail/product-detail-quantity';

const CartProductItem = ({
	data,
	readonly,
	index,
}: {
	data: CartDetailItemType;
	readonly?: boolean;
	index: number;
}) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const updateQuantityMutate = usePost<any, { productId: number; quantity: number; isSelected: boolean }>('add-to-cart', 'update');
	const deleteProductMutate = usePost<any, { productId: number }>('cart-remove', 'post');
	const isUpdating = updateQuantityMutate.status === 'pending';
	const isDeleting = deleteProductMutate.status === 'pending';

	const handleDeleteProduct = () => {
		deleteProductMutate.mutate(
			{ productId: data.productId },
			{
				onSuccess() {
					dispatch(cartSlice.actions.removeItem({ productId: data.productId }));
				},
			}
		);
	};

	const handleQuantityChange = (quantity: number) => {
		updateQuantityMutate.mutate(
			{
				isSelected: true,
				productId: data.productId,
				quantity: quantity,
			},
			{
				onSuccess() {
					dispatch(
						cartSlice.actions.updateItem({
							index,
							isSelected: data.isSelected,
							productId: data.productId,
							quantity: quantity,
						})
					);
				},
			}
		);
	};

	return (
		<Flex alignItems="flex-start" p={4} borderWidth={1} borderRadius="md">
			<Flex align="center" justify="space-between" flex={1}>
				{/* Checkbox */}
				{!readonly && (
					<Checkbox
						isChecked={data.isSelected}
						onChange={(e) => {
							updateQuantityMutate.mutate(
								{
									quantity: data.quantity,
									isSelected: e.target.checked,
									productId: data.productId,
								},
								{
									onSuccess() {
										dispatch(
											cartSlice.actions.updateItem({
												index,
												isSelected: !data.isSelected,
												productId: data.productId,
												quantity: data.quantity,
											})
										);
									},
								}
							);
						}}
					/>
				)}

				{/* Product Image and Details */}
				<Box position="relative" flex={1} ml={!readonly ? 4 : 0}>
					<Grid templateColumns="80px 1fr" gap={4} alignItems="center">
						{/* Product Image */}
						<Image
							src={data?.product?.images?.[0] ?? ''}
							w="80px"
							h="80px"
							objectFit="cover"
							fallback={<Skeleton w="80px" h="80px" />}
						/>

						{/* Product Details */}
						<VStack align="flex-start" spacing={1} w="100%">
							{/* Product Name */}
							<Text fontWeight="bold" fontSize="md">
								{data?.product?.name}
							</Text>

							{/* Price Information */}
							{data?.product?.newPrice ? (
								<Flex alignItems="center">
									<Text fontSize="lg" color="red.500" fontWeight="bold">
										{data?.product?.newPrice?.toLocaleString('vi-VN')}đ
									</Text>
									<Text fontSize="sm" color="gray.500" textDecoration="line-through" ml={2}>
										{data?.price?.toLocaleString('vi-VN')}đ
									</Text>
								</Flex>
							) : (
								<Text fontSize="lg" color="red.500" fontWeight="bold">
									{data?.price?.toLocaleString('vi-VN')}đ
								</Text>
							)}

							{/* Quantity Selector or Display */}
							<Flex align="center" justify="space-between" w="100%">
								{readonly ? (
									<Text fontSize="sm">Số lượng: {data.quantity}</Text>
								) : (
									<ProductDetailQuantity
										onChange={handleQuantityChange}
										quantity={data.quantity}
										productQuantity={data.product.quantity}
									/>
								)}

								{/* Delete Button */}
								{!readonly && data.quantity == 1 && (
									<Button
										colorScheme="red"
										size="md"
										py={2}
										pl={2}
										onClick={handleDeleteProduct}
										isLoading={isDeleting}
										rightIcon={<DeleteIcon />}
									>
									</Button>
								)}
							</Flex>
						</VStack>
					</Grid>
				</Box>
			</Flex>
		</Flex>
	);
};

export { CartProductItem };
