package com.msc.userservice.controller;

import com.msc.dataservice.dto.Address;
import com.msc.dataservice.dto.User;
import com.msc.dataservice.dto.UserData;
import com.msc.dataservice.entity.AddressDO;
import com.msc.dataservice.entity.UserDO;
import com.msc.dataservice.service.DozerService;
import com.msc.userservice.repository.AddressServiceRepository;
import com.msc.userservice.repository.UserServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserServiceController {

    private static String localOrderId = UUID.randomUUID().toString();
    @Autowired
    private UserServiceRepository repositoryUser;

    @Autowired
    private AddressServiceRepository repositoryAddress;

    @PostMapping("updateUser")
    public void updateUser(@RequestBody UserDO user) throws URISyntaxException {
        if(user.getId() == null || user.getId().equals(0)) {
            user.setId(getLastId());
            AddressDO addr = new AddressDO();
            addr.setUserId(user.getId());
            addr.setId(getLastIdAddress());
            repositoryAddress.save(addr);
        }
        repositoryUser.save(DozerService.map(user, UserDO.class));
    }

    @GetMapping("getUser/{userId}")
    public UserDO getUser(@PathVariable String userId){
        return repositoryUser.findById(Integer.parseInt(userId)).get();
    }

    @PostMapping("updateAddress")
    public void updateAddress(@RequestBody AddressDO address) throws URISyntaxException {
        if(address.getId() == null || address.getId().equals(0))
            address.setId(getLastIdAddress());
        repositoryAddress.save(DozerService.map(address, AddressDO.class));
    }

    @GetMapping("getAddress/{addrId}")
    public AddressDO getAddress(@PathVariable String addrId){
        return repositoryAddress.findById(Integer.parseInt(addrId)).get();
    }

    @GetMapping("getUserData/{userId}")
    public UserData getUserData(@PathVariable String userId) throws URISyntaxException {
        User user = DozerService.map(repositoryUser.findById(Integer.parseInt(userId)).get(), User.class);
        Address address = DozerService.map(repositoryAddress.findAll().stream().filter(e->e.getUserId().toString().equals(userId)).toList().get(0), Address.class);
        return new UserData(user, address);
    }

    @PostMapping("updateUserData")
    public void updateUserData(@RequestBody UserData userData) throws URISyntaxException {
        User user = DozerService.map(repositoryUser.findById(Integer.parseInt(userData.getUserId())).get(), User.class);
        Address address = DozerService.map(repositoryAddress.findById(Integer.parseInt(userData.getAddressId())).get(), Address.class);
        user.setName(userData.getFirstName());
        user.setSurname(userData.getLastName());
        user.setEmail(userData.getEmail());
        user.setPassword(userData.getPassword());
        user.setPhone(userData.getPhone());
        address.setCity(userData.getCity());
        address.setCityCode(userData.getCityCode());
        address.setCountry(userData.getCountry());
        address.setStreet(userData.getStreet());
        address.setStreetNumber(userData.getStreetNum());
        repositoryUser.save(DozerService.map(user, UserDO.class));
        repositoryAddress.save(DozerService.map(address, AddressDO.class));
    }

    public int getLastId(){
        if(repositoryUser.findAll().isEmpty()){
            return 0;
        }else{
            return repositoryUser.findAll().stream().mapToInt(UserDO::getId).max().getAsInt() + 1;
        }
    }

    public int getLastIdAddress(){
        if(repositoryAddress.findAll().isEmpty()){
            return 0;
        }else{
            return repositoryAddress.findAll().stream().mapToInt(AddressDO::getId).max().getAsInt() + 1;
        }
    }

}
