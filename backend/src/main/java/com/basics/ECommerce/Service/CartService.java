package com.basics.ECommerce.Service;

import com.basics.ECommerce.Payload.CartDTO;
import com.basics.ECommerce.Payload.CartItemDTO;
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
