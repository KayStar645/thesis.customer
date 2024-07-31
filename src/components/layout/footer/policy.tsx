import { HStack, Text, VStack } from '@chakra-ui/react';
import { Link, ReactIcon } from '../../ui';
import { useTranslation } from '@hook/index';

const Policy = () => {
	const { t } = useTranslation();
	return (
		<VStack
			align='flex-start'
			spacing={3}
		>
			<HStack
				spacing={3}
				fontWeight='700'
			>
				<ReactIcon
					icon='AiOutlineFileProtect'
					size={20}
				/>
				<Link href=''>{t('app:policy')}</Link>
			</HStack>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:partner_incentives')}
			</Link>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:trading_conditions')}
			</Link>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:warranty_policy')}
			</Link>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:warranty_product_policy')}
			</Link>
		</VStack>
	);
};

export { Policy };
