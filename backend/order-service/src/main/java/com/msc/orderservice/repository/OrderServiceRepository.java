package com.msc.orderservice.repository;

import com.msc.dataservice.entity.ReservationDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderServiceRepository extends JpaRepository<ReservationDO, Integer> {
}
