import { Skeleton } from '@chakra-ui/react';
import { Image, Slider } from '@component/ui';
import { skeletons } from '@lib/util';
import { useSelector } from '@redux/index';

const ProductDetailImage = () => {
	const { data } = useSelector((state) => state.productDetail);

	return (
		<Slider>
			{(data?.images || skeletons<string>(5)).map((image) => (
				<Skeleton
					isLoaded={!!data?.images}
					key={image}
				>
					<Image
						src={image}
						w='100%'
						h='100%'
						borderRadius={8}
						objectFit='contain'
					/>
				</Skeleton>
			))}
		</Slider>
	);
};

export { ProductDetailImage };
