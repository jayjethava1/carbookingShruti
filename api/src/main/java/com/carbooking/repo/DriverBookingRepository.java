package com.carbooking.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverBookingRepository extends CrudRepository<DriverBooking, Long> {
	List<DriverBooking> findAllByDriverId(String driverId);
	List<DriverBooking> findAllByCustomerId(String customerId);

	List<DriverBooking> findAllByDealerId(String dealerId);
}
