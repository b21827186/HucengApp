package com.project.huceng.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.project.huceng.entities.User;
import com.project.huceng.exceptions.UserNotFoundException;
import com.project.huceng.requests.UserChangeRequest;
import com.project.huceng.responses.UserChangeResponse;
import com.project.huceng.responses.UserResponse;
import com.project.huceng.services.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/userdata")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	
	@PostMapping
	public UserChangeResponse updateOneUser(@RequestBody UserChangeRequest userChangeRequest) {
		
		return userService.updateOneUser(userChangeRequest);
	}
	
	
	
	@ExceptionHandler(UserNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	private void handleUserNotFound() {
		
	}
}
