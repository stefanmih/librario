package com.msc.searchservice.controller;

import com.msc.dataservice.dto.Book;
import com.msc.dataservice.entity.BookDO;
import com.msc.dataservice.service.DozerService;
import com.msc.searchservice.repository.BookSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SearchController {

    @Autowired
    private BookSearchRepository repo;

    @GetMapping("getAll")
    public List<Book> getAllBooks(){
        return DozerService.mapList(repo.findAll(), Book.class);
    }

    @PostMapping("getByFilter/{query}")
    public List<Book> getByFilter(@PathVariable String query){
        List<BookDO> listDO = repo.findAll();
        return DozerService.mapList(listDO.stream().filter(e-> e.getName().toLowerCase().contains(query.toLowerCase())
                ||e.getAuthor().toLowerCase().contains(query.toLowerCase())
                ||e.getDescription().toLowerCase().contains(query.toLowerCase())
                ||e.getGenre().toLowerCase().contains(query.toLowerCase())
                ||e.getPageNumber().toString().contains(query.toLowerCase())
                ||e.getPrice().toString().contains(query.toLowerCase())
                ||e.getType().toLowerCase().contains(query.toLowerCase())).collect(Collectors.toList())
        , Book.class);
    }

    @PostMapping("getById/{id}")
    public Book getById(@PathVariable String id) throws URISyntaxException {
        return DozerService.map(repo.findById(Integer.valueOf(id)).get(), Book.class);
    }
}
