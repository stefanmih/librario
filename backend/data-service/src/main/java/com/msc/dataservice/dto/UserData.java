package com.msc.dataservice.dto;

public class UserData {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String state;
    private String country;
    private String city;
    private String cityCode;
    private String street;
    private String streetNum;

    private String userId;
    private String addressId;

    public UserData(User user, Address address) {
        this.firstName = user.getName();
        this.lastName = user.getSurname();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.phone = user.getPhone();
        this.state = null;
        this.country = address.getCountry();
        this.city = address.getCity();
        this.cityCode = address.getCityCode();
        this.street = address.getStreet();
        this.streetNum = address.getStreetNumber();
        this.userId = user.getId().toString();
        this.addressId = address.getId().toString();

    }

    public UserData() {
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
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

    public String getStreetNum() {
        return streetNum;
    }

    public void setStreetNum(String streetNum) {
        this.streetNum = streetNum;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAddressId() {
        return addressId;
    }

    public void setAddressId(String addressId) {
        this.addressId = addressId;
    }
}
