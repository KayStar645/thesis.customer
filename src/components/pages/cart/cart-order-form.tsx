import { Button, HStack, Skeleton, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from '@hook/index';
import { CartDetailType } from '@type/collection';
import { useRef } from 'react';
import { CartOrderDrawer } from './cart-order-drawer';
import { useRouter } from '@hook/index';
import { useSelector } from '@redux/index';

const CartOrderForm = ({ order }: { order?: CartDetailType }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement>(null);
	const { t } = useTranslation();
	const router = useRouter();
	const cartDetails = useSelector((state) => state.cart.details);
	const handleOrderHistoryClick = () => {
		window.location.href = `http://localhost:8888/vi/order-history`;
	};

	const handleContinueShoppingClick = () => {
		// Replace this URL with your shopping page URL
		router.push('/');
	};

	const isCartEmpty = !Array.isArray(cartDetails) || cartDetails.length === 0;
	const isAllItemsUnselected = Array.isArray(cartDetails) && cartDetails.every(item => !item.isSelected);
	return (
		<>
			<HStack
				justifyContent='space-between'
				backgroundColor='gray.100'
				padding={4}
				mb={8}
				borderRadius='md'
			>
				<Text
					fontSize='xl'
					fontWeight={600}
				>
					{t('common:your_cart')}
				</Text>

				<Skeleton isLoaded={!!order}>
					<Button
						ref={btnRef}
						isDisabled={isCartEmpty || isAllItemsUnselected}
						colorScheme='green'
						onClick={onOpen}
					>
						{t('common:order')}
					</Button>
					<Button
						ref={btnRef}
						colorScheme='yellow'
						onClick={handleOrderHistoryClick}
						ml={2}
					>
						{t('common:order-history')}
					</Button>
					<Button
						colorScheme='teal'
						onClick={handleContinueShoppingClick}
						ml={2}
					>
						{t('common:continue_shopping')}
					</Button>
				</Skeleton>
			</HStack>

			{isOpen && <CartOrderDrawer onClose={onClose} />}
		</>
	);
};

export { CartOrderForm };
