package com.basics.ECommerce.Service;

import com.basics.ECommerce.Payload.OrderDTO;
import com.basics.ECommerce.Payload.OrderRequestDTO;
import jakarta.transaction.Transactional;

public interface OrderService {
    @Transactional
    OrderDTO placeOrder(String email, OrderRequestDTO orderRequestDTO, String paymentMethod);
}
