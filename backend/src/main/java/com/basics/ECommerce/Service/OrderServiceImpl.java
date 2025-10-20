package com.basics.ECommerce.Service;

import com.basics.ECommerce.Exceptions.APIExceptions;
import com.basics.ECommerce.Exceptions.ResourceNotFoundException;
import com.basics.ECommerce.Model.*;
import com.basics.ECommerce.Payload.OrderDTO;
import com.basics.ECommerce.Payload.OrderItemsDTO;
import com.basics.ECommerce.Payload.OrderRequestDTO;
import com.basics.ECommerce.Payload.OrderResponse;
import com.basics.ECommerce.Repository.*;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
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
        order.setOrderStatus("Accepted");

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

        List<CartItems> cartItemsSnapshot = new ArrayList<>(cart.getCartItems());
        for (CartItems item : cartItemsSnapshot) {
            int quantity = item.getQuantity();
            Product product = item.getProduct();

            product.setQuantity(product.getQuantity() - quantity);
            productRepository.save(product);

            // Remove the product from the cart after updating stock
            cartService.deleteProductFromCart(cart.getCartId(), product.getProductId());
        }
        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
        orderItems.forEach(item->orderDTO.getOrderItems().add(modelMapper.map(item, OrderItemsDTO.class)));
        orderDTO.setAddressId(orderRequestDTO.getAddressId());
        return orderDTO;
    }

    @Override
    public OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber,pageSize,sortByAndOrder);
        Page<Orders> orders = orderRepository.findAll(pageDetails);
        List<Orders> ordersList = orders.getContent();
        List<OrderDTO> orderDTOS = ordersList.stream()
                .map(order->modelMapper.map(order, OrderDTO.class))
                .toList();

        return new OrderResponse(orderDTOS,
                orders.getNumber(),
                orders.getSize(),
                orders.getTotalElements(),
                orders.getTotalPages(),
                orders.isLast());
    }

    @Override
    public OrderDTO updateOrderStatus(Long orderId, String status) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(()->new ResourceNotFoundException("Order","id",orderId));
        order.setOrderStatus(status);
        order = orderRepository.save(order);
        return modelMapper.map(order, OrderDTO.class);
    }
}
