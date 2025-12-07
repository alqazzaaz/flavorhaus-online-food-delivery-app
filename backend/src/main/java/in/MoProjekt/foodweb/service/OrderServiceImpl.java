package in.MoProjekt.foodweb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import in.MoProjekt.foodweb.entity.OrderEntity;
import in.MoProjekt.foodweb.io.OrderRequest;
import in.MoProjekt.foodweb.io.OrderResponse;
import in.MoProjekt.foodweb.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserService userService;

    @Override
    public OrderEntity createOrderWithPayment(OrderRequest request) throws Exception {
        OrderEntity newOrder = convertToEntity(request);
        String loggedInUserId = userService.findByUserId();
        newOrder.setUserId(loggedInUserId);
        newOrder.setCreatedAt(new java.util.Date());
        newOrder = orderRepository.save(newOrder);


        

        /*
        Payment

        */
        return newOrder;
       
    }


        private OrderResponse convertToResponse(OrderEntity newOrder){
            return OrderResponse.builder()
                .id(newOrder.getId())
                .userId(newOrder.getUserId())
                .userAddress(newOrder.getUserAddress())
                .amount(newOrder.getAmount())
                .orderedItems(newOrder.getOrderedItems())
                .orderStatus(newOrder.getOrderStatus())
                .email(newOrder.getEmail())
                .phoneNumber(newOrder.getPhoneNumber())
                .build();
        }
   



    private OrderEntity convertToEntity(OrderRequest request){
        return OrderEntity.builder()
            .userAddress(request.getUserAddress())
            .amount(request.getAmount())
            .orderedItems(request.getOrderedItems())
            .email(request.getEmail())
            .phoneNumber(request.getPhoneNumber())
            .orderStatus(request.getOrderStatus())
            .build();
    }
}
