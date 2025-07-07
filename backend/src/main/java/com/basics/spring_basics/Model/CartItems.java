package com.basics.spring_basics.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cart_items")
public class CartItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemsId;

    @ManyToOne
    @JoinColumn(name = "cart_Id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_Id")
    private Product product;

    private Integer quantity;
    private double discount;
    private double productPrice;
}
