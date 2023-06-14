package com.msc.reviewservice.controller;

import com.msc.dataservice.dto.Book;
import com.msc.dataservice.dto.Review;
import com.msc.dataservice.entity.ReviewDO;
import com.msc.dataservice.service.DozerService;
import com.msc.reviewservice.repository.BookRepository;
import com.msc.reviewservice.repository.ReviewServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ReviewServiceController {

    @Autowired
    private ReviewServiceRepository repositoryReview;

    @Autowired
    private BookRepository repositoryBook;

    @PostMapping("addReview")
    public void addReview(@RequestBody Review review) throws URISyntaxException {
        review.setId(getLastId());
        review.setRevDate(new Date());
        repositoryReview.save(DozerService.map(review, ReviewDO.class));
    }

    @PostMapping("getProduct/{productId}")
    public List<Object> addReview(@PathVariable String productId) throws URISyntaxException {
        List<Review> listReview = DozerService.mapList(repositoryReview.findAll().stream().filter(e->e.getBookId().toString().equals(productId)).toList(), Review.class);
        return Arrays.asList(DozerService.map(repositoryBook.findById(Integer.parseInt(productId)).get(), Book.class), listReview);
    }

    public int getLastId(){
        if(repositoryReview.findAll().isEmpty()){
            return 0;
        }else{
            return repositoryReview.findAll().stream().mapToInt(ReviewDO::getId).max().getAsInt() + 1;
        }
    }

}
