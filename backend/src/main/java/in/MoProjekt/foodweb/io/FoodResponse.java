package in.MoProjekt.foodweb.io;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FoodResponse {

    private String id;

    private Object name;        // Map or String
    private Object description;
    private String category;

    private double price;
    private String imageUrl;
}

