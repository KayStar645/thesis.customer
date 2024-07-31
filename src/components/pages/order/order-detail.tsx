import React, { useEffect, useState } from 'react';
import { useTranslation } from '@hook/index';
import { useGet } from '@hook/queries';
import { OrderDetailCollectionType } from '@type/collection';
import {
	Box,
	Heading,
	Text,
	Badge,
	Flex,
	Grid,
	GridItem,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Image,
	Stat,
	StatLabel,
	StatNumber,
	StatGroup,
	VStack,
	HStack,
	useColorModeValue
} from '@chakra-ui/react';

interface OrderDetailProps {
	orderId: number;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
	const { t } = useTranslation();
	const [orderDetail, setOrderDetail] = useState<OrderDetailCollectionType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const orderDetailQuery = useGet<OrderDetailCollectionType>({
		api: 'order-detail',
		filter: {
			Id: orderId
		}
	});

	useEffect(() => {
		if (orderDetailQuery.isSuccess) {
			setOrderDetail(orderDetailQuery.data?.data);
			setLoading(false);
		} else if (orderDetailQuery.isError) {
			setError('Lỗi khi lấy chi tiết đơn hàng');
			setLoading(false);
		}
	}, [orderId, orderDetailQuery.isSuccess, orderDetailQuery.isError, orderDetailQuery.data]);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('vi-VN');
	};

	const bgColor = useColorModeValue('white', 'gray.800');
	const borderColor = useColorModeValue('gray.200', 'gray.700');

	if (loading) return <Box textAlign="center" fontSize="xl">Đang tải...</Box>;
	if (error) return <Box textAlign="center" color="red.500" fontSize="xl">{error}</Box>;
	if (!orderDetail) return <Box textAlign="center" fontSize="xl">Không tìm thấy chi tiết đơn hàng</Box>;

	return (
		<Box maxW="1200px" mx="auto" p="6" bgColor={bgColor} borderRadius="lg" boxShadow="xl">
			<VStack spacing="6" align="stretch">
				<Grid templateColumns="repeat(3, 1fr)" gap={6}>
					<GridItem colSpan={1}>
						<Box p="4" borderWidth="1px" borderRadius="md" borderColor={borderColor}>
							<Heading as="h3" size="md" mb="4">Thông tin đơn hàng</Heading>
							<VStack align="stretch" spacing="2">
								<HStack justify="space-between">
									<Text fontWeight="bold">Ngày đặt:</Text>
									<Text>{formatDate(orderDetail.date)}</Text>
								</HStack>
								<HStack justify="space-between">
									<Text fontWeight="bold">Trạng thái:</Text>
									<Badge colorScheme={getStatusColor(orderDetail.status)}>
										{getStatusText(orderDetail.status)}
									</Badge>
								</HStack>
							</VStack>
						</Box>
					</GridItem>

					<GridItem colSpan={2}>
						<Box p="4" borderWidth="1px" borderRadius="md" borderColor={borderColor}>
							<Heading as="h3" size="md" mb="4">Tóm tắt đơn hàng</Heading>
							<StatGroup>
								<Stat>
									<StatLabel>Tổng tiền hàng</StatLabel>
									<StatNumber>{orderDetail.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</StatNumber>
								</Stat>
								<Stat>
									<StatLabel>Giảm giá</StatLabel>
									<StatNumber>{orderDetail.totalDecrease.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</StatNumber>
								</Stat>
								<Stat>
									<StatLabel>Tổng cộng</StatLabel>
									<StatNumber color="teal.500">{orderDetail.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</StatNumber>
								</Stat>
							</StatGroup>
						</Box>
					</GridItem>
				</Grid>

				<Box p="4" borderWidth="1px" borderRadius="md" borderColor={borderColor}>
					<Heading as="h3" size="md" mb="4">Lời nhắn</Heading>
					<Text>{orderDetail.message ? orderDetail.message : "Không có lời nhắn"}</Text>
				</Box>

				<Box borderWidth="1px" borderRadius="md" borderColor={borderColor}>
					<Heading as="h3" size="md" p="4" bg="teal.500" color="white" borderTopRadius="md">
						Danh sách sản phẩm
					</Heading>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>Sản phẩm</Th>
								<Th isNumeric>Giá</Th>
								<Th isNumeric>Số lượng</Th>
								<Th isNumeric>Tổng</Th>
							</Tr>
						</Thead>
						<Tbody>
							{orderDetail.details.map((detail, index) => (
								<Tr key={index}>
									<Td>
										<Flex align="center">
											<Image src={detail.product.images[0]} alt={detail.product.name} boxSize="50px" objectFit="cover" mr="3" />
											<Text fontWeight="medium">{detail.product.name}</Text>
										</Flex>
									</Td>
									<Td isNumeric>{detail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Td>
									<Td isNumeric>{detail.quantity}</Td>
									<Td isNumeric>{(detail.price * detail.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			</VStack>
		</Box>
	);
};

const getStatusText = (status: number): string => {
	switch (status) {
		case 0: return 'Đã hủy';
		case 1: return 'Đang chờ xác nhận';
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

export default OrderDetail;
