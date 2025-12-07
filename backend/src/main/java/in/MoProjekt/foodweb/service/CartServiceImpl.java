package in.MoProjekt.foodweb.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import in.MoProjekt.foodweb.entity.CartEntity;
import in.MoProjekt.foodweb.io.CartRequest;
import in.MoProjekt.foodweb.io.CartResponse;
import in.MoProjekt.foodweb.repository.CartRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserService userService;

    @Override
    public CartResponse addToCart(CartRequest request){
        String loggedInUserId = userService.findByUserId();
        Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);
        CartEntity cart = cartOptional.orElseGet(() -> 
            CartEntity.builder()
                .userId(loggedInUserId)
                .items(new HashMap<>())
                .build()
        );
        Map<String, Integer> cartItems = cart.getItems();
        cartItems.put(request.getFoodId(), cartItems.getOrDefault(request.getFoodId(), 0) + 1);
        cart.setItems(cartItems);
        cart = cartRepository.save(cart);
        return convertToResponse(cart);
    }

    @Override
    public CartResponse getCart(){
        String loggedInUserId = userService.findByUserId();
        CartEntity entity = cartRepository.findByUserId(loggedInUserId)
            .orElse(CartEntity.builder()
                .userId(loggedInUserId)
                .items(new HashMap<>())
                .build()
            );
        return convertToResponse(entity);
    }

    @Override
    public void clearCart(){
        String loggedInUserId = userService.findByUserId();
        cartRepository.deleteByUserId(loggedInUserId);
    }

    @Override
public CartResponse removeFromCart(CartRequest cartRequest) {
    String loggedInUserId = userService.findByUserId();
    CartEntity entity = cartRepository.findByUserId(loggedInUserId)
            .orElseThrow(() -> new RuntimeException("Cart not found"));

    Map<String, Integer> cartItems = entity.getItems();
    String foodId = cartRequest.getFoodId();

    if (cartItems.containsKey(foodId)) {
        int currentQuantity = cartItems.get(foodId);
        int updatedQuantity = currentQuantity - 1;

        if (updatedQuantity <= 0) {
            cartItems.remove(foodId);
        } else {
            cartItems.put(foodId, updatedQuantity);
        }

        entity = cartRepository.save(entity);
    }

    return convertToResponse(entity);
}

@Override
public CartResponse deleteItem(String foodId) {
    String loggedInUserId = userService.findByUserId();
    CartEntity entity = cartRepository.findByUserId(loggedInUserId)
            .orElseThrow(() -> new RuntimeException("Cart not found"));

    Map<String, Integer> cartItems = entity.getItems();
    cartItems.remove(foodId);
    entity = cartRepository.save(entity);

    return convertToResponse(entity);
}



    private CartResponse convertToResponse(CartEntity cartEntity){
        return CartResponse.builder()
                .id(cartEntity.getId())
                .userId(cartEntity.getUserId())
                .items(cartEntity.getItems())
                .build();
    }
}
