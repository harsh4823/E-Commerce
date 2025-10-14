package com.basics.ECommerce.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
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

    @Override
    public boolean verifyPayment(String orderID, String paymentID, String signature) throws RazorpayException {
        JSONObject attributes = new JSONObject();
        attributes.put("razorpay_order_id", orderID);
        attributes.put("razorpay_payment_id", paymentID);
        attributes.put("razorpay_signature", signature);

        return Utils.verifyPaymentSignature(attributes,secret);
    }
}
