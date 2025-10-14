package com.basics.ECommerce.Payload;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductsDTO {
    @Schema(description = "Product Id")
    private Long productId;
    @Schema(description = "Product Name")
    private String productName;
    @Schema(description = "Product Image URL" , example = "http://localhost:8080/0c2f54fe-b6a3-472e-8b3e-ddf391d4a402.webp")
    private String image;
    @Schema(description = "Product Description")
    private String description;
    @Schema(description = "Product Quantity")
    private Integer quantity;
    @Schema(description = "Product Price")
    private double price;
    @Schema(description = "Product Discount Percentage")
    private double discount;
    @Schema(description = "Product Special Price after discount")
    private double specialPrice;
}
