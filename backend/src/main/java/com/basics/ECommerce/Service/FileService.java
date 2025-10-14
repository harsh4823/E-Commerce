package com.basics.ECommerce.Service;

import com.basics.ECommerce.Payload.ProductsDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    ProductsDTO updateProductImage(Long productID, MultipartFile image) throws IOException;
}
