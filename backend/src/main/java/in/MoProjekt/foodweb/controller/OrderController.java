package in.MoProjekt.foodweb.controller;

import in.MoProjekt.foodweb.entity.OrderEntity;
import in.MoProjekt.foodweb.io.OrderRequest;
import in.MoProjekt.foodweb.io.OrderResponse;
import in.MoProjekt.foodweb.io.PaymentResponse;
import in.MoProjekt.foodweb.service.OrderService;
import in.MoProjekt.foodweb.service.PaymentService;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import in.MoProjekt.foodweb.repository.OrderRepository;
import in.MoProjekt.foodweb.service.UserService;


@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final PaymentService paymentService;

    private final UserService userService;
    private final OrderRepository orderRepository;


    @PostMapping("/create")
    public PaymentResponse createOrder(@RequestBody OrderRequest request) throws Exception{
        OrderEntity order = orderService.createOrderWithPayment(request);
        PaymentResponse paymentLink = paymentService.createPaymentLink(order);

        return paymentLink;
    }

    @GetMapping
    public List<OrderEntity> getUserOrders() {
        String userId = userService.findByUserId();
        return orderRepository.findByUserId(userId);
    }




}
