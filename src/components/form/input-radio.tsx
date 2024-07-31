import { HStack, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { InputRadioType } from '@type/form';

const InputRadio = ({ container, label, input, options }: InputRadioType) => {
	return (
		<RadioGroup
			{...container}
			onChange={input?.onChange}
			value={input?.value}
		>
			{input?.label && (
				<Text
					{...label}
					mb={3}
					fontWeight='medium'
				>
					{input?.label} {input?.required && <Text textColor='red.500'>*</Text>}
				</Text>
			)}

			<HStack
				direction='row'
				spacing={4}
			>
				{options.map((option) => (
					<Radio
						key={option.code}
						value={option.code}
						colorScheme='teal'
					>
						{option.label}
					</Radio>
				))}
			</HStack>

			{input?.message && (
				<Text
					textColor='red.400'
					fontSize='sm'
					mt={1}
				>
					{input.message}
				</Text>
			)}
		</RadioGroup>
	);
};

export { InputRadio };
