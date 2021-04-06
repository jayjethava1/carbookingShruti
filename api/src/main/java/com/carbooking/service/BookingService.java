package com.carbooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.carbooking.model.BookingDto;
import com.carbooking.model.DriverBookingDto;
import com.carbooking.repo.Booking;
import com.carbooking.repo.BookingRepository;
import com.carbooking.repo.Customer;
import com.carbooking.repo.Dealer;
import com.carbooking.repo.DriverBooking;
import com.carbooking.repo.DriverBookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private DriverBookingRepository driverbookingRepository;
    
    @Autowired
    private DealerService dealerService;
    
    @Autowired
    private JavaMailSender javaMailSender;
    
    @Autowired
	private CustomerService customerService;

    public void confirmBooking(BookingDto bookingDto) {
        Booking booking = getBooking(bookingDto);
        bookingRepository.save(booking);
    }
    
    public void driverConfirmBooking(DriverBookingDto bookingDto) {
        DriverBooking booking = getDriverBookingDto(bookingDto);
        driverbookingRepository.save(booking);
        Dealer dealer=  dealerService.getDealer(booking.getDealerId());
        Customer customer=customerService.getCustomer(booking.getCustomerId());
        
        
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(customer.getEmailAddress(),dealer.getEmailAddress(),"shrutipatekar76@gmail.com");

        msg.setSubject("Trip booked");
        msg.setText("Hello "+customer.getName()+", "
        		+ "Your Trip has been booked by Driver "+booking.getDriverId()+" for " +booking.getSource()+ " from "+booking.getDestination()+" on Start Date: " 
        		+booking.getStartDate() + " to End Date: " +booking.getEndDate() +"  Thank you for your booking we wish you Safe and Happy Journey."
        				+ " Regards,"
        				+ " Car Booking Inc.");

        javaMailSender.send(msg);
        driverbookingRepository.save(booking);
        
    }
    
    private DriverBooking getDriverBookingDto(DriverBookingDto bookingDto) {
    	 DriverBooking booking = new DriverBooking();
         booking.setCarId(bookingDto.getCarId());
         booking.setCustomerId(bookingDto.getCustomerId());
         booking.setDealerId(bookingDto.getDealerId());
         booking.setSource(bookingDto.getSource());
         booking.setDestination(bookingDto.getDestination());
         booking.setStartDate(bookingDto.getStartDate());
         booking.setEndDate(bookingDto.getEndDate());
         booking.setDriverId(bookingDto.getDriverId());
         

         return booking;
	}

	public List<Booking> getCustomerBooking(String custId) {
    	return bookingRepository.findAllByCustomerId(custId);
    }

    public List<Booking> getDealerBooking(String dealerId) {
    	
    	return bookingRepository.findAllByDealerId(dealerId);
    }
    public List<DriverBooking> getDriverBooking(String driverId){
    	return driverbookingRepository.findAllByDriverId(driverId);
    }

    public Booking getBooking(BookingDto bookingDto){
        Booking booking = new Booking();
        booking.setCarId(bookingDto.getCarId());
        booking.setCustomerId(bookingDto.getCustomerId());
        booking.setDealerId(bookingDto.getDealerId());
        booking.setSource(bookingDto.getSource());
        booking.setDestination(bookingDto.getDestination());
        booking.setStartDate(bookingDto.getStartDate());
        booking.setEndDate(bookingDto.getEndDate());

        return booking;
    }

	public List<Booking> getAllBooking() {
		// TODO Auto-generated method stub
		return (List<Booking>) bookingRepository.findAll();
	}

	
}
