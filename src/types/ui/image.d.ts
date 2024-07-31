import { ImageProps as ChakraImageProps } from '@chakra-ui/react';
import { imageConfig } from '@config/image-config';

type ImageProps = Omit<ChakraImageProps, 'src'> & {
	src: keyof typeof imageConfig | (string & {});
	height?: number;
};

export type { ImageProps };
