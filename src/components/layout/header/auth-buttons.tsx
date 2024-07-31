import { Flex, HStack, StackDivider, Text } from '@chakra-ui/react';
import { useCookies, useTranslation } from '@hook/index';
import { Link, ReactIcon } from '../../ui';
import { logout } from '@lib/request';

const AuthButtons = () => {
	const { t } = useTranslation();
	const cookies = useCookies();

	return (
		<>
			{!cookies.get('is_login') && (
				<HStack
					spacing={4}
					divider={<StackDivider borderBlock='gray.200' />}
					h='fit-content'
				>
					<Link
						href='login'
						color='white'
					>
						{t('auth:login')}
					</Link>

					<Link
						href='register'
						color='white'
					>
						{t('auth:register')}
					</Link>
				</HStack>
			)}

			{cookies.get('is_login') && (
				<HStack
					spacing={4}
					divider={<StackDivider borderBlock='gray.200' />}
					h='fit-content'
				>
					<Flex
						as={Link}
						href='profile'
						textColor='white'
						alignItems='center'
						gap={2}
					>
						<ReactIcon icon='RiUser3Fill' />

						<Text>{t('common:account')}</Text>
					</Flex>

					<Link
						href='login'
						color='white'
						onClick={() => {
							logout();
						}}
					>
						{t('auth:logout')}
					</Link>
				</HStack>
			)}
		</>
	);
};
export { AuthButtons };
