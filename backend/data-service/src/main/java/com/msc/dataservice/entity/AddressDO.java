package com.msc.dataservice.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "ADDRESS")
public class AddressDO implements Serializable {

    @Id
    @Column(name = "ID")
    private Integer id;

    @Column(name = "USER_ID")
    private Integer userId;

    @Column(name = "COUNTRY")
    private String country;

    @Column(name = "CITY")
    private String city;

    @Column(name = "CITY_CODE")
    private String cityCode;

    @Column(name = "STREET")
    private String street;

    @Column(name = "STREET_NUMBER")
    private String streetNumber;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }
}
