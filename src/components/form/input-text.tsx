import { Box, Input, Text } from '@chakra-ui/react';
import { InputTextType } from '@type/form';

const InputText = ({ container, label, input }: InputTextType) => {
	return (
		<Box {...container}>
			{input?.label && (
				<Text
					{...label}
					mb={3}
					fontWeight='medium'
				>
					{input?.label} {input?.required && <Text textColor='red.500'>*</Text>}
				</Text>
			)}

			<Input
				width='100%'
				px={3}
				{...input}
			/>

			{input?.message && (
				<Text
					textColor='red.400'
					fontSize='sm'
					mt={1}
				>
					{input.message}
				</Text>
			)}
		</Box>
	);
};

export { InputText };
