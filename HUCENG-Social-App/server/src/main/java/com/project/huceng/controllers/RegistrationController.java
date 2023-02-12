package com.project.huceng.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.huceng.entities.User;
import com.project.huceng.requests.UserRequest;
import com.project.huceng.responses.AuthResponse;
import com.project.huceng.services.UserService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/register")
public class RegistrationController {

    @Autowired
    private UserService userService;


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    
    @PostMapping()
    public ResponseEntity<AuthResponse> register(@RequestBody UserRequest registerRequest) {
        AuthResponse authResponse = new AuthResponse();

        //if email exist
        if(userService.getOneUserByEmail(registerRequest.getEmail()) != null) {
            authResponse.setMessage("E-mail already in use.");
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        }

        //if email not exist
        //Save new user to db
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setName(registerRequest.getName());
        userService.saveOneUser(user);

        //success response
        authResponse.setMessage("User successfully registered.");
        authResponse.setName(user.getName());
        authResponse.setUserId(user.getId());
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }
}