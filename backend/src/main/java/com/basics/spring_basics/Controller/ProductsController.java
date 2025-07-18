package com.basics.spring_basics.Controller;

import com.basics.spring_basics.Config.ProductConst;
import com.basics.spring_basics.Payload.ProductResponse;
import com.basics.spring_basics.Payload.ProductsDTO;
import com.basics.spring_basics.Service.FileService;
import com.basics.spring_basics.Service.ProductsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ProductsController {

    @Autowired
    private ProductsService service;

    @Autowired
    private FileService fileService;

    @Tag(name = "Products API's",description = "API for managing Products")
    @Operation(summary = "Add product to category",description = "Add product to category")
    @PostMapping("/admin/categories/{category_id}/product")
    public ResponseEntity<ProductsDTO> addProducts(
            @Parameter(description = "Category ID to add product to")
            @RequestBody ProductsDTO products
            , @PathVariable Long category_id){
        return new ResponseEntity<>(service.createProduct(products,category_id),HttpStatus.CREATED);
    }

    @Tag(name = "Products API's",description = "API for managing Products")
    @Operation(summary = "Get all products",description = "Get all products")
    @GetMapping("/public/products")
    public ResponseEntity<ProductResponse> getAllProducts(
            @RequestParam(name = "pageNumber",defaultValue = ProductConst.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = ProductConst.PAGE_SIZE,required = false) Integer pageSize,
            @RequestParam(name = "sortBy",defaultValue = ProductConst.SORT_CATEGORIES_BY,required = false) String sortBy,
            @RequestParam(name = "sortOrder",defaultValue = ProductConst.SORT_ORDER,required = false) String sortOrder
    ){
        return new ResponseEntity<>(service.getAllProducts(pageNumber,pageSize,sortBy,sortOrder),HttpStatus.OK);
    }

    @Tag(name = "Products API's")
    @Operation(summary = "Get products by category",description = "Get products by category")
    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse> getProductsByCategory(
            @Parameter(description = "Category ID to search for")
            @PathVariable Long categoryId,
            @RequestParam(name = "pageNumber",defaultValue = ProductConst.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = ProductConst.PAGE_SIZE,required = false) Integer pageSize,
            @RequestParam(name = "sortBy",defaultValue = ProductConst.SORT_CATEGORIES_BY,required = false) String sortBy,
            @RequestParam(name = "sortOrder",defaultValue = ProductConst.SORT_ORDER,required = false) String sortOrder
            ){
        return new ResponseEntity<>
                (service.getProductsByCategory(categoryId,pageNumber,pageSize,sortBy,sortOrder),HttpStatus.OK);
    }

    @Tag(name = "Products API's")
    @Operation(summary = "Get products by keyword",description = "Get products by keyword")
    @ApiResponses({
            @ApiResponse(responseCode = "200",description = "Fetched products successfully"),
            @ApiResponse(responseCode = "400",description = "Bad Request",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server Error",content = @Content),
    })
    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponse> getProductsByKeyword(
            @Parameter(description = "Keyword to search for")
            @PathVariable String keyword,
            @RequestParam(name = "pageNumber",defaultValue = ProductConst.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = ProductConst.PAGE_SIZE,required = false) Integer pageSize,
            @RequestParam(name = "sortBy",defaultValue = ProductConst.SORT_CATEGORIES_BY,required = false) String sortBy,
            @RequestParam(name = "sortOrder",defaultValue = ProductConst.SORT_ORDER,required = false) String sortOrder
    ){
        return new ResponseEntity<>
                (service.getProductsByKeyword(keyword,pageNumber,pageSize,sortBy,sortOrder),HttpStatus.OK);
    }

    @Tag(name = "Products API's")
    @Operation(summary = "Update product by ID",description = "Update product by ID")
    @PutMapping("/products/{productId}")
    public ResponseEntity<ProductsDTO> updateProduct(
            @Parameter(description = "Product ID to update")
            @PathVariable Long productId,@RequestBody ProductsDTO product){
        return new ResponseEntity<>(service.updateProduct(productId,product),HttpStatus.OK);
    }

    @Tag(name = "Products API's")
    @Operation(summary = "Delete product by ID",description = "Delete product by ID")
    @DeleteMapping("admin/products/{productId}")
    public ResponseEntity<ProductsDTO> deleteProduct(
            @Parameter(description = "Product ID to delete")
            @PathVariable Long productId){
        return new ResponseEntity<>(service.deleteProduct(productId),HttpStatus.OK);
    }

    @Tag(name = "Products API's")
    @Operation(summary = "Update product image",description = "Update product image")
    @PutMapping("/products/{productID}/image")
    public ResponseEntity<ProductsDTO> updateProductImage(
            @Parameter(description = "Product ID to update image")
            @PathVariable Long productID, @RequestParam("image")MultipartFile image
            ) throws IOException {
        return new ResponseEntity<>(fileService.updateProductImage(productID,image),HttpStatus.OK);
    }

}
