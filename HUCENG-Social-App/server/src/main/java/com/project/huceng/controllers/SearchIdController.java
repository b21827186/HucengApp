package com.project.huceng.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.huceng.entities.User;
import com.project.huceng.exceptions.UserNotFoundException;
import com.project.huceng.responses.UserInfoResponse;
import com.project.huceng.services.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class SearchIdController {

	private UserService userService;
	
	public SearchIdController(UserService userService) {
		this.userService = userService;
	}
	
	
	@GetMapping("/{userId}")
	public UserInfoResponse getOneUser(@PathVariable Long userId) {
		User user = userService.getOneUserById(userId);

		if(user == null) {
			throw new UserNotFoundException();
		}
		System.out.println(user.getEmail());
		return new UserInfoResponse(user);
	}
	

	
	
}
