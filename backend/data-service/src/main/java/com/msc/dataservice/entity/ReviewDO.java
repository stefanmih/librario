package com.msc.dataservice.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "REVIEW")
public class ReviewDO implements Serializable {

    @Id
    @Column(name = "ID")
    private Integer id;

    @Column(name = "USER_ID")
    private Integer userId;

    @Column(name = "BOOK_ID")
    private Integer bookId;

    @Column(name = "REV_MARK")
    private Integer revMark;

    @Column(name = "REV_TEXT")
    private String revText;

    @Column(name = "REV_TITLE")
    private String revTitle;

    @Column(name = "REV_DATE")
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
