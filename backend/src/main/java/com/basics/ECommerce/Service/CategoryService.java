package com.basics.ECommerce.Service;

import com.basics.ECommerce.Payload.CategoryDTO;
import com.basics.ECommerce.Payload.CategoryResponse;


public interface CategoryService {
    CategoryResponse getAllCategories(Integer pageNumber,Integer pageSize,String sort_By,String sort_Order);
    CategoryDTO createCategory(CategoryDTO categoryDTO);
    CategoryDTO deleteCategory(Long id);
    CategoryDTO updateCategory(CategoryDTO categoryDTO, Long id);
}
