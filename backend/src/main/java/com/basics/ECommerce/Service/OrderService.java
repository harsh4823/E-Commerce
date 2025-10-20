package com.basics.ECommerce.Service;

import com.basics.ECommerce.Payload.OrderDTO;
import com.basics.ECommerce.Payload.OrderRequestDTO;
import com.basics.ECommerce.Payload.OrderResponse;
import jakarta.transaction.Transactional;

public interface OrderService {
    @Transactional
    OrderDTO placeOrder(String email, OrderRequestDTO orderRequestDTO, String paymentMethod);

    OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    OrderDTO updateOrderStatus(Long orderId, String status);
}
