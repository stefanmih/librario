package com.msc.orderservice.controller;

import com.msc.dataservice.dto.Book;
import com.msc.dataservice.dto.Reservation;
import com.msc.dataservice.entity.ReservationDO;
import com.msc.dataservice.service.DozerService;
import com.msc.orderservice.repository.BookRepository;
import com.msc.orderservice.repository.OrderServiceRepository;
import com.msc.orderservice.util.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OrderServiceController {

    private static String localOrderId = UUID.randomUUID().toString();
    @Autowired
    private OrderServiceRepository repositoryOrder;

    @Autowired
    private BookRepository repositoryBook;

    @PostMapping("getOrdersByUser/{userId}")
    public List<Reservation> getOrdersByUser(@PathVariable String userId) throws URISyntaxException {
        List<ReservationDO> reservationDOList = repositoryOrder
                .findAll()
                .stream()
                .filter(e -> e.getUserId() == Integer.parseInt(userId) && !e.getStatus().equals(OrderStatus.CART.toString()))
                .toList();
        List<Reservation> distinctList = new ArrayList<>();
        for(ReservationDO rdo : reservationDOList){
            if(!containsWithOrder(rdo.getOrderId(), distinctList)){
                distinctList.add(DozerService.map(rdo, Reservation.class));
            }
        }
        distinctList.sort((o1, o2) -> -o1.getInitDate().compareTo(o2.getInitDate()));
        return distinctList;
    }

    public boolean containsWithOrder(String orderId, List<Reservation> list){
        for(Reservation r : list){
            if(r.getOrderId().equals(orderId)){
                return true;
            }
        }
        return false;
    }

    @PostMapping("getCartItemsByUser/{userId}")
    public List<Book> getCartItemsByUser(@PathVariable String userId) throws URISyntaxException {
        List<ReservationDO> lr = repositoryOrder.findAll()
                .stream()
                .filter(e -> e.getUserId() == Integer.parseInt(userId) && e.getStatus().equals(OrderStatus.CART.toString())).toList();
        List<Book> lb = new ArrayList<>();
        for(ReservationDO r : lr){
            lb.add(DozerService.map(repositoryBook.findById(r.getBookId()).get(), Book.class));
        }
        return lb;
    }

    @PostMapping("addOrder/{userId}")
    public void addOrder(@PathVariable String userId){
        List<ReservationDO> listReservation = repositoryOrder.findAll().stream().filter(e->e.getStatus().equals(OrderStatus.CART.toString()) && userId.equals(e.getUserId().toString())).toList();
        for(ReservationDO r : listReservation){
            r.setStatus(OrderStatus.PENDING.toString());
            repositoryOrder.save(r);
        }
        localOrderId = UUID.randomUUID().toString();
    }

    @GetMapping("addToCart")
    public void addToCart(String productId, String userId) {
        ReservationDO order = new ReservationDO();
        order.setId(getLastId());
        order.setOrderId(localOrderId);
        order.setBookId(Integer.parseInt(productId));
        order.setUserId(Integer.parseInt(userId));
        order.setStatus(OrderStatus.CART.toString());
        order.setInitDate(new Date());
        repositoryOrder.save(order);
    }

    @PostMapping("removeFromCart/{productId}/{userId}")
    public void removeFromCart(@PathVariable String productId,@PathVariable String userId) {
        for(ReservationDO r : repositoryOrder.findAll().stream().filter(e->e.getUserId().toString().equals(userId)).toList()){
            if(r.getStatus().equals(OrderStatus.CART.toString()) && r.getBookId().toString().equals(productId)){
                repositoryOrder.deleteById(r.getId());
            }
        }
    }

    @PostMapping("returnToCart/{orderId}")
    public void returnToCart(@PathVariable String orderId) {
        for(ReservationDO r : repositoryOrder.findAll().stream().filter(e->e.getOrderId().toString().equals(orderId)).toList()){
            r.setStatus(OrderStatus.CART.toString());
            r.setOrderId(localOrderId);
            repositoryOrder.save(r);
        }
    }

    @PostMapping("removeOrder/{orderId}")
    public void removeOrder(@PathVariable String orderId) {
        for(ReservationDO r : repositoryOrder.findAll().stream().filter(e->e.getOrderId().equals(orderId)).toList()){
            repositoryOrder.deleteById(r.getId());
        }
    }

    public int getLastId(){
        if(repositoryOrder.findAll().isEmpty()){
            return 0;
        }else{
            return repositoryOrder.findAll().stream().mapToInt(ReservationDO::getId).max().getAsInt() + 1;
        }
    }

}
