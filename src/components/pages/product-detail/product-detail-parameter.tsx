import { Box, Grid, GridItem, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from '@hook/index';
import { HTML } from '@lib/util';
import { useSelector } from '@redux/index';

const ProductDetailParameter = () => {
	const { t } = useTranslation();
	const specifications = useSelector((state) => state.productDetail.data?.specifications);

	return (
		<Grid
			templateRows='repeat(2, 1fr)'
			gap={8}
		>
			<GridItem>
				<Text
					textAlign='center'
					fontWeight='700'
					fontSize='2xl'
				>
					{t('common:parameter')}
				</Text>

				{!specifications && (
					<SkeletonText
						noOfLines={10}
						skeletonHeight={5}
					/>
				)}

				<Box dangerouslySetInnerHTML={HTML(specifications)} />
			</GridItem>
		</Grid>
	);
};

export { ProductDetailParameter };
