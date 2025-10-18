package com.basics.ECommerce.Service;

import com.basics.ECommerce.Payload.AnalyticsResponse;
import com.basics.ECommerce.Repository.OrderRepository;
import com.basics.ECommerce.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImp implements AnalyticsService{
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    @Override
    public AnalyticsResponse getAnalyticsData() {
        long productCount = productRepository.count();
        long totalOrders = orderRepository.count();
        long totalRevenue = orderRepository.getTotalRevenue();
        return new AnalyticsResponse(productCount,totalRevenue,totalOrders);
    }
}
