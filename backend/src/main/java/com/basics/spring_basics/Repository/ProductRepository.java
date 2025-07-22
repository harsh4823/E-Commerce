package com.basics.spring_basics.Repository;

import com.basics.spring_basics.Model.CategoryModel;
import com.basics.spring_basics.Model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> , JpaSpecificationExecutor<Product> {

    Product findByproductName(String productName);

    Page<Product> findByproductNameLikeIgnoreCase(Pageable pageDetails, String keyword);

    Page<Product> findByCategoryOrderByPriceAsc(Pageable pageDetails, CategoryModel categoryId);

    Page<Product> findAll(Specification<Product> specification, Pageable pageDetails);
}