package com.basics.spring_basics.Repository;

import com.basics.spring_basics.Model.AppRole;
import com.basics.spring_basics.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional<Role> findByRoleName(AppRole appRole);
}
