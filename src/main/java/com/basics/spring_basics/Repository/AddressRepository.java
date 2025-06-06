package com.basics.spring_basics.Repository;

import com.basics.spring_basics.Model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {

    @Query("SELECT a FROM Address a JOIN a.users u WHERE u.userId = ?1")
    List<Address> findAllByUsersId(Long userId);
}
