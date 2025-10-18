package com.basics.ECommerce.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private List<OrderDTO> orders;
    private Integer pageNumber;
    private Integer pageSize;
    private long totalItems;
    private Integer totalPages;
    private boolean lastPage;
}
