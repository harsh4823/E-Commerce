package com.basics.spring_basics.Service;

import com.basics.spring_basics.Model.Address;
import com.basics.spring_basics.Payload.StripePaymentDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.PaymentIntent;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class StripeServiceImp implements StripeService{

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init(){
        Stripe.apiKey = stripeSecretKey;
    }

    @Override
    public PaymentIntent paymentIntent(StripePaymentDTO stripePaymentDTO) throws StripeException {
        Long amount = stripePaymentDTO.getAmount();
        String currency = stripePaymentDTO.getCurrency();
        String email = stripePaymentDTO.getEmail();
        String name = stripePaymentDTO.getName();
        String description = stripePaymentDTO.getDescription();
        Address address = stripePaymentDTO.getAddress();

        Customer customer;

        CustomerSearchParams customerSearchParams = CustomerSearchParams
                                    .builder()
                                    .setQuery("email:'"+email+"'")
                                    .build();

        CustomerSearchResult customers = Customer.search(customerSearchParams);

        if (customers.getData().isEmpty()){
            CustomerCreateParams customerCreateParams = CustomerCreateParams
                                                        .builder()
                                                        .setName(name)
                                                        .setEmail(email)
                                                        .setAddress(CustomerCreateParams.Address.builder()
                                                                .setLine1(address.getStreet())
                                                                .setCity(address.getCity())
                                                                .setState(address.getState())
                                                                .setPostalCode(address.getPinCode())
                                                                .setCountry(address.getCountry())
                                                                .build())
                                                        .build();
            customer = Customer.create(customerCreateParams);
        }else{
            customer = customers.getData().getFirst();
        }


        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(amount)
                        .setCurrency(currency)
                        .setCustomer(customer.getId())
                        .setDescription(description)
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build();

        return PaymentIntent.create(params);
    }
}
