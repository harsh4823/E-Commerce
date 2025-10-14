package com.basics.spring_basics.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RazorPayServiceImp implements RazorPayService{

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String secret;

    @Override
    public Object createOrder(int amount) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(keyId,secret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount",amount*100);
        orderRequest.put("currency","INR");
        orderRequest.put("receipt", "receipt#1");
        Order order =  client.orders.create(orderRequest);
        return order.get("id");
    }
}
