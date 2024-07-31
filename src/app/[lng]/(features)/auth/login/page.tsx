'use client';

import AuthSvg from '@asset/svg/svg-auth.svg';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { InputText } from '@component/form';
import { Link, Loading } from '@component/ui';
import { useCookies, useRouter, useTranslation } from '@hook/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutate } from '@root/src/hooks/mutations';
import { defaultLoginValues, getLoginSchema } from '@schema/index';
import { LoginType } from '@type/common';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const LoginPage = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const cookies = useCookies();
	const loginMutate = useLoginMutate();
	const params = useSearchParams();

	const { control, handleSubmit } = useForm({
		defaultValues: defaultLoginValues,
		resolver: zodResolver(getLoginSchema(t)),
	});

	const onSubmit = (value: LoginType) => {
		loginMutate.mutate(value, {
			onSuccess() {
				if (params.has('to')) {
					router.push(params.get('to')!);

					return;
				}

				router.push('root');
			},
		});
	};

	return (
		<Flex
			flexWrap='wrap'
			backgroundColor='white'
			minHeight='100vh'
		>
			<Loading show={loginMutate.isPending} />

			<Box flex={1}>
				<Flex
					px={8}
					py={16}
					gap={6}
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
					height='100%'
					display={{
						base: 'none',
						lg: 'flex',
					}}
				>
					<Link
						mb={5}
						href='home'
					>
						<Text
							fontSize='4xl'
							fontWeight='bold'
						>
							{t('app:name')}
						</Text>
					</Link>

					<Text
						fontWeight='medium'
						textAlign='center'
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
					</Text>

					<Box mt={12}>
						<AuthSvg />
					</Box>
				</Flex>
			</Box>

			<Box
				flex={1}
				borderLeft='1px'
				borderLeftColor='gray.200'
			>
				<Flex
					height='100%'
					flexDirection='column'
					justify='center'
					alignItems='center'
					px={10}
				>
					<Text
						mb={2}
						fontWeight='medium'
						fontSize='lg'
						textColor='gray.500'
					>
						{t('auth:welcome_back')}
					</Text>

					<Text
						mb={9}
						fontSize='3xl'
						fontWeight='bold'
					>
						{t('auth:login_to_continue')}
					</Text>

					<Flex
						flexDirection='column'
						width='100%'
						gap={5}
					>
						<Controller
							control={control}
							name='userName'
							render={({ field: { name, value, onChange }, fieldState: { error } }) => (
								<InputText
									input={{
										name,
										value,
										onChange,
										message: error?.message,
										label: t('common:userName'),
										placeholder: t('common:userName'),
									}}
								/>
							)}
						/>
						<Controller
							control={control}
							name='password'
							render={({ field: { name, value, onChange }, fieldState: { error } }) => (
								<InputText
									input={{
										name,
										value,
										onChange,
										message: error?.message,
										type: 'password',
										label: t('auth:password'),
										placeholder: t('auth:password'),
									}}
								/>
							)}
						/>

						<Button
							colorScheme='green'
							onClick={handleSubmit(onSubmit)}
						>
							{t('auth:login')}
						</Button>

						<Box mt={4}>
							<Text fontWeight='medium'>
								{t('auth:dont_have_any_account')}{' '}
								<Link
									href='register'
									color='green'
									display='inline'
								>
									{t('auth:register')}
								</Link>
							</Text>
						</Box>
					</Flex>
				</Flex>
			</Box>
		</Flex>
	);
};

export default LoginPage;
