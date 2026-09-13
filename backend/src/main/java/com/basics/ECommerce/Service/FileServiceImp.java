package com.basics.ECommerce.Service;

import com.basics.ECommerce.Exceptions.ResourceNotFoundException;
import com.basics.ECommerce.Model.Product;
import com.basics.ECommerce.Payload.ProductsDTO;
import com.basics.ECommerce.Repository.ProductRepository;
import com.basics.ECommerce.Security.Util.ImageUploadUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileServiceImp implements FileService{

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageUploadUtil uploadUtil;


    @Override
    public ProductsDTO updateProductImage(Long productID, MultipartFile image) throws IOException {
        Product product = productRepository.findById(productID)
                .orElseThrow(()->new ResourceNotFoundException("Product","ProductID",productID));
        String fileName = uploadUtil.uploadImage(image);
        product.setImage(fileName);
        return modelMapper.map(productRepository.save(product), ProductsDTO.class);
    }


}