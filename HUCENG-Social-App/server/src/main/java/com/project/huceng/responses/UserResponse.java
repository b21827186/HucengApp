package com.project.huceng.responses;

import com.project.huceng.entities.User;

import lombok.Data;

@Data
public class UserResponse {
	
	Long id;
	String name;


	public UserResponse(User entity) {
		this.id = entity.getId();
		this.name = entity.getName();
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	} 
}
