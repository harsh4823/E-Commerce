package com.basics.ECommerce.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "product_Id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "order_Id")
    private Orders order;

    private Integer quantity;
    private double discount;
    private double orderedProductPrice;
}
