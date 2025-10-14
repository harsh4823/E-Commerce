package com.basics.ECommerce.Service;

import com.razorpay.RazorpayException;

public interface RazorPayService {

    Object createOrder(int amount) throws RazorpayException;

    boolean verifyPayment(String orderID, String paymentID, String signature) throws RazorpayException;
}
