import { LoginType, RegisterType, ResetPasswordType } from '@type/common';
import { TFunction } from 'i18next';
import { z } from 'zod';

const defaultLoginValues: LoginType = {
	userName: process.env.NODE_ENV === 'development' ? 'dev' : '',
	password: process.env.NODE_ENV === 'development' ? '123456' : '',
};

const defaultRegisterValues: RegisterType = {
	email: process.env.NODE_ENV === 'development' ? 'dev@gmail.com' : '',
	phoneNumber: process.env.NODE_ENV === 'development' ? '0999999999' : '',
	name: process.env.NODE_ENV === 'development' ? 'dev-test' : '',
	address: '',
	gender: '',
	userName: process.env.NODE_ENV === 'development' ? 'dev' : '',
	password: process.env.NODE_ENV === 'development' ? '123456' : '',
	confirmPassword: process.env.NODE_ENV === 'development' ? '123456' : '',
};

const defaultResetPasswordValues: ResetPasswordType = {
	token: '',
	password: '',
	confirmPassword: '',
};

const getLoginSchema = (t: TFunction) =>
	z.object({
		userName: z.string().min(1, t('validation:required', { attribute: t('common:userName') })),
		password: z.string().min(1, {
			message: t('validation:required', { attribute: t('auth:password') }),
		}),
	});

const getRegisterSchema = (t: TFunction) =>
	z
		.object({
			email: z
				.string()
				.min(1, {
					message: t('validation:required', { attribute: t('common:email') }),
				})
				.email({
					message: t('validation:invalid_format', { attribute: t('common:email') }),
				}),
			phoneNumber: z.string().min(1, {
				message: t('validation:required', { attribute: t('common:phoneNumber') }),
			}),
			name: z.string().min(1, {
				message: t('validation:required', { attribute: t('common:name') }),
			}),
			userName: z.string().min(1, {
				message: t('validation:required', { attribute: t('common:user_name') }),
			}),
			address: z.string(),
			gender: z.enum(['Nam', 'Nữ']),
			password: z.string().min(6, {
				message: t('validation:min.character', { value: 6 }),
			}),
			confirmPassword: z.string().min(6, {
				message: t('validation:min.character', { value: 6 }),
			}),
		})
		.refine((data) => data.confirmPassword === data.password, {
			message: t('validation:password_not_match'),
			path: ['confirmPassword'],
		});

const getResetPasswordSchema = (t: TFunction) =>
	z.object({
		email: z
			.string()
			.min(1, {
				message: t('validation:required', { attribute: t('common:email') }),
			})
			.email({
				message: t('validation:invalid_format', { attribute: t('common:email') }),
			}),
	});

const getNewPasswordSchema = (t: TFunction) =>
	z
		.object({
			password: z.string().min(6, {
				message: t('validation:min.character', { value: 6 }),
			}),
			confirmPassword: z.string().min(6, {
				message: t('validation:min.character', { value: 6 }),
			}),
		})
		.refine((data) => data.confirmPassword === data.password, {
			message: t('validation:password_not_match'),
			path: ['confirmPassword'],
		});

export {
	defaultLoginValues,
	defaultRegisterValues,
	defaultResetPasswordValues,
	getLoginSchema,
	getNewPasswordSchema,
	getRegisterSchema,
	getResetPasswordSchema,
};
