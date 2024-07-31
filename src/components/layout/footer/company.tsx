import { HStack, Text, VStack } from '@chakra-ui/react';
import { Link, ReactIcon } from '../../ui';
import { useTranslation } from '@hook/index';

const Company = () => {
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
					icon='HiBuildingOffice2'
					size={20}
				/>
				<Link href=''>{t('app:company_info')}</Link>
			</HStack>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:company_introduce')}
			</Link>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:business_buy')}
			</Link>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:hire')}
			</Link>

			<Link
				href=''
				fontWeight='200'
				ml={8}
			>
				{t('app:contact')}
			</Link>
		</VStack>
	);
};

export { Company };
