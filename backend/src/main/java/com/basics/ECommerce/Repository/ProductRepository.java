package com.basics.ECommerce.Repository;

import com.basics.ECommerce.Model.CategoryModel;
import com.basics.ECommerce.Model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> , JpaSpecificationExecutor<Product> {

    Product findByproductName(String productName);

    Page<Product> findByproductNameLikeIgnoreCase(Pageable pageDetails, String keyword);

    Page<Product> findByCategoryOrderByPriceAsc(Pageable pageDetails, CategoryModel categoryId);

    Page<Product> findAll(Specification<Product> specification, Pageable pageDetails);

    List<Product> findByCategory(CategoryModel category);
}