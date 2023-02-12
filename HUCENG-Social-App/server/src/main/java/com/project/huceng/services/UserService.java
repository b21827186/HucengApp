package com.project.huceng.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.huceng.entities.User;
import com.project.huceng.repos.UserRepository;
import com.project.huceng.requests.UserChangeRequest;
import com.project.huceng.responses.UserChangeResponse;
import com.project.huceng.responses.UserDetailsImpl;

@Service
public class UserService {

	UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User saveOneUser(User newUser) {
		return userRepository.save(newUser);
	}

	public User getOneUserById(Long userId) {
		return userRepository.findById(userId).orElse(null);
	}

	
	public UserChangeResponse updateOneUser(UserChangeRequest userChangeRequest) {
		
		Optional<User> user = userRepository.findById(userChangeRequest.getId());
		if(user.isPresent()) {
			User foundUser = user.get();
			
			User responseUser = new User(userChangeRequest.getId(),foundUser.getEmail(),userChangeRequest.getName(),foundUser.getPassword(),userChangeRequest.getWebpage(),userChangeRequest.isCvVisible(),userChangeRequest.getImage(),userChangeRequest.getCv(),foundUser.getRole());
			
			userRepository.save(responseUser);
			
			UserChangeResponse userChangeResponse = new UserChangeResponse(responseUser.getId(),responseUser.getName(),responseUser.getWebpage(),responseUser.isCvVisible(),responseUser.getImage(),responseUser.getCv(),foundUser.getRole());
			
			
			return userChangeResponse;
		}else
			return null;
	}
	

	public User getOneUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	
	
	
	
	public List<User> search(String keyword) {
        if(keyword!=null) {
            return userRepository.search(keyword);
        }

        return userRepository.findAll();
    }
	
	

	
	
	
}

