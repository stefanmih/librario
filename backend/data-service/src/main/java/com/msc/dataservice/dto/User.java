package com.msc.dataservice.dto;

import java.io.Serializable;

public class User implements Serializable {

    private Integer id;

    private String username;

    private String password;

    private String name;

    private String surname;

    private String email;

    private String phone;

    private Integer balance;

    private String defGenre;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public String getDefGenre() {
        return defGenre;
    }

    public void setDefGenre(String defGenre) {
        this.defGenre = defGenre;
    }
}
