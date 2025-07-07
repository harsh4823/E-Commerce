package com.basics.spring_basics.Service;

import com.basics.spring_basics.Model.User;
import com.basics.spring_basics.Payload.AddressDTO;

import java.util.List;

public interface AddressService {
    AddressDTO createAddress(AddressDTO addressDTO, User user);

    List<AddressDTO> getAllAddresses();

    AddressDTO getAddresses(Long addressId);

    List<AddressDTO> getUserAddresses(Long userId);

    AddressDTO UpdateAddress(Long addressId, AddressDTO addressDTO);

    AddressDTO deleteAddress(Long addressId);
}
