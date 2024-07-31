import { HStack, VStack } from '@chakra-ui/react';
import { useTranslation } from '@hook/index';
import { Image, Link, ReactIcon } from '../../ui';

const RelatedChannel = () => {
	const { t } = useTranslation();
	return (
		<VStack
			align='flex-start'
			spacing={3}
		>
			<HStack spacing={3}>
				<ReactIcon
					icon='FaMedium'
					size={20}
				/>
				<Link href=''>{t('app:related_channels')}</Link>
			</HStack>

			<HStack
				ml={8}
				spacing={4}
			>
				<Image
					alt='facebook'
					src='FacebookIcon'
					width={30}
				/>

				<Image
					alt='instagram'
					src='InstagramIcon'
					width={30}
				/>

				<Image
					alt='google'
					src='GoogleIcon'
					width={30}
				/>
			</HStack>
		</VStack>
	);
};

export { RelatedChannel };
