package com.msc.userservice.repository;

import com.msc.dataservice.entity.UserDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserServiceRepository extends JpaRepository<UserDO, Integer> {
}
