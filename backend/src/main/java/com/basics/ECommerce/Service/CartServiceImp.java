package com.basics.ECommerce.Service;

import com.basics.ECommerce.Exceptions.APIExceptions;
import com.basics.ECommerce.Exceptions.ResourceNotFoundException;
import com.basics.ECommerce.Model.Cart;
import com.basics.ECommerce.Model.CartItems;
import com.basics.ECommerce.Model.Product;
import com.basics.ECommerce.Payload.CartDTO;
import com.basics.ECommerce.Payload.CartItemDTO;
import com.basics.ECommerce.Payload.ProductsDTO;
import com.basics.ECommerce.Repository.CartItemsRepository;
import com.basics.ECommerce.Repository.CartRepository;
import com.basics.ECommerce.Repository.ProductRepository;
import com.basics.ECommerce.Security.Util.AuthUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CartServiceImp implements CartService{

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) {

        Cart cart = createCart();
        Product product = productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("product", "id", productId));

        CartItems cartItems = cartItemsRepository.findCartItemsByCartIdAndProductId(cart.getCartId(), product);

        if (cartItems!=null){
            throw new APIExceptions("Product"+product.getProductName()+" already exists in the cart");
        }

        if (product.getQuantity()==0){
            throw new APIExceptions(product.getProductName()+" is out of stock");
        }

        if (product.getQuantity()<quantity){
            throw new APIExceptions("Only "+product.getQuantity()+" items of "+product.getProductName()+" are available");
        }

        cartItems = new CartItems();
        cartItems.setCart(cart);
        cartItems.setProduct(product);
        cartItems.setQuantity(quantity);
        cartItems.setProductPrice(product.getSpecialPrice());
        cartItems.setDiscount(product.getDiscount());

        cart.getCartItems().add(cartItems);

        product.setQuantity(product.getQuantity()-quantity);

        cart.setTotalPrice(cart.getTotalPrice()+(product.getSpecialPrice()*quantity));

        cartItemsRepository.save(cartItems);
        cartRepository.save(cart);

        CartDTO cartDTO = modelMapper.map(cart,CartDTO.class);

        List<CartItems> cartItems2 = cart.getCartItems();

        Stream<ProductsDTO> productsDTOStream = cartItems2.stream().map(item->{
            ProductsDTO map = modelMapper.map(item.getProduct(),ProductsDTO.class);
            map.setQuantity(item.getQuantity());
            return map;
        });

        cartDTO.setProducts(productsDTOStream.toList());
        return cartDTO;

    }

    @Override
    public List<CartDTO> getAllCarts() {
        List<Cart> carts = cartRepository.findAll();

        if (carts.isEmpty()){
            throw new APIExceptions("No carts found");
        }

        List<CartDTO> cartDTOS = carts.stream().map(cart->{
            cart.getCartItems().forEach(c->c.getProduct().setQuantity(c.getQuantity()));
            CartDTO cartDTO =modelMapper.map(cart,CartDTO.class);
            List<ProductsDTO> productsDTOS = cart.getCartItems().stream()
                    .map(p->modelMapper.map(p.getProduct(), ProductsDTO.class)).collect(
                            Collectors.toList());
                            cartDTO.setProducts(productsDTOS);
                    return cartDTO;
        }).toList();
        return cartDTOS;
    }

    @Override
    public CartDTO getUserCarts(String email, Long cartId) {
        Cart cart = cartRepository.findCartByEmailAndCartId(email, cartId);
        if (cart==null){
            throw new ResourceNotFoundException("cart", "cartId", cartId);
        }
        cart.getCartItems().forEach(c->c.getProduct().setQuantity(c.getQuantity()));
        List<ProductsDTO> productsDTOS = cart.getCartItems().stream()
                .map(p->modelMapper.map(p.getProduct(), ProductsDTO.class)).toList();
        CartDTO cartDTO = modelMapper.map(cart,CartDTO.class);
        cartDTO.setProducts(productsDTOS);
        return cartDTO;
    }

    @Transactional
    @Override
    public CartDTO updateProductInCart(Long productId, int quantity) {
        String email = authUtil.loggedInEmail();
        Cart userCart = cartRepository.findByEmail(email);
        Long cartId = userCart.getCartId();

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("cart", "cartId", cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("product", "id", productId));

        if (product.getQuantity() == 0 && quantity > 0) {
            throw new APIExceptions(product.getProductName() + " is out of stock");
        }

        if (product.getQuantity() < quantity && quantity > 0) {
            throw new APIExceptions("Only " + product.getQuantity() + " items of " + product.getProductName() + " are available");
        }

        CartItems cartItems = cartItemsRepository.findCartItemsByCartIdAndProductId(cartId, product);
        if (cartItems == null) {
            throw new ResourceNotFoundException("cartItems", "productId", productId);
        }

        int newQuantity = cartItems.getQuantity() + quantity;

        if (newQuantity < 0) {
            throw new APIExceptions("You cannot remove more items than you have in the cart");
        }

        if (newQuantity == 0) {
            cart.setTotalPrice(cart.getTotalPrice() - (cartItems.getProductPrice() * cartItems.getQuantity()));
            cartItems.setQuantity(0);
            cartItems.setCart(null);
            userCart.getCartItems().remove(cartItems); // remove from cart
//            cartItemsRepository.delete(cartItems); // orphanRemoval will also help here
        } else {
            cartItems.setQuantity(newQuantity);
            cart.setTotalPrice(cart.getTotalPrice() + (cartItems.getProductPrice() * quantity));
            cartItemsRepository.save(cartItems);
        }

        product.setQuantity(Math.max(product.getQuantity() - quantity,0));
        productRepository.save(product);

        cartRepository.save(cart); // save cart after updates

        // DTO mapping
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        List<ProductsDTO> products = cart.getCartItems().stream().map(item -> {
            ProductsDTO dto = modelMapper.map(item.getProduct(), ProductsDTO.class);
            dto.setQuantity(item.getQuantity());
            return dto;
        }).toList();

        cartDTO.setProducts(products);
        return cartDTO;
    }


    @Override
    @Transactional
    public CartDTO deleteProductFromCart(Long cartId, Long productId) {
        String email = authUtil.loggedInEmail();
        Cart userCart = cartRepository.findCartByEmailAndCartId(email, cartId);

        if (userCart == null) {
            throw new ResourceNotFoundException("cart", "cartId", cartId);
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("product", "id", productId));

        CartItems cartItems = cartItemsRepository.findCartItemsByCartIdAndProductId(cartId, product);

        if (cartItems == null) {
            throw new ResourceNotFoundException("cartItems", "productId", productId);
        }

        // Adjust product stock
        product.setQuantity(product.getQuantity() + cartItems.getQuantity());
        productRepository.save(product);

        // Adjust total price
        userCart.setTotalPrice(userCart.getTotalPrice() - (cartItems.getProductPrice() * cartItems.getQuantity()));

        // 👉 Trigger orphanRemoval
        cartItems.setQuantity(0);
        userCart.getCartItems().remove(cartItems);// remove from parent list first
        cartItems.setCart(null); // disassociate parent before saving

        cartRepository.save(userCart); // now Hibernate knows to delete the orphan
        // No need to call cartItemsRepository.delete()

        // Create DTO
        CartDTO cartDTO = modelMapper.map(userCart, CartDTO.class);

        List<ProductsDTO> products = userCart.getCartItems().stream().map(item -> {
            ProductsDTO dto = modelMapper.map(item.getProduct(), ProductsDTO.class);
            dto.setQuantity(item.getQuantity());
            return dto;
        }).toList();

        cartDTO.setProducts(products);
        return cartDTO;
    }


    @Override
    public void updateProductInCart(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(()->new ResourceNotFoundException("cart", "cartId", cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("product", "id", productId));

        CartItems cartItems = cartItemsRepository.findCartItemsByCartIdAndProductId(cartId,product);

        if (cartItems==null){
            throw new ResourceNotFoundException("cartItems", "productId", productId);
        }

        double cartPrice = cart.getTotalPrice()-(cartItems.getProductPrice()*cartItems.getQuantity());

        cartItems.setProductPrice(product.getSpecialPrice());

        cart.setTotalPrice(cartPrice+(product.getSpecialPrice()*cartItems.getQuantity()));

        cartItems = cartItemsRepository.save(cartItems);
    }

    @Override
    @Transactional
    public String createOrUpdateCartItems(List<CartItemDTO> cartItemDTOS) {
        Cart existingCart = createCart();
        cartItemsRepository.deleteAllByCartId(existingCart.getCartId());
        double totalPrice = 0.00;

        for (CartItemDTO cartItemDTO : cartItemDTOS) {
            Long productId = cartItemDTO.getProductId();
            Integer quantity = cartItemDTO.getQuantity();

            Product product = productRepository.findById(productId)
                    .orElseThrow(()-> new ResourceNotFoundException("product", "productId", productId));
            product.setQuantity(Math.max(product.getQuantity()-quantity,0));
            totalPrice+=product.getSpecialPrice()*quantity;

            CartItems cartItems = new CartItems();
            cartItems.setProduct(product);
            cartItems.setCart(existingCart);
            cartItems.setQuantity(quantity);
            cartItems.setProductPrice(product.getSpecialPrice());
            cartItems.setDiscount(product.getDiscount());
            cartItemsRepository.save(cartItems);
        }
        existingCart.setTotalPrice(totalPrice);
        cartRepository.save(existingCart);
        return "Cart created/updated successfully";
    }

    private Cart createCart() {
        Cart userCart = cartRepository.findByEmail(authUtil.loggedInEmail());
        if (userCart!=null){
            return userCart;
        }
        Cart cart = new Cart();
        cart.setTotalPrice(0.0);
        cart.setUser(authUtil.loggedInUser());
        return cartRepository.save(cart);
    }
}
