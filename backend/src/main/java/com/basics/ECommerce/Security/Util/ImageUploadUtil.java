package com.basics.ECommerce.Security.Util;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ImageUploadUtil {

    private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile image) throws IOException {
        Map<?,?> uploadResult = cloudinary.uploader()
                .upload(image.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("secure_url").toString();
    }
}
