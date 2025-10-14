package com.basics.ECommerce.Controller;

import com.basics.ECommerce.Model.User;
import com.basics.ECommerce.Payload.AddressDTO;
import com.basics.ECommerce.Service.AddressService;
import com.basics.ECommerce.Security.Util.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddressController {

    @Autowired
    private AddressService service;

    @Autowired
    private AuthUtil authUtil;

    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> createAddress(@Valid @RequestBody AddressDTO addressDTO){
        User user = authUtil.loggedInUser();
        return new ResponseEntity<>(service.createAddress(addressDTO,user),HttpStatus.CREATED);
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<AddressDTO>> getAllAddresses(){
        return new ResponseEntity<>(service.getAllAddresses(),HttpStatus.OK);
    }

    @GetMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> getAddress(@PathVariable Long addressId){
        return new ResponseEntity<>(service.getAddresses(addressId),HttpStatus.OK);
    }

    @GetMapping("/user/addresses")
    public ResponseEntity<List<AddressDTO>> getUserAddresses(){
        Long userId = authUtil.loggedInUserId();
        return new ResponseEntity<>(service.getUserAddresses(userId),HttpStatus.OK);
    }

    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> UpdateAddresses(@PathVariable Long addressId,
                                                      @RequestBody AddressDTO addressDTO){
        return new ResponseEntity<>(service.UpdateAddress(addressId,addressDTO),HttpStatus.OK);
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> DeleteAddresses(@PathVariable Long addressId){
        return new ResponseEntity<>(service.deleteAddress(addressId),HttpStatus.OK);
    }
}
