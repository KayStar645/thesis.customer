'use client';

import AuthSvg from '@asset/svg/svg-auth.svg';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { InputText } from '@component/form';
import { Link, Loading } from '@component/ui';
import { useRouter, useTranslation } from '@hook/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputRadio } from '@root/src/components/form/input-radio';
import { useRegisterMutate } from '@root/src/hooks/mutations';
import { defaultRegisterValues, getRegisterSchema } from '@schema/index';
import { RegisterType } from '@type/common';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const RegisterPage = () => {
	const { t } = useTranslation();
	const router = useRouter();

	const registerMutate = useRegisterMutate();

	const { control, handleSubmit } = useForm({
		defaultValues: defaultRegisterValues,
		resolver: zodResolver(getRegisterSchema(t)),
	});

	const onSubmit = (value: RegisterType) => {
		registerMutate.mutate(value, {
			onSuccess() {
				toast.success(t('auth:register_success'));

				router.push('login');
			},
			onError(error) {
				console.log('🚀 ~ onError ~ error:', error);
			},
		});
	};

	return (
		<Flex
			flexWrap='wrap'
			backgroundColor='white'
			minHeight='100vh'
		>
			<Loading show={registerMutate.isPending} />

			<Box flex={1}>
				<Flex
					px={8}
					py={16}
					gap={6}
					height='100%'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
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
						{t('auth:just_few_step_to_create_account')}
					</Text>

					<Text
						mb={9}
						fontSize='3xl'
						fontWeight='bold'
					>
						{t('auth:enter_your_detail')}
					</Text>

					<Flex
						flexDirection='column'
						width='100%'
						gap={5}
					>
						<Controller
							control={control}
							name='email'
							render={({ field: { name, value, onChange }, fieldState: { error } }) => (
								<InputText
									input={{
										name,
										value,
										onChange,
										message: error?.message,
										label: t('common:email'),
										placeholder: t('common:email'),
									}}
								/>
							)}
						/>

						<Controller
							control={control}
							name='phoneNumber'
							render={({ field: { name, value, onChange }, fieldState: { error } }) => (
								<InputText
									input={{
										name,
										value,
										onChange,
										message: error?.message,
										label: t('common:phone_number'),
										placeholder: t('common:phone_number'),
									}}
								/>
							)}
						/>

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
										label: t('common:user_name'),
										placeholder: t('common:user_name'),
									}}
								/>
							)}
						/>

						<Controller
							control={control}
							name='name'
							render={({ field: { name, value, onChange }, fieldState: { error } }) => (
								<InputText
									input={{
										name,
										value,
										onChange,
										message: error?.message,
										label: t('common:name'),
										placeholder: t('common:name'),
									}}
								/>
							)}
						/>

						<Controller
							control={control}
							name='gender'
							render={({ field: { value, onChange }, fieldState: { error } }) => (
								<InputRadio
									options={[
										{ code: 'Nam', label: t('common:male') },
										{ code: 'Nữ', label: t('common:female') },
									]}
									input={{
										value,
										onChange,
										message: error?.message,
										label: t('common:gender'),
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

						<Controller
							control={control}
							name='confirmPassword'
							render={({ field: { name, value, onChange }, fieldState: { error } }) => (
								<InputText
									input={{
										name,
										value,
										onChange,
										message: error?.message,
										type: 'password',
										label: t('auth:confirm_password'),
										placeholder: t('auth:confirm_password'),
									}}
								/>
							)}
						/>

						<Button
							colorScheme='green'
							onClick={handleSubmit(onSubmit)}
						>
							{t('auth:create_account')}
						</Button>

						<Box mt={4}>
							<Text fontWeight='medium'>
								{t('auth:have_account')}{' '}
								<Link
									href='login'
									color='green'
									display='inline'
								>
									{t('auth:login')}
								</Link>
							</Text>
						</Box>
					</Flex>
				</Flex>
			</Box>
		</Flex>
	);
};

export default RegisterPage;
