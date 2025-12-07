package in.MoProjekt.foodweb.io;

import lombok.Data;

@Data
public class PaymentResponse {
    private String paymentUrl;
    private String orderId;
}
