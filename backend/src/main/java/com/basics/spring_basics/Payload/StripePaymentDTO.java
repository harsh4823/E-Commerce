package com.basics.spring_basics.Payload;

import lombok.Data;

@Data
public class StripePaymentDTO {
    private Long amount;
    private String currency;
}
