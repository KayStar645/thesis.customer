import {
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	HStack,
	StackDivider,
	Text,
	Textarea,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { usePost } from '@hook/mutations';
import { useGet } from '@hook/queries';
import { useDispatch, useSelector } from '@redux/index';
import { cartSlice } from '@redux/slices';
import { CartDetailType } from '@type/collection';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { CartProductList } from './cart-product-list';
import { useTranslation } from '@hook/use-translation';
import { Loading } from '@component/ui';
import { CartSelectVoucher } from './cart-select-voucher-drawer';

const CartOrderDrawer = ({ onClose }: { onClose: () => void }) => {
	const { t } = useTranslation();
	const selectVoucherDrawerState = useDisclosure();
	const dispatch = useDispatch();
	const createOrderMutate = usePost<{ message: string }>('create-order');
	const voucher = useSelector((state) => state.cart.voucher);
	const cartDetails = useSelector((state) => state.cart.details);
	const message = useSelector((state) => state.cart.message);

	const productCartsQuery = useGet<CartDetailType>({
		api: 'cart-detail',
	});

	useEffect(() => {
		dispatch(cartSlice.actions.setData(productCartsQuery.data?.data));
	}, [productCartsQuery.data?.data]);

	const onCreateOrder = () => {
		createOrderMutate.mutate(
			{
				message,
			},
			{
				onSuccess() {
					toast.success(t('request:CREATE_ORDER_SUCCESS'));

					dispatch(
						cartSlice.actions.setData({
							details: cartDetails.filter((t) => !t.isSelected),
							total: 0,
							totalAmount: 0,
							totalDecrease: 0,
						}),
					);

					onClose();
				},
			},
		);
	};

	return (
		<>
			<Drawer
				placement='right'
				size='xl'
				isOpen={true}
				onClose={onClose}
			>
				<DrawerOverlay />

				<DrawerContent position='relative'>
					<Loading show={createOrderMutate.isPending} />

					<DrawerHeader>
						<HStack justifyContent='space-between'>
							<Text>{t('common:order_info')}</Text>

							<HStack justifyContent='center'>
								<Button
									variant='outline'
									mr={3}
									onClick={onClose}
								>
									{t('common:cancel')}
								</Button>

								<Button
									colorScheme='green'
									onClick={onCreateOrder}
								>
									{t('common:confirm')}
								</Button>
							</HStack>
						</HStack>
					</DrawerHeader>

					<DrawerBody>
						<CartProductList readonly={true} />

						<HStack></HStack>
					</DrawerBody>

					<DrawerFooter
						flexDirection='column'
						gap={8}
					>
						<VStack
							w='100%'
							align='stretch'
							borderWidth='2px'
							borderColor='green.400'
							borderStyle='dashed'
							p={5}
							borderRadius='md'
							shadow='md'
							spacing={4}
							divider={<StackDivider borderColor='gray.200' />}
						>
							<HStack justifyContent='space-between'>
								<Text>{t('common:total_amount')}: </Text>
								<Text>{productCartsQuery.data?.data?.total?.toLocaleString('vi-VN')}đ</Text>
							</HStack>

							<HStack justifyContent='space-between'>
								<Text>{t('common:voucher')}:</Text>

								<HStack
									divider={<StackDivider borderColor='gray.200' />}
									spacing={4}
								>
									<Text
										color='green'
										textDecoration='underline'
									>
										{voucher?.internalCode}
									</Text>

									<Button
										colorScheme='blue'
										onClick={() => {
											selectVoucherDrawerState.onOpen();
										}}
									>
										{voucher ? t('common:select_another_voucher') : t('common:select_voucher')}
									</Button>
								</HStack>
							</HStack>

							<HStack justifyContent='space-between'>
								<Text>{t('common:total_decrease')}: </Text>
								<Text>{productCartsQuery.data?.data?.totalDecrease?.toLocaleString('vi-VN')}đ</Text>
							</HStack>

							<HStack justifyContent='space-between'>
								<Text>{t('common:total')}:</Text>
								<Text
									color='red'
									fontWeight={600}
								>
									{productCartsQuery.data?.data?.totalAmount?.toLocaleString('vi-VN')}đ
								</Text>
							</HStack>

							<HStack
								justifyContent='space-between'
								align='flex-start'
							>
								<Text w={40}>{t('common:message')}: </Text>

								<Textarea
									placeholder={t('common:message')}
									onChange={(e) => dispatch(cartSlice.actions.setMessage(e.target.value))}
								/>
							</HStack>
						</VStack>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

			{selectVoucherDrawerState.isOpen && (
				<CartSelectVoucher
					onClose={selectVoucherDrawerState.onClose}
					voucher={voucher}
					onConfirm={() => {
						productCartsQuery.refetch();
					}}
				/>
			)}
		</>
	);
};

export { CartOrderDrawer };
