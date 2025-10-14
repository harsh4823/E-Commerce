package com.basics.spring_basics.Service;

import com.basics.spring_basics.Exceptions.ResourceNotFoundException;
import com.basics.spring_basics.Model.Address;
import com.basics.spring_basics.Model.User;
import com.basics.spring_basics.Payload.AddressDTO;
import com.basics.spring_basics.Repository.AddressRepository;
import com.basics.spring_basics.Repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImp implements AddressService{

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO, User user) {
        Address address = modelMapper.map(addressDTO,Address.class);
        List<Address> addressList = user.getAddresses();
        addressList.add(address);
        user.setAddresses(addressList);
        address.setUsers(user);
        addressRepository.save(address);
        return modelMapper.map(address, AddressDTO.class);

    }

    @Override
    public List<AddressDTO> getAllAddresses() {
        List<Address> addresses = addressRepository.findAll();
        return addresses.stream().map
                (address -> modelMapper.map(address, AddressDTO.class)).toList();
    }

    @Override
    public AddressDTO getAddresses(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address","AddressId",addressId));

        return  modelMapper.map(address, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getUserAddresses(Long userId) {
        List<Address> addresses = addressRepository.findAllByUsersId(userId);
        return addresses.stream().map(
                address -> modelMapper.map(address, AddressDTO.class)
        ).toList();
    }

    @Override
    public AddressDTO UpdateAddress(Long addressId, AddressDTO addressDTO) {
        Address oldAddress = addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address","AddressId",addressId));

        oldAddress.setPinCode(addressDTO.getPinCode());
        oldAddress.setCity(addressDTO.getCity());
        oldAddress.setState(addressDTO.getState());
        oldAddress.setCountry(addressDTO.getCountry());
        oldAddress.setStreet(addressDTO.getStreet());
        oldAddress.setBuildingName(addressDTO.getBuildingName());

        Address updatedAddress = addressRepository.save(oldAddress);

        User user = oldAddress.getUsers();
        user.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));
        user.getAddresses().add(updatedAddress);

        userRepository.save(user);

        return modelMapper.map(updatedAddress, AddressDTO.class);

    }

    @Override
    public AddressDTO deleteAddress(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address","AddressId",addressId));
        User user = address.getUsers();

        user.getAddresses().removeIf(address1 -> address1.getAddressId().equals(addressId));

        userRepository.save(user);

        addressRepository.delete(address);

        return modelMapper.map(address, AddressDTO.class);
    }
}
