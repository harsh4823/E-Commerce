package com.basics.spring_basics.Repository;

import com.basics.spring_basics.Model.Cart;
import com.basics.spring_basics.Model.CartItems;
import com.basics.spring_basics.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems,Long> {
    @Query("SELECT ci FROM CartItems ci WHERE ci.cart.id = ?1 AND ci.product = ?2")
    CartItems findCartItemsByCartIdAndProductId(Long cartId, Product product);

    @Query("DELETE FROM CartItems ci WHERE ci.cart.id = ?1")
    List<CartItems> deleteAllByCartId(Long cartId);
}
