package com.msc.authservice.controller;

import com.msc.authservice.repository.AuthServiceRepository;
import com.msc.dataservice.entity.UserDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthenticationServiceController {

    private static String localOrderId = UUID.randomUUID().toString();
    @Autowired
    private AuthServiceRepository repositoryAuth;

    @PostMapping("authenticate")
    public UserDO updateUser(@RequestBody UserDO user){
        List<UserDO> list = repositoryAuth.findAll().stream().filter(e->e.getUsername().equals(user.getUsername()) && e.getPassword().equals(user.getPassword())).toList();
        if(list.isEmpty()){
            return new UserDO();
        }else{
            return list.get(0);
        }
    }

    public int getLastId(){
        if(repositoryAuth.findAll().isEmpty()){
            return 0;
        }else{
            return repositoryAuth.findAll().stream().mapToInt(UserDO::getId).max().getAsInt() + 1;
        }
    }

}
