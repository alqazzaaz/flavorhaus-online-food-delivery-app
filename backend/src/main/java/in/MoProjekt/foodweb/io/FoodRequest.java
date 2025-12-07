package in.MoProjekt.foodweb.io;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class FoodRequest {

    private String name;
    private String description;
    private String category;
    private double price;

    public Map<String, String> getNameMap() {
        return Map.of("de", name);
    }

    public Map<String, String> getDescriptionMap() {
        return Map.of("de", description);
    }
}
