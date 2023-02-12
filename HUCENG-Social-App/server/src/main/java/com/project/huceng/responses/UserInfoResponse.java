package com.project.huceng.responses;


import com.project.huceng.entities.User;

import lombok.Data;

@Data
public class UserInfoResponse {

	Long id;
	String name;
	String webpage;
	boolean cvVisible;
	String image;
	String cv;
	String Role;
	
	public UserInfoResponse(User user) {
		this.id = user.getId();
		this.name = user.getName();
		this.webpage = user.getWebpage();
		this.cvVisible = user.isCvVisible();
		this.image = user.getImage();
		this.cv = user.getCv();
		this.Role = user.getRole();
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
	public String getWebpage() {
		return webpage;
	}
	public void setWebpage(String webpage) {
		this.webpage = webpage;
	}
	public boolean isCvVisible() {
		return cvVisible;
	}
	public void setCvVisible(boolean cvVisible) {
		this.cvVisible = cvVisible;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getCv() {
		return cv;
	}
	public void setCv(String cv) {
		this.cv = cv;
	}

	public String getRole() {
		return Role;
	}

	public void setRole(String role) {
		Role = role;
	}
	
	
	
	
}