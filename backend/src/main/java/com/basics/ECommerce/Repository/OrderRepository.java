package com.basics.ECommerce.Repository;

import com.basics.ECommerce.Model.Orders;
import com.basics.ECommerce.Model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Orders,Long> {
    @Query("SELECT COALESCE(SUM(o.totalAmount),0) FROM Orders o")
    long getTotalRevenue();

    @Query("SELECT DISTINCT o FROM Orders o JOIN o.orderItems oi JOIN oi.product p WHERE p.user = :user")
    Page<Orders> findOrdersBySeller(User user, Pageable pageDetails);
}
