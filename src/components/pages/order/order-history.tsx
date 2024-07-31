import React, { useState } from 'react';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Center,
    Select
} from '@chakra-ui/react';
import { OrderHistoryCollectionType } from '@type/collection';
import { useGet } from '@hook/queries';
import { usePatch } from '@hook/mutations';
import { OrderStatusType } from '@type/common';
import OrderDetail from './order-detail';
import { toast } from 'react-toastify';
import { useTranslation } from '@hook/use-translation';
import ReactPaginate from 'react-paginate';
import { ReactIcon } from '@component/ui';
import { useRouter } from '@hook/index';

const OrderHistory: React.FC = () => {
    const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const orderHistoryQuery = useGet<OrderHistoryCollectionType[]>({
        api: 'order-history',
        filter: {
            Sorts: '-date',
            Page: currentPage + 1,
            Filters: selectedStatus !== null ? 'status==' + selectedStatus.toString() : '',
        }
    });
    const { t } = useTranslation();
    const router = useRouter();
    const orderStatus = usePatch('order-change-status');
    const orderCancel = usePatch('order-cancel');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedOrder, setSelectedOrder] = useState<OrderHistoryCollectionType | null>(null);

    const handleViewDetails = (order: OrderHistoryCollectionType) => {
        setSelectedOrder(order);
        onOpen();
    };

    const handleContinueShopping = () => {
        router.push("root")
    };

    const handleReceivedClick = async (id: number) => {
        try {
            const data: OrderStatusType = {
                orderId: id,
                status: 4 // Assuming 4 represents 'Hoàn Thành'
            };
            await orderStatus.mutateAsync(data);
            toast.success(t('request:UPDATE_ORDER_SUCCESS'));
            orderHistoryQuery.refetch();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleCancelClick = async (id: number) => {
        try {
            const data: OrderStatusType = {
                orderId: id,
            };
            await orderCancel.mutateAsync(data);
            toast.success(t('request:CANCEL_ORDER_SUCCESS'));

            orderHistoryQuery.refetch();
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    const handleStatusChange = (status: number | null) => {
        setSelectedStatus(status);
    };


    return (
        <Box p={5} bg="gray.50" borderRadius="lg" boxShadow="md">
            <Heading as="h1" mb={5} size="lg" color="teal.600" textAlign="center">
                LỊCH SỬ ĐƠN HÀNG
            </Heading>
            <Box mb={3} mt={3}>
                <Select
                    placeholder="Chọn trạng thái đơn hàng"
                    onChange={(e) => handleStatusChange(parseInt(e.target.value))}
                    value={selectedStatus || ''}
                >
                    <option value="">Tất cả</option>
                    <option value="1">Đang chờ xác nhận</option>
                    <option value="2">Đã xác nhận</option>
                    <option value="3">Đang vận chuyển</option>
                    <option value="4">Hoàn Thành</option>
                    <option value="5">Đã hủy</option>
                </Select>
            </Box>

            <Table variant="simple" bg="white" borderRadius="md" overflow="hidden">
                <Thead bg="teal.500">
                    <Tr>
                        <Th color="white">Mã Đơn Hàng</Th>
                        <Th color="white">Ngày</Th>
                        <Th color="white">Tổng Số Tiền</Th>
                        <Th color="white">Trạng Thái</Th>
                        <Th color="white">Hành Động</Th>
                    </Tr>
                </Thead>
                {orderHistoryQuery.data?.data != null ? (
                    <Tbody>
                        {orderHistoryQuery.data?.data.map(order => (
                            <Tr key={order.internalCode} _hover={{ bg: "gray.50" }}>
                                <Td fontWeight="medium">{order.internalCode}</Td>
                                <Td>{new Date(order.date).toLocaleString('vi-VN')}</Td>
                                <Td>{order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Td>
                                <Td>
                                    <Badge colorScheme={getStatusColor(order.status)} borderRadius="full" px={2}>
                                        {getStatusText(order.status)}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Button size="sm" colorScheme="teal" mr={2} onClick={() => handleViewDetails(order)}>
                                        Xem Chi Tiết
                                    </Button>
                                    {order.status === 1 && (
                                        <Button size="sm" colorScheme="red" onClick={() => handleCancelClick(order.id)}>
                                            Hủy
                                        </Button>
                                    )}
                                    {order.status === 3 && (
                                        <Button size="sm" colorScheme="blue" onClick={() => handleReceivedClick(order.id)}>
                                            Đã Nhận
                                        </Button>
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>) : (<Tbody>
                        <Tr>
                            <Td colSpan={5} textAlign="center">Không có đơn hàng</Td>
                        </Tr>
                    </Tbody>)}
            </Table>
            <Center>
                <ReactPaginate
                    breakLabel='...'
                    previousLabel={<ReactIcon icon='IoChevronBack' />}
                    nextLabel={<ReactIcon icon='IoChevronForward' />}
                    forcePage={currentPage}
                    pageRangeDisplayed={8}
                    pageCount={orderHistoryQuery.data?.extra.totalPages || 1}
                    renderOnZeroPageCount={null}
                    containerClassName='paginate-container'
                    onPageChange={(page) => setCurrentPage(page.selected)}
                />
            </Center>
            <Button mt={5} colorScheme="teal" onClick={handleContinueShopping}>
                Tiếp Tục Đặt Hàng
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay />
                <ModalContent maxWidth="50vw" maxHeight="90vh">
                    <ModalHeader>Chi tiết đơn hàng: {selectedOrder?.internalCode}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflowY="auto">
                        {selectedOrder && <OrderDetail orderId={selectedOrder.id} />}
                    </ModalBody>
                </ModalContent>
            </Modal>

        </Box>
    );
};

const getStatusText = (status: number): string => {
    switch (status) {
        case 0: return 'Đã Hủy';
        case 1: return 'Đang chờ xác nhận';
        case 2: return 'Đã xác nhận';
        case 3: return 'Đang vận chuyển';
        case 4: return 'Hoàn Thành';
        case 5: return 'Đã hủy';
        default: return 'Không rõ';
    }
};

const getStatusColor = (status: number): string => {
    switch (status) {
        case 0: return 'red';
        case 1: return 'yellow';
        case 3: return 'blue';
        case 4: return 'green';
        case 5: return 'gray';
        default: return 'gray';
    }
};

export default OrderHistory;
