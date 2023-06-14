package com.msc.authservice.repository;

import com.msc.dataservice.entity.UserDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthServiceRepository extends JpaRepository<UserDO, Integer> {
}
