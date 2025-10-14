package com.basics.spring_basics.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_Id")
    private Long addressId;

    @NotBlank
    @Size(min = 5 , message = "Building name should be at least 5 characters")
    private String buildingName;

    @NotBlank
    @Size(min = 3 , message = "Street name should be at least 3 characters")
    private String street;

    @NotBlank
    @Size(min = 2 , message = "City name should be at least 2 characters")
    private String city;

    @NotBlank
    @Size(min = 2 , message = "State name should be at least 2 characters")
    private String state;

    @NotBlank
    @Size(min = 2 , message = "Country name should be at least 2 characters")
    private String country;

    @NotBlank
    @Size(min = 6 , message = "pin code should be at least 6 characters")
    private String pinCode;

    @ManyToOne
    @JoinColumn(name = "user_Id")
    private User users;

    public Address(String street, String city, String state, String country, String pinCode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.country = country;
        this.pinCode = pinCode;
    }
}
