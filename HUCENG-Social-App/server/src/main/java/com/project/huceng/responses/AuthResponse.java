package com.project.huceng.responses;

import lombok.Data;

@Data
public class AuthResponse {

	String message;
	Long userId;
	String name;
	
	
	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long id) {
		this.userId = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	} 
	
	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	} 
	

}


