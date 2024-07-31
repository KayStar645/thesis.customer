'use client';

import { useState } from 'react';
import { Card, CardBody, Skeleton, Text, Box, Flex, Badge, IconButton, Button, VStack } from '@chakra-ui/react';
import { useTranslation } from '@hook/use-translation';
import { currency } from '@lib/util';
import { ProductCollectionType } from '@type/collection';
import { Image } from './image';
import { Link } from './link';
import { AiOutlineShoppingCart } from 'react-icons/ai'; // Import shopping cart icon
import { usePost } from '@hook/mutations';
import { useSelector } from '@redux/index';
import { AddToCartType } from '@type/collection';
import { toast } from 'react-toastify';
import { number } from 'zod';
const Product = ({ data }: { data: ProductCollectionType }) => {
	const { t } = useTranslation();
	const [isAdding, setIsAdding] = useState(false); // State to manage loading state of add to cart button
	const productId = useSelector((state) => state.productDetail.data?.id);
	const addToCartMutate = usePost<any, AddToCartType>('add-to-cart');

	const handleAddToCart = (id: number) => {
		setIsAdding(true);
		setTimeout(() => {
			setIsAdding(false);
			onAddToCart(id);
		}, 100);
	};
	const quantity: number = 1;
	const onAddToCart = (productId: any) => {
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
		<Card
			borderRadius='lg'
			overflow='hidden'
			height='auto'
			boxShadow='lg'
			_hover={{ boxShadow: 'xl' }}
			transition='box-shadow 0.3s'
		>
			<Skeleton isLoaded={!!data.name}>
				<Image
					src={data?.images?.[0]}
					alt={data.name || 'Product Image'}
					width='100%'
					height={250}
					objectFit='cover'
				/>
			</Skeleton>

			<CardBody p={4}>
				<Flex
					justify='space-between'
					align='center'
				>
					<Box flex='1'>
						<Skeleton isLoaded={!!data.name}>
							<Text
								fontWeight='bold'
								fontSize='xl'
								mb={2}
								noOfLines={2}
							>
								{data.name}
							</Text>
						</Skeleton>
					</Box>
				</Flex>

				<VStack
					align='start'
					spacing={2}
				>
					{data?.newPrice != data?.price ? (
						<>
							<Skeleton
								isLoaded={!!data?.price}
								height='20px'
							>
								<Text
									textColor={data?.newPrice ? 'gray' : 'red'}
									textDecoration={data?.newPrice ? 'line-through' : 'none'}
									fontWeight='bold'
									fontSize='md'
								>
									{currency(data?.price)}
								</Text>
							</Skeleton>

							{data?.newPrice && (
								<Text
									textColor='red.600'
									fontSize='2xl'
									fontWeight='bold'
									mt={1}
								>
									{currency(data?.newPrice)}
								</Text>
							)}

							<Badge
								colorScheme='green'
								mt={3}
							>
								{t('common:discount')}
							</Badge>
						</>
					) : (
						<Skeleton
							isLoaded={!!data?.price}
							height='20px'
							mt='35px'
							mb={5}
						>
							<Text
								textColor='red.600'
								fontSize='2xl'
								fontWeight='bold'
							>
								{currency(data?.price)}
							</Text>
						</Skeleton>
					)}
				</VStack>

				<Box>
					<Flex
						mt='auto'
						pt={4}
						justifyContent='space-between'
						alignItems='center'
					>
						<Link
							p={2}
							textAlign='center'
							backgroundColor='green.400'
							cursor='pointer'
							href='product-detail'
							params={{
								id: data.id.toString(),
							}}
							_hover={{
								backgroundColor: 'green.500',
							}}
							display='block'
							borderRadius='md'
							color='white'
							fontWeight='bold'
						>
							{t('common:see_more')}
						</Link>
						<IconButton
							aria-label='Add to cart'
							icon={<AiOutlineShoppingCart />}
							colorScheme='blue'
							variant='outline'
							onClick={() => handleAddToCart(data.id)}
							isLoading={isAdding}
							size='md'
							p={2}
						/>
					</Flex>
				</Box>
			</CardBody>
		</Card>
	);
};

export { Product };
