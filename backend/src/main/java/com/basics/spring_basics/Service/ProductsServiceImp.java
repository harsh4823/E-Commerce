package com.basics.spring_basics.Service;

import com.basics.spring_basics.Exceptions.APIExceptions;
import com.basics.spring_basics.Exceptions.ResourceNotFoundException;
import com.basics.spring_basics.Model.CategoryModel;
import com.basics.spring_basics.Model.Product;
import com.basics.spring_basics.Payload.ProductResponse;
import com.basics.spring_basics.Payload.ProductsDTO;
import com.basics.spring_basics.Repository.CategoryRepository;
import com.basics.spring_basics.Repository.ProductRepository;
import jakarta.persistence.criteria.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductsServiceImp implements ProductsService{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Value("${image.base.url}")
    private String url;


    @Override
    public ProductsDTO createProduct(ProductsDTO productsDTO, Long id) {
        CategoryModel category = categoryRepository.findById(id).
                orElseThrow(()->new ResourceNotFoundException("Category","CategoryId",id));
        Product products = modelMapper.map(productsDTO, Product.class);
        Product saved = productRepository.findByproductName(products.getProductName());
        if(saved!=null){
            throw new APIExceptions("This Product Already exist");
        }

        products.setCategory(category);
        products.setImage("default.png");
        double price = products.getPrice();
        double discount = products.getDiscount();
        double specialPrice = price - (discount/100)*price;
        products.setSpecialPrice(specialPrice);
        productRepository.save(products);
        return modelMapper.map(products, ProductsDTO.class);
    }

    @Override
    public ProductResponse getAllProducts(String keyword,String category,Integer pageNumber,Integer pageSize,String sortBy,String sortOrder) {
        boolean isFallback = false;
        Pageable pageDetails;

        if(sortBy.equalsIgnoreCase("price")){
            pageDetails = PageRequest.of(pageNumber,pageSize,Sort.unsorted());
        }else{
            Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                    ? Sort.by(sortBy).ascending():
                    Sort.by(sortBy).descending();
            pageDetails = PageRequest.of(pageNumber,pageSize,sortByAndOrder);
        }

        Specification<Product> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null && !keyword.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), "%" + keyword.toLowerCase() + "%"));
            }

            if (category != null && !category.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("category").get("categoryName")),"%"+category.toLowerCase()+"%"));
            }

            // 👇 Conditional sorting logic (only for "price" sorting)
            if (sortBy.equalsIgnoreCase("price")) {
                Expression<Object> sortExpression = criteriaBuilder
                        .selectCase()
                        .when(
                            criteriaBuilder.and(
                                criteriaBuilder.isNotNull(root.get("specialPrice")),
                                criteriaBuilder.greaterThan(root.get("specialPrice"), 0)
                            ),root.get("specialPrice")
                        )
                        .otherwise(root.get("price"));

                assert query != null;
                if (sortOrder.equalsIgnoreCase("asc")) {
                    query.orderBy(criteriaBuilder.asc(sortExpression));
                } else {
                    query.orderBy(criteriaBuilder.desc(sortExpression));
                }
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };


        Page<Product> productsPage = productRepository.findAll(specification,pageDetails);
        List<Product> products = productsPage.getContent();

//        //shows all products if keyword is not correct

        if (keyword!=null && !keyword.isEmpty() && products.isEmpty()){
            productsPage = productRepository.findAll(pageDetails);
            products = productsPage.getContent();
            isFallback = true;
        }

        if(products.isEmpty()){
            throw new APIExceptions("there are no products");
        }
        List<ProductsDTO> productsDTOs = products.stream()
                .map(product ->{
                ProductsDTO productsDTO =  modelMapper.map(product, ProductsDTO.class);
                productsDTO.setImage(constructImageUrl(productsDTO.getImage()));
                return productsDTO;
                })
                .toList();
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productsDTOs);
        productResponse.setPageNumber(productsPage.getNumber());
        productResponse.setPageSize(productsPage.getSize());
        productResponse.setTotalPages(productsPage.getTotalPages());
        productResponse.setTotalItems(productsPage.getTotalElements());
        productResponse.setLastPage(productsPage.isLast());
        productResponse.setFallback(isFallback);
        return productResponse;
    }

    private String constructImageUrl(String imageName){
        return url.endsWith("/") ? url+imageName: url+"/"+imageName;
    }

    @Override
    public ProductResponse getProductsByCategory(Long categoryId,Integer pageNumber,Integer pageSize,String sortBy,String sortOrder) {
        CategoryModel category = categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("category","categoryId",categoryId));

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber,pageSize,sortByAndOrder);
        Page<Product> productsPage = productRepository.findByCategoryOrderByPriceAsc(pageDetails,category);
        List<Product> products = productsPage.getContent();
        if (products.isEmpty()){
            throw new APIExceptions("This category does not contain any products");
        }
        List<ProductsDTO> productsDTOs = products.stream()
                .map(product ->modelMapper.map(product, ProductsDTO.class))
                .toList();
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productsDTOs);
        productResponse.setPageNumber(productsPage.getNumber());
        productResponse.setPageSize(productsPage.getSize());
        productResponse.setTotalPages(productsPage.getTotalPages());
        productResponse.setTotalItems(productsPage.getTotalElements());
        productResponse.setLastPage(productsPage.isLast());
        return productResponse;
    }

    @Override
    public ProductResponse getProductsByKeyword(String keyword,Integer pageNumber,Integer pageSize,String sortBy,String sortOrder) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber,pageSize,sortByAndOrder);
        Page<Product> productsPage = productRepository.findByproductNameLikeIgnoreCase(pageDetails,'%'+keyword+'%');
        List<Product> products = productsPage.getContent();
        if (products.isEmpty()){
            throw new APIExceptions("No Product with the keyword "+keyword);
        }
        List<ProductsDTO> productsDTOs = products.stream()
                .map(product ->modelMapper.map(product, ProductsDTO.class))
                .toList();
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productsDTOs);
        productResponse.setContent(productsDTOs);
        productResponse.setPageNumber(productsPage.getNumber());
        productResponse.setPageSize(productsPage.getSize());
        productResponse.setTotalPages(productsPage.getTotalPages());
        productResponse.setTotalItems(productsPage.getTotalElements());
        productResponse.setLastPage(productsPage.isLast());
        return productResponse;
    }

    @Override
    public ProductsDTO updateProduct(Long productId,ProductsDTO productsDTO) {
        Product product1 = productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("product","productId",productId));
        Product product = modelMapper.map(productsDTO, Product.class);
        product1.setProductName(product.getProductName());
        product1.setDescription(product.getDescription());
        product1.setQuantity(product.getQuantity());
        product1.setPrice(product.getPrice());
        product1.setDiscount(product.getDiscount());
        double price = product.getPrice();
        double discount = product.getDiscount();
        double specialPrice = price - (discount/100)*price;
        product1.setSpecialPrice(specialPrice);
        productRepository.save(product1);
        return modelMapper.map(product1, ProductsDTO.class);
    }

    @Override
    public ProductsDTO deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product","ProductID",productId));
        productRepository.delete(product);
        return modelMapper.map(product, ProductsDTO.class);
    }
}