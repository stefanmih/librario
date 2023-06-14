package com.msc.orderservice.repository;

import com.msc.dataservice.entity.BookDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<BookDO, Integer> {
}
