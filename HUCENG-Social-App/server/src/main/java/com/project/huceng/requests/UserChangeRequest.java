package com.project.huceng.requests;


import lombok.Data;

@Data
public class UserChangeRequest {

	Long id;
	String name;
	String webpage;
	boolean cvVisible;
	String image;
	String cv;

	
	
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

	
	
}
