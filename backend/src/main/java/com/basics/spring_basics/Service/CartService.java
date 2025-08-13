package com.basics.spring_basics.Service;

import com.basics.spring_basics.Model.Cart;
import com.basics.spring_basics.Payload.CartDTO;
import com.basics.spring_basics.Payload.CartItemDTO;
import jakarta.transaction.Transactional;

import java.util.List;

public interface CartService {

    CartDTO addProductToCart(Long productId, Integer quantity);

    List<CartDTO> getAllCarts();

    CartDTO getUserCarts(String email, Long cartId);

    @Transactional
    CartDTO updateProductInCart(Long productId, int delete);

    CartDTO deleteProductFromCart(Long cartId, Long productId);

    void updateProductInCart(Long cartId, Long productId);

    String createOrUpdateCartItems(List<CartItemDTO> cartItemDTOS);
}
