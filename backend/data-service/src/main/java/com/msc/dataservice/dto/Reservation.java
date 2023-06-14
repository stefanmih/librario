package com.msc.dataservice.dto;

import java.io.Serializable;
import java.util.Date;

public class Reservation implements Serializable {

    private Integer id;

    private String orderId;

    private Integer bookId;

    private Integer userId;

    private String status;

    private Date initDate;

    private Integer selectedAddress;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getInitDate() {
        return initDate;
    }

    public void setInitDate(Date initDate) {
        this.initDate = initDate;
    }

    public Integer getSelectedAddress() {
        return selectedAddress;
    }

    public void setSelectedAddress(Integer selectedAddress) {
        this.selectedAddress = selectedAddress;
    }
}
