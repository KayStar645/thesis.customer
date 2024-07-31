import { Box, Grid, GridItem, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from '@hook/index';
import { HTML } from '@lib/util';
import { useSelector } from '@redux/index';

const ProductDetailFeature = () => {
	const { t } = useTranslation();
	const feature = useSelector((state) => state.productDetail.data?.feature);

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
					{t('common:feature')}
				</Text>
				{!feature && (
					<SkeletonText
						noOfLines={10}
						skeletonHeight={5}
					/>
				)}
				<Box dangerouslySetInnerHTML={HTML(feature)} />
			</GridItem>

		</Grid>
	);
};

export { ProductDetailFeature };
