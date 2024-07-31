import { Alert, AlertIcon, HStack, Text } from '@chakra-ui/react';
import { Button, ReactIcon } from '@component/ui';
import { useTranslation } from '@hook/index';

const ProductDetailQuantity = ({
	quantity = 0,
	productQuantity = 0,
	onChange,
}: {
	onChange: (quantity: number) => void;
	productQuantity?: number;
	quantity?: number;
}) => {
	const { t } = useTranslation();

	return productQuantity ? (
		<HStack spacing={8}>
			<Text>{t('common:quantity')}</Text>

			<HStack spacing={4}>
				<Button
					onClick={() => {
						onChange(quantity - 1);
					}}
					isDisabled={productQuantity <= 1}
				>
					<ReactIcon
						icon='FiMinus'
						size={16}
					/>
				</Button>

				<Text>{quantity}</Text>

				<Button
					onClick={() => {
						onChange(quantity + 1);
					}}
					isDisabled={quantity === productQuantity}
				>
					<ReactIcon
						icon='FiPlus'
						size={16}
					/>
				</Button>
			</HStack>
		</HStack>
	) : (
		<Alert status='warning'>
			<AlertIcon />
			Sản phẩm hiện đang hết hàng
		</Alert>
	);
};

export { ProductDetailQuantity };
