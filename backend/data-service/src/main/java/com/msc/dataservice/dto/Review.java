package com.msc.dataservice.dto;

import java.io.Serializable;
import java.util.Date;

public class Review implements Serializable {

    private Integer id;

    private Integer userId;

    private Integer bookId;

    private Integer revMark;

    private String revText;

    private String revTitle;

    private Date revDate;

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

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getRevMark() {
        return revMark;
    }

    public void setRevMark(Integer revMark) {
        this.revMark = revMark;
    }

    public String getRevText() {
        return revText;
    }

    public void setRevText(String revText) {
        this.revText = revText;
    }

    public Date getRevDate() {
        return revDate;
    }

    public void setRevDate(Date revDate) {
        this.revDate = revDate;
    }

    public String getRevTitle() {
        return revTitle;
    }

    public void setRevTitle(String revTitle) {
        this.revTitle = revTitle;
    }
}
