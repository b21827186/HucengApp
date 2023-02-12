package com.project.huceng.responses;


import lombok.Data;

@Data
public class UserChangeResponse {

	Long id;
	String name;
	String webpage;
	boolean cvVisible;
	String image;
	String cv;
	String Role;
	
	public UserChangeResponse() {
		
	}
	
	public UserChangeResponse(Long id, String name, String webpage, boolean cvVisible, String image,
			String cv,String Role) {
		super();
		this.id = id;
		this.name = name;
		this.webpage = webpage;
		this.cvVisible = cvVisible;
		this.image = image;
		this.cv = cv;
		this.Role = Role;
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