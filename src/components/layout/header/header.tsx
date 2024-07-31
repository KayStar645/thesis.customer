'use client';

import { Box, Flex, HStack, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { MAX_WIDTH } from '@config/index';
import { useRouter, useTranslation } from '@hook/index';
import { Image, Link, ReactIcon } from '../../ui';
import { AuthButtons } from './auth-buttons';
import { useRef } from 'react';

const Header = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<Box>
			<Box backgroundColor='black'>
				<Flex
					maxWidth={MAX_WIDTH}
					mx='auto'
					py={2}
					justifyContent='space-between'
				>
					<Link href='root'>
						<Image
							src='LogoImage'
							alt='logo'
							width={70}
						/>
					</Link>

					<Flex
						alignItems='center'
						gap={12}
					>
						<AuthButtons />

						<HStack
							as={Link}
							href='cart'
							spacing={3}
							textColor='white'
						>
							<ReactIcon icon='FaShoppingCart' />

							<Text>{t('common:cart')}</Text>
						</HStack>

						<HStack
							as={Link}
							href='tel:1900 6800'
							textColor='white'
							spacing={3}
						>
							<ReactIcon icon='FaPhoneVolume' />

							<Text>1900 6800</Text>
						</HStack>
					</Flex>
				</Flex>
			</Box>

			<Box backgroundColor='bright-green'>
				<Flex
					alignItems='center'
					justifyContent='space-between'
					h='60px'
					maxWidth={MAX_WIDTH}
					mx='auto'
					gap={8}
				>
					<InputGroup
						flex={1}
						maxW='600px'
					>
						<Input
							ref={inputRef}
							onKeyUp={(e) => {
								const input = e.target as HTMLInputElement;

								if (e.code === 'Enter' && input.value) {
									router.push('search', {
										keyword: input.value,
									});
								}
							}}
							placeholder={t('common:what_to_find')}
							borderRadius='full'
							backgroundColor='white'
							boxShadow='inner'
						/>

						<InputRightElement
							borderRadius='full'
							cursor='pointer'
							transition='all linear 0.1s'
							_hover={{
								backgroundColor: 'green.500',
								color: 'white',
							}}
							onClick={() => {
								if (inputRef.current?.value) {
									router.push('search', {
										keyword: inputRef.current.value,
									});
								}
							}}
						>
							<ReactIcon icon='HiMiniMagnifyingGlass' />
						</InputRightElement>
					</InputGroup>

					<Flex
						alignItems='center'
						gap={8}
					>
						<HStack
							as={Link}
							href='combo'
							spacing={3}
							textColor='white'
						>
							<ReactIcon
								icon='HiTicket'
								size={20}
							/>

							<Text>{t('common:combo')}</Text>
						</HStack>
					</Flex>
				</Flex>
			</Box>
		</Box>
	);
};

export { Header };
