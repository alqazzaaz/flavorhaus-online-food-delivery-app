/*package in.MoProjekt.foodweb.migration;

import in.MoProjekt.foodweb.entity.FoodEntity;
import in.MoProjekt.foodweb.repository.FoodRepository;
import in.MoProjekt.foodweb.service.OpenAITranslationService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class FoodMigrationRunner {

    private final FoodRepository foodRepo;
    private final OpenAITranslationService translator;

    @PostConstruct
    public void migrate() {

        for (FoodEntity food : foodRepo.findAll()) {

            Object nameObj = food.getName();
            Object descObj = food.getDescription();

            // Bereits migriert?
            if (nameObj instanceof Map && descObj instanceof Map) {
                continue;
            }

            // FALL: alter String
            String nameDe = (nameObj instanceof String) ? (String) nameObj : "";
            String descDe = (descObj instanceof String) ? (String) descObj : "";

            // KI-Übersetzungen
            String nameEn = translator.translate(nameDe, "English");
            String descEn = translator.translate(descDe, "English");

            // Neue Struktur setzen
            food.setName(Map.of("de", nameDe, "en", nameEn));
            food.setDescription(Map.of("de", descDe, "en", descEn));

            foodRepo.save(food);
        }

        System.out.println("✔ Migration complete!");
    }
}
*/