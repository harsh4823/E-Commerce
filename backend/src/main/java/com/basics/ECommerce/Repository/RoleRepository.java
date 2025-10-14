package com.basics.ECommerce.Repository;

import com.basics.ECommerce.Model.AppRole;
import com.basics.ECommerce.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional<Role> findByRoleName(AppRole appRole);
}
