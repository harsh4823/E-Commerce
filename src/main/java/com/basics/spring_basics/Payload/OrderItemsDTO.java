package com.basics.spring_basics.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemsDTO {
    private Long orderItemId;
    private ProductsDTO product;
    private Integer quantity;
    private double discount;
    private double orderedProductPrice;
}
