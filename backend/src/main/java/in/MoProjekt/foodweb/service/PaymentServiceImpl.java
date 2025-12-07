package in.MoProjekt.foodweb.service;

import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;

import in.MoProjekt.foodweb.entity.OrderEntity;
import in.MoProjekt.foodweb.io.PaymentResponse;
import in.MoProjekt.foodweb.repository.OrderRepository;


@Service
@RestController
@RequestMapping("/api/payments")
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private OrderRepository orderRepository;


    @Autowired
    private UserService userService;

        @Value("${stripePublishableKey}")
        private String stripePublishableKey;
        @Value("${stripeSecretKey}")
        private String stripeSecretKey;

        @Override
        public PaymentResponse createPaymentLink(OrderEntity orderEntity) throws StripeException {
            //create Stripe payment order

            com.stripe.Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder().addPaymentMethodType(
            SessionCreateParams.PaymentMethodType.CARD)
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl("https://flavorhaus.netlify.app/payment/success/"+ orderEntity.getId())
            .setCancelUrl("https://flavorhaus.netlify.app/payment/fail/"+ orderEntity.getId())
            .addLineItem(
                SessionCreateParams.LineItem.builder()
                    .setQuantity(1L)
                    .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("eur")
                            .setUnitAmount((long) orderEntity.getAmount()*100)
                            .setProductData(
                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                    .setName("Order #" + orderEntity.getId())
                                    .build()
                            )
                            .build()
                    )
                    .build()
            )
            .build();

            
            Session session = Session.create(params);
            PaymentResponse res = new PaymentResponse();
            res.setPaymentUrl(session.getUrl());
            res.setOrderId(orderEntity.getId());
            return res;
        }
}
