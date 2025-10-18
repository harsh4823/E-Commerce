package com.basics.ECommerce.Service;

import com.basics.ECommerce.Payload.OrderRequestDTO;
import com.basics.ECommerce.Payload.RazorpayPaymentDTO;
import com.basics.ECommerce.Security.Util.AuthUtil;
import com.razorpay.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RazorPayServiceImp implements RazorPayService{

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String secret;

    private final AuthUtil authUtil;
    private final OrderService orderService;

    private RazorpayClient razorpayClient;

    @PostConstruct
    public void init() throws RazorpayException {
        this.razorpayClient = new RazorpayClient(keyId,secret);
    }

    @Override
    public Object createOrder(int amount) throws RazorpayException {
        String receiptId = "rcpt_" + UUID.randomUUID();
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount",amount*100);
        orderRequest.put("currency","INR");
        orderRequest.put("receipt", receiptId);
        Order order =  this.razorpayClient.orders.create(orderRequest);
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

    @Override
    public void placeOrder(RazorpayPaymentDTO razorpayPaymentDTO) throws RazorpayException {
        String orderID = razorpayPaymentDTO.getOrderID();
        String paymentID = razorpayPaymentDTO.getPaymentID();
        String signature = razorpayPaymentDTO.getSignature();
        Long addressId =  razorpayPaymentDTO.getAddressId();

        String status = "Paid";

        OrderRequestDTO orderRequestDTO = new OrderRequestDTO(addressId,"online",
                "razorpay",paymentID,status,"Payment Successful");
        String email = authUtil.loggedInEmail();

        orderService.placeOrder(email,orderRequestDTO,"online");

    }
}
