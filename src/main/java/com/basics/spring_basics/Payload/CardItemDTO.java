package com.basics.spring_basics.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardItemDTO {
    private Long productId;
    private CartDTO cart;
    private ProductsDTO productsDTO;
    private int quantity;
    private double discount;
    private double productPrice;

}
