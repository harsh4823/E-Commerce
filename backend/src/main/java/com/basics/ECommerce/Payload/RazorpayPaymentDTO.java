package com.basics.ECommerce.Payload;

import lombok.Data;

@Data
public class RazorpayPaymentDTO {
    private String orderID;
    private String paymentID;
    private String signature;
}
