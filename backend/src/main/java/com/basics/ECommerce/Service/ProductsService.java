package com.basics.ECommerce.Service;

import com.basics.ECommerce.Payload.ProductResponse;
import com.basics.ECommerce.Payload.ProductsDTO;

public interface ProductsService {

    ProductsDTO createProduct(ProductsDTO products, Long id);

    ProductResponse getAllProducts(String keyword,String category,Integer pageNumber,Integer pageSize,String sortBy,String sortOrder);

    ProductResponse getProductsByCategory(Long categoryId,Integer pageNumber,Integer pageSize,String sortBy,String sortOrder);

    ProductResponse getProductsByKeyword(String keyword,Integer pageNumber,Integer pageSize,String sortBy,String sortOrder);

    ProductsDTO updateProduct(Long productId,ProductsDTO product);

    ProductsDTO deleteProduct(Long productId);

    ProductResponse getAllProductsForAdmin(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
}
