package com.basics.spring_basics.Controller;

import com.basics.spring_basics.Payload.OrderDTO;
import com.basics.spring_basics.Payload.OrderRequestDTO;
import com.basics.spring_basics.Payload.StripePaymentDTO;
import com.basics.spring_basics.Service.OrderService;
import com.basics.spring_basics.Security.Util.AuthUtil;
import com.basics.spring_basics.Service.RazorPayService;
import com.basics.spring_basics.Service.StripeService;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private StripeService stripeService;

    @Autowired
    private RazorPayService razorPayService;

    @Autowired
    private AuthUtil authUtil;

    @PostMapping("/order/users/payment/{paymentMethod}")
    public ResponseEntity<OrderDTO> orderProducts(@PathVariable String paymentMethod,
                                                  @RequestBody OrderRequestDTO orderRequestDTO){
        String email = authUtil.loggedInEmail();
        OrderDTO orderDTO = orderService.placeOrder(email, orderRequestDTO, paymentMethod);
        return new ResponseEntity<>(orderDTO, HttpStatus.CREATED);
    }

    @PostMapping("/order/stripe-client-secret")
    public ResponseEntity<String> createStripeClientSecret(@RequestBody StripePaymentDTO stripePaymentDTO) throws StripeException {
        System.out.println("StripePayment DTO : " + stripePaymentDTO);
        PaymentIntent paymentIntent = stripeService.paymentIntent(stripePaymentDTO);
        return new ResponseEntity<>(paymentIntent.getClientSecret(),HttpStatus.CREATED);
    }

    @PostMapping("/order/razorpay-order")
    public ResponseEntity<?> createRazorpayOrder(@RequestParam("amount") int amount) throws RazorpayException {
        return new ResponseEntity<>(razorPayService.createOrder(amount),HttpStatus.CREATED);
    }
}
