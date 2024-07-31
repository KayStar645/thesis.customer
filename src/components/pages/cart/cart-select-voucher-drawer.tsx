import {
	Button,
	Center,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	HStack,
	Radio,
	StackDivider,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Loading, ReactIcon } from '@component/ui';
import { usePost } from '@hook/mutations';
import { useGet } from '@hook/queries';
import { useTranslation } from '@hook/use-translation';
import { useDispatch } from '@redux/index';
import { cartSlice } from '@redux/slices';
import { VoucherCollectionType } from '@type/collection/voucher-collection';
import { format } from 'date-fns';
import { useState } from 'react';

const CartSelectVoucher = ({
	onClose,
	voucher,
	onConfirm,
}: {
	onClose: () => void;
	onConfirm: () => void;
	voucher?: VoucherCollectionType;
}) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [selected, setSelected] = useState(voucher);
	const applyVoucherMutate = usePost<any, { internalCodeCoupon: string }>('apply-voucher');

	const voucherQuery = useGet<VoucherCollectionType[]>({
		api: 'voucher',
		filter: {
			filters: 'status==1',
		},
	});

	const onSubmit = () => {
		applyVoucherMutate.mutate(
			{
				internalCodeCoupon: selected?.internalCode!,
			},
			{
				onSuccess() {
					dispatch(cartSlice.actions.setVoucher(selected!));
					onConfirm();
					onClose();
				},
			},
		);
	};

	return (
		<Drawer
			placement='right'
			size='xl'
			isOpen={true}
			onClose={onClose}
		>
			<DrawerOverlay />

			<DrawerContent position='relative'>
				<Loading show={voucherQuery.isFetching || applyVoucherMutate.isPending} />

				<DrawerHeader>
					<HStack>
						<Center
							transition='all linear 0.2s'
							cursor='pointer'
							h={10}
							w={10}
							borderRadius='full'
							_hover={{
								backgroundColor: 'green.400',
								color: 'white',
							}}
							onClick={onClose}
						>
							<ReactIcon
								icon='IoChevronBack'
								size={20}
							/>
						</Center>

						<Text flex={1}>
							{t('common:list_of', {
								obj: t('common:voucher').toLowerCase(),
							})}
						</Text>

						<Button
							isDisabled={!selected}
							colorScheme='green'
							onClick={onSubmit}
						>
							{t('common:confirm')}
						</Button>
					</HStack>
				</DrawerHeader>

				<DrawerBody>
					<VStack
						align='stretch'
						spacing={6}
						divider={<StackDivider border='gray.300' />}
					>
						{voucherQuery.data?.data.map((voucher) => (
							<HStack
								key={voucher.id}
								spacing={4}
								cursor='pointer'
								transition='all linear 0.1s'
								px={3}
								py={4}
								borderRadius='md'
								backgroundColor={selected?.id === voucher?.id ? 'green.400' : 'initial'}
								color={selected?.id === voucher?.id ? 'white' : 'initial'}
								_hover={{
									backgroundColor: 'green.400',
									color: 'white',
								}}
								onClick={() => setSelected(voucher)}
							>
								<Radio
									size='lg'
									colorScheme='green'
									isChecked={selected?.id === voucher.id}
								/>

								<Center
									w={20}
									h={20}
									textColor='red.400'
									filter='drop-shadow(2px 2px 4px #999)'
								>
									<ReactIcon
										icon='IoTicket'
										size={40}
									/>
								</Center>

								<VStack
									align='stretch'
									flex={1}
								>
									<Text
										fontWeight='600'
										fontSize='lg'
									>
										[{voucher.internalCode}]-{voucher.name}
									</Text>

									<Text>
										{voucher.type === 0
											? t('common:voucher_description_type_0', {
													start: format(voucher.start, 'dd/MM/yyyy'),
													end: format(voucher.end, 'dd/MM/yyyy'),
													discount: voucher.discount.toLocaleString('vi-VN'),
													percentMax: voucher.percentMax,
													interpolation: { escapeValue: false },
											  })
											: ''}
									</Text>
								</VStack>
							</HStack>
						))}
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export { CartSelectVoucher };
