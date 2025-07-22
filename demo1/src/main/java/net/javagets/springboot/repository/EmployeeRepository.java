package net.javagets.springboot.repository;

import net.javagets.springboot.Employee;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	@Query("SELECT e FROM Employee e WHERE e.email = :email AND e.password = :password")
	Optional<Employee> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
	 boolean existsByEmail(String email);
	    Optional<Employee> findByEmail(String email);

}
