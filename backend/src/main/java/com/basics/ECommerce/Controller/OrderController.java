package com.basics.ECommerce.Controller;

import com.basics.ECommerce.Config.ProductConst;
import com.basics.ECommerce.Payload.*;
import com.basics.ECommerce.Service.OrderService;
import com.basics.ECommerce.Security.Util.AuthUtil;
import com.basics.ECommerce.Service.RazorPayService;
import com.basics.ECommerce.Service.StripeService;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PostMapping("/verify/payment")
    public ResponseEntity<?> verifyPayment(@RequestBody RazorpayPaymentDTO razorpayPaymentDTO) throws RazorpayException {
        boolean isSignatureValid = razorPayService.verifyPayment(
                razorpayPaymentDTO.getOrderID(),
                razorpayPaymentDTO.getPaymentID(),
                razorpayPaymentDTO.getSignature()
        );
        if (isSignatureValid){
            razorPayService.placeOrder(razorpayPaymentDTO);
            return new ResponseEntity<>("Payment verified successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Payment verification failed",HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/admin/orders")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderResponse> getAllOrders(
            @RequestParam(name = "pageNumber",defaultValue = ProductConst.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = ProductConst.PAGE_SIZE,required = false) Integer pageSize,
            @RequestParam(name = "sortBy",defaultValue = ProductConst.SORT_ORDER_BY,required = false) String sortBy,
            @RequestParam(name = "sortOrder",defaultValue = ProductConst.SORT_ORDER,required = false) String sortOrder
    ){
        OrderResponse orderResponse = orderService.getAllOrders(pageNumber,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(orderResponse, HttpStatus.OK);
    }

    @PutMapping("/admin/orders/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long orderId,
                                                      @RequestBody OrderStatusDTO orderStatusDTO){
        OrderDTO orderDTO = orderService.updateOrderStatus(orderId,orderStatusDTO.getStatus());
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }
}
