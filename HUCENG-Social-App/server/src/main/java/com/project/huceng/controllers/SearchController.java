package com.project.huceng.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.huceng.entities.User;
import com.project.huceng.services.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private UserService userService;

    @GetMapping("/{keyword}")
    public List<User> Search(@PathVariable String keyword) {

        List<User> users = userService.search(keyword);
        return users;
    }


}