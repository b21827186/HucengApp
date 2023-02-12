package com.project.huceng.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.huceng.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);
	
	
	@Query("SELECT u FROM User u WHERE u.name LIKE %?1%")
    public List<User> search(String key);
	
	
	
	
	
	

}
