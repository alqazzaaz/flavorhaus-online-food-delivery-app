package in.MoProjekt.foodweb.service;

import in.MoProjekt.foodweb.io.CartRequest;
import in.MoProjekt.foodweb.io.CartResponse;

public interface CartService {
    CartResponse addToCart(CartRequest request);
    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
    CartResponse deleteItem(String foodId);
}
