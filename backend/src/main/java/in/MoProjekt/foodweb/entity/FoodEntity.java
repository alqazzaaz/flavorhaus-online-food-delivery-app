package in.MoProjekt.foodweb.entity;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "foods")
public class FoodEntity {

    @Id
    private String id;

    private Map<String, String> name;        // de/en
    private Map<String, String> description; // de/en

    private String category; // WICHTIG: vorhin war das STRING

    private double price;
    private String imageUrl;
}
