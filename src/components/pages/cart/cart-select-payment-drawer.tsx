import {
    Button,
    Center,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Radio,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Loading, ReactIcon } from '@component/ui';
import { usePost } from '@hook/mutations';
import { useGet } from '@hook/queries';
import { useTranslation } from '@hook/use-translation';
import { useDispatch } from '@redux/index';
import { cartSlice } from '@redux/slices';
import { PaymentCollectionType } from '@type/collection/payment-collection';
import { format } from 'date-fns';
import { useState } from 'react';

const CartSelectPaymentMethod = ({
    onClose,
    onConfirm,
}: {
    onClose: () => void;
    onConfirm: () => void;
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentCollectionType | null>(null); // State for selected payment method
    //const applyPaymentMethodMutate = usePost<any, { paymentMethodId: string }>('apply-payment-method'); // Hook for mutating payment method

    // Example list of payment methods
    // const paymentMethods = useGet<PaymentCollectionType[]>({
    //     api: 'payment',
    // });

    // const onSubmit = () => {
    //     if (selectedPaymentMethod) {
    //         applyPaymentMethodMutate.mutate(
    //             {
    //                 paymentMethodId: selectedPaymentMethod.id,
    //             },
    //             {
    //                 onSuccess() {
    //                     dispatch(cartSlice.actions.setPaymentMethod(selectedPaymentMethod)); // Dispatch action to store selected payment method
    //                     onConfirm(); // Callback to confirm selection
    //                     onClose(); // Close drawer
    //                 },
    //             },
    //         );
    //     }
    // };

    // return (
    //     <Drawer
    //         placement='right'
    //         size='xl'
    //         isOpen={true}
    //         onClose={onClose}
    //     >
    //         <DrawerOverlay />

    //         <DrawerContent position='relative'>
    //             <Loading show={applyPaymentMethodMutate.isPending} />

    //             <DrawerHeader>
    //                 <HStack>
    //                     <Center
    //                         transition='all linear 0.2s'
    //                         cursor='pointer'
    //                         h={10}
    //                         w={10}
    //                         borderRadius='full'
    //                         _hover={{
    //                             backgroundColor: 'green.400',
    //                             color: 'white',
    //                         }}
    //                         onClick={onClose}
    //                     >
    //                         <ReactIcon
    //                             icon='IoChevronBack'
    //                             size={20}
    //                         />
    //                     </Center>

    //                     <Text flex={1}>
    //                         {t('common:list_of', {
    //                             obj: t('common:payment_methods').toLowerCase(), // Adjust translation key if needed
    //                         })}
    //                     </Text>

    //                     <Button
    //                         isDisabled={!selectedPaymentMethod}
    //                         colorScheme='green'
    //                         onClick={onSubmit}
    //                     >
    //                         {t('common:confirm')}
    //                     </Button>
    //                 </HStack>
    //             </DrawerHeader>

    //             <DrawerBody>
    //                 <VStack
    //                     align='stretch'
    //                     spacing={6}
    //                     divider={<StackDivider border='gray.300' />}
    //                 >
    //                     {paymentMethods.map((method) => (
    //                         <HStack
    //                             key={method.id}
    //                             spacing={4}
    //                             cursor='pointer'
    //                             transition='all linear 0.1s'
    //                             px={3}
    //                             py={4}
    //                             borderRadius='md'
    //                             backgroundColor={selectedPaymentMethod?.id === method.id ? 'green.400' : 'initial'}
    //                             color={selectedPaymentMethod?.id === method.id ? 'white' : 'initial'}
    //                             _hover={{
    //                                 backgroundColor: 'green.400',
    //                                 color: 'white',
    //                             }}
    //                             onClick={() => setSelectedPaymentMethod(method)}
    //                         >
    //                             <Radio
    //                                 size='lg'
    //                                 colorScheme='green'
    //                                 isChecked={selectedPaymentMethod?.id === method.id}
    //                             />

    //                             <VStack
    //                                 align='stretch'
    //                                 flex={1}
    //                             >
    //                                 <Text
    //                                     fontWeight='600'
    //                                     fontSize='lg'
    //                                 >
    //                                     {method.name}
    //                                 </Text>
    //                             </VStack>
    //                         </HStack>
    //                     ))}
    //                 </VStack>
    //             </DrawerBody>
    //         </DrawerContent>
    //     </Drawer>
    // );
};

export { CartSelectPaymentMethod };
