package in.MoProjekt.foodweb.service;

import com.stripe.exception.StripeException;

import in.MoProjekt.foodweb.entity.OrderEntity;
import in.MoProjekt.foodweb.io.PaymentResponse;

public interface PaymentService {
    public PaymentResponse createPaymentLink(OrderEntity orderEntity) throws StripeException;

}
