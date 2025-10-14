package com.basics.spring_basics.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users ",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "Username"),
        @UniqueConstraint(columnNames = "Email")
    }
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_Id")
    private Long userId;

    @NotBlank
    @Size(max = 20)
    @Column(name = "Username")
    private String username;

    @Email
    @NotBlank
    @Size(max = 50)
    @Column(name = "Email")
    private String email;

    @NotBlank
    @Size(max = 120)
    @Column(name = "Password")
    private String password;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @Getter
    @Setter
    @ManyToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE},fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_Id"),
            inverseJoinColumns = @JoinColumn(name = "role_Id")
    )
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "user",cascade = {CascadeType.MERGE,CascadeType.PERSIST},
    orphanRemoval = true)
    @ToString.Exclude
    private Set<Product> products = new HashSet<>();

    @Getter
    @Setter
    @OneToMany( mappedBy = "users", cascade = {CascadeType.MERGE,CascadeType.PERSIST},orphanRemoval = true)
    @ToString.Exclude
    private List<Address> addresses;

    @ToString.Exclude
    @OneToOne(mappedBy = "user",cascade = {CascadeType.MERGE,CascadeType.PERSIST},orphanRemoval = true)
    private Cart cart;

}
