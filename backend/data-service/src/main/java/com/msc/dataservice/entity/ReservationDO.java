package com.msc.dataservice.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "RESERVATION")
public class ReservationDO implements Serializable {

    @Id
    @Column(name = "ID")
    private Integer id;

    @Column(name = "ORDER_ID")
    private String orderId;

    @Column(name = "BOOK_ID")
    private Integer bookId;

    @Column(name = "USER_ID")
    private Integer userId;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "INIT_DATE")
    private Date initDate;

    @Column(name = "SELECTED_ADDRESS")
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
