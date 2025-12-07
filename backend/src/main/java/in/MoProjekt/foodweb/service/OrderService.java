package in.MoProjekt.foodweb.service;

import in.MoProjekt.foodweb.entity.OrderEntity;
import in.MoProjekt.foodweb.io.OrderRequest;
import in.MoProjekt.foodweb.io.OrderResponse;
import in.MoProjekt.foodweb.io.PaymentResponse;


public interface OrderService {
    OrderEntity createOrderWithPayment(OrderRequest request) throws Exception;
}
