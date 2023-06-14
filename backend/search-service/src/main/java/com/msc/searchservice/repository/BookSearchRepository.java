package com.msc.searchservice.repository;

import com.msc.dataservice.entity.BookDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookSearchRepository extends JpaRepository<BookDO, Integer> {
}
