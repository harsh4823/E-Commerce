package com.basics.spring_basics.Payload;

import com.basics.spring_basics.Model.Address;
import lombok.Data;

import java.util.Map;

@Data
public class StripePaymentDTO {
    private Long amount;
    private String currency;
    private String email;
    private String name;
    private Address address;
    private String description;
    private Map<String,String> metadata;
}
