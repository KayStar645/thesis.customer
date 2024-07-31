import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { useTranslation } from '@hook/index';
import { useSelector } from '@redux/index';

const TokenExpiresModal = () => {
	const tokenExpires = useSelector((state) => state.tokenExpires);
	const { t } = useTranslation();

	return (
		<Modal
			isOpen={tokenExpires}
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
					<Text>{t('request:TOKEN_EXPIRES')}</Text>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='teal'>{t('auth:login')}</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export { TokenExpiresModal };
