package com.basics.spring_basics.Service;

import com.basics.spring_basics.Exceptions.APIExceptions;
import com.basics.spring_basics.Exceptions.ResourceNotFoundException;
import com.basics.spring_basics.Model.*;
import com.basics.spring_basics.Payload.OrderDTO;
import com.basics.spring_basics.Payload.OrderItemsDTO;
import com.basics.spring_basics.Payload.OrderRequestDTO;
import com.basics.spring_basics.Repository.*;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional
    public OrderDTO placeOrder(String email, OrderRequestDTO orderRequestDTO, String paymentMethod) {
        Cart cart = cartRepository.findByEmail(email);
        if (cart==null){
            throw new ResourceNotFoundException("Cart","email",email);
        }
        Address address = addressRepository.findById(orderRequestDTO.getAddressId())
                .orElseThrow(()->new ResourceNotFoundException("Address","id",orderRequestDTO.getAddressId()));

        Orders order = new Orders();
        order.setEmail(email);
        order.setOrderDate(LocalDate.now());
        order.setAddress(address);
        order.setTotalAmount(cart.getTotalPrice());
        order.setOrderStatus("Order Placed");

        Payment payment = new Payment(
                orderRequestDTO.getPaymentMethod(),orderRequestDTO.getPgPaymentId(),
                orderRequestDTO.getPgStatus(),orderRequestDTO.getPgResponseMessage(),
                orderRequestDTO.getPgName()
        );
        payment.setOrder(order);

        payment = paymentRepository.save(payment);

        order.setPayment(payment);

        Orders savedOrder = orderRepository.save(order);

        List<CartItems> cartItems = cart.getCartItems();
        if (cartItems.isEmpty()){
            throw new APIExceptions("Cart is empty");
        }

        List<OrderItems> orderItems = new ArrayList<>();

        for (CartItems cartItem : cartItems){
            OrderItems orderItem = new OrderItems();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setDiscount(cartItem.getDiscount());
            orderItem.setOrderedProductPrice(cartItem.getProductPrice());
            orderItem.setOrder(savedOrder);
            orderItems.add(orderItem);
        }

        orderItems = orderItemsRepository.saveAll(orderItems);

        Iterator<CartItems> iterator = cart.getCartItems().iterator();
        while (iterator.hasNext()){
            CartItems item = iterator.next();
            int quantity = item.getQuantity();
            Product product = item.getProduct();

            product.setQuantity(product.getQuantity()-quantity);
            productRepository.save(product);

            iterator.remove();
            cartService.deleteProductFromCart(cart.getCartId(),product.getProductId());
        }


        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
        orderItems.forEach(item->orderDTO.getOrderItems().add(modelMapper.map(item, OrderItemsDTO.class)));
        orderDTO.setAddressId(orderRequestDTO.getAddressId());
        return orderDTO;
    }
}
