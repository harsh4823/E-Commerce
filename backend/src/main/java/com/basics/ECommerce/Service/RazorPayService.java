package com.basics.spring_basics.Service;

import com.razorpay.RazorpayException;
import org.springframework.stereotype.Service;

public interface RazorPayService {

    Object createOrder(int amount) throws RazorpayException;
}
