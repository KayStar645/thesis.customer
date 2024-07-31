import { HStack, VStack } from '@chakra-ui/react';
import { useTranslation } from '@hook/index';
import { Link, ReactIcon } from '../../ui';

const CustomerSupport = () => {
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
					icon='MdSupportAgent'
					size={20}
				/>
				<Link href=''>{t('app:customer_support')}</Link>
			</HStack>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:shopping_guide')}
			</Link>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:electronic_bill')}
			</Link>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:frequently_question')}
			</Link>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:installation_price_list')}
			</Link>
		</VStack>
	);
};

export { CustomerSupport };
