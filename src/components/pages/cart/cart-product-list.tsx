import { StackDivider, VStack } from '@chakra-ui/react';
import { useSelector } from '@redux/index';
import { CartProductItem } from './cart-product-item';

const CartProductList = ({ readonly }: { readonly?: boolean }) => {
	const items = useSelector((state) => state.cart.details);

	return (
		<VStack
			flexDirection='column'
			spacing={8}
			align='stretch'
			divider={<StackDivider borderColor='gray.200' />}
		>
			{items
				?.filter((t) => (readonly ? t.isSelected : true))
				?.map((item, index) => (
					<CartProductItem
						key={item.productId}
						data={item}
						index={index}
						readonly={readonly}
					/>
				))}
		</VStack>
	);
};

export { CartProductList };
