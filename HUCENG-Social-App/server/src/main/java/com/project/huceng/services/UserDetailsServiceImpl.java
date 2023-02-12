package com.project.huceng.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import com.project.huceng.repos.UserRepository;



@Service
public class UserDetailsServiceImpl implements org.springframework.security.core.userdetails.UserDetailsService {



    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


	UserRepository userRepository;

	public UserDetailsServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
    


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	
    	try {
    		return userRepository.findByEmail(username);
    	}
    	catch(Exception e ) {
    		throw new UsernameNotFoundException(username);
    	}
    	

    }
}