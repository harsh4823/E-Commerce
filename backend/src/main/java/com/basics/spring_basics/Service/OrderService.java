package com.basics.spring_basics.Service;

import com.basics.spring_basics.Payload.OrderDTO;
import com.basics.spring_basics.Payload.OrderRequestDTO;
import jakarta.transaction.Transactional;

public interface OrderService {
    @Transactional
    OrderDTO placeOrder(String email, OrderRequestDTO orderRequestDTO, String paymentMethod);
}
