import { Box, Grid, GridItem, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from '@hook/index';
import { HTML } from '@lib/util';
import { useSelector } from '@redux/index';

const ProductDetailDescribe = () => {
	const { t } = useTranslation();
	const describes = useSelector((state) => state.productDetail.data?.describes);

	return (
		<Grid
			templateRows='repeat(1, 1fr)'
			h={'fit-content'}
		>
			<GridItem>
				<Text
					textAlign='center'
					fontWeight='700'
					fontSize='2xl'
				>
					{t('common:describe')}
				</Text>
				{!describes && (
					<SkeletonText
						noOfLines={10}
						skeletonHeight={5}
						p={2}
					/>
				)}

				<Box dangerouslySetInnerHTML={HTML(describes)} />
			</GridItem>
		</Grid>

	);
};

export { ProductDetailDescribe };
