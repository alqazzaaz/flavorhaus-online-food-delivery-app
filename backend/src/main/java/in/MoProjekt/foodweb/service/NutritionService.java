package in.MoProjekt.foodweb.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.MoProjekt.foodweb.io.NutritionRequest;
import in.MoProjekt.foodweb.io.NutritionResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class NutritionService {

    private final ChatClient chatClient;
    private final ObjectMapper mapper = new ObjectMapper();

    public NutritionService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public NutritionResponse analyze(NutritionRequest req) throws Exception {

        String prompt = """
                Schätze die Kalorien und Makronährstoffe für folgendes Gericht.

                Gericht: %s
                Portionsgröße: %s Gramm

                Antworte ausschließlich im folgenden JSON:

                {
                  "calories": number,
                  "protein": number,
                  "carbs": number,
                  "fat": number
                }
                """.formatted(req.getFoodName(), req.getPortion());

        // ---- Anfrage an Spring AI senden ----
        String output = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content()
                .trim();   // Wichtig: Entfernt Whitespaces oder Zeilenumbrüche

        // ---- Output sicher parsen ----
        // Falls das AI-Modell Text um das JSON herum hat, extrahieren wir das JSON
        if (!output.startsWith("{")) {
            int start = output.indexOf("{");
            int end = output.lastIndexOf("}") + 1;
            if (start >= 0 && end > start) {
                output = output.substring(start, end);
            }
        }

        // JSON → NutritionResponse
        return mapper.readValue(output, NutritionResponse.class);
    }
}
