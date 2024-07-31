import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import { Link } from '@component/ui';
import { useSearchParam, useTranslation } from '@hook/index';
import { usePathname } from 'next/navigation';
import queryString from 'query-string';

const LoginCheckingModal = () => {
	const { t } = useTranslation();
	const params = useSearchParam();
	const pathName = usePathname();

	return (
		<Modal
			isOpen={true}
			closeOnEsc={false}
			blockScrollOnMount={true}
			closeOnOverlayClick={false}
			isCentered={true}
			onClose={() => {}}
		>
			<ModalOverlay />

			<ModalContent>
				<ModalHeader>{t('common:notify')}</ModalHeader>

				<ModalBody>
					<Text>{t('auth:login_to_more')}</Text>
				</ModalBody>

				<ModalFooter
					as={Flex}
					justifyContent='flex-end'
					alignItems='center'
					gap={4}
				>
					<Button
						as={Link}
						href='login'
						colorScheme='green'
						params={{
							to: pathName + '?' + queryString.stringify(params),
						}}
					>
						{t('auth:login')}
					</Button>

					<Button
						as={Link}
						href='register'
						colorScheme='teal'
						params={{
							to: pathName + '?' + queryString.stringify(params),
						}}
					>
						{t('auth:register')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export { LoginCheckingModal };
