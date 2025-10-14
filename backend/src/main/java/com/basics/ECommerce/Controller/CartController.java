package com.basics.spring_basics.Controller;

import com.basics.spring_basics.Payload.CartDTO;
import com.basics.spring_basics.Payload.CartItemDTO;
import com.basics.spring_basics.Repository.CartRepository;
import com.basics.spring_basics.Service.CartService;
import com.basics.spring_basics.Security.Util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartService service;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/carts/create")
    public ResponseEntity<String> createOrUpdateCart(@RequestBody List<CartItemDTO> cartItemDTOS){
        String response = service.createOrUpdateCartItems(cartItemDTOS);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @PostMapping("/carts/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long productId,@PathVariable Integer quantity){
            return new ResponseEntity<>(service.addProductToCart(productId,quantity), HttpStatus.OK);
    }

    @GetMapping("/carts")
    public ResponseEntity<List<CartDTO>> getAllCarts(){
        return new ResponseEntity<>(service.getAllCarts(),HttpStatus.FOUND);
    }

    @GetMapping("/carts/user/cart")
    public ResponseEntity<CartDTO> getCartById(){
        String email = authUtil.loggedInEmail();
        Long cartId = cartRepository.findByEmail(email).getCartId();
        return new ResponseEntity<>(service.getUserCarts(email,cartId),HttpStatus.OK);
    }

    @PutMapping("/cart/products/{productId}/quantity/{operation}")
    public ResponseEntity<CartDTO> updateCartProduct(@PathVariable Long productId,@PathVariable String operation){
        return new ResponseEntity<>(service.updateProductInCart(productId,
                operation.equalsIgnoreCase("delete")?-1:1),HttpStatus.OK);
    }

    @DeleteMapping("/cart/{cartId}/products/{productId}")
    public ResponseEntity<CartDTO> deleteProductFromCart(@PathVariable Long cartId,@PathVariable Long productId){
        return new ResponseEntity<>(service.deleteProductFromCart(cartId,productId),HttpStatus.OK);
    }
}
