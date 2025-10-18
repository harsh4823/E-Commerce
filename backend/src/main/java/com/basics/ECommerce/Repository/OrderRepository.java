package com.basics.ECommerce.Repository;

import com.basics.ECommerce.Model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Orders,Long> {
    @Query("SELECT COALESCE(SUM(o.totalAmount),0) FROM Orders o")
    long getTotalRevenue();
}
