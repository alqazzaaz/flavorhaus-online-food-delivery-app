package in.MoProjekt.foodweb.controller;

import in.MoProjekt.foodweb.io.NutritionRequest;
import in.MoProjekt.foodweb.io.NutritionResponse;
import in.MoProjekt.foodweb.service.NutritionService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/nutrition")
@CrossOrigin(origins = "*")
public class AiController {

    private final NutritionService nutritionService;
    @Autowired
    private ChatClient chatClient;


    public AiController(NutritionService nutritionService) {
        this.nutritionService = nutritionService;
    }

    @PostMapping("/analyze")
    public NutritionResponse analyze(@RequestBody NutritionRequest request) throws Exception {
        return nutritionService.analyze(request);
    }

    @GetMapping("/test")
    public String testAI() {
        return chatClient
                .prompt()
                .user("Sag 'Hallo'")
                .call()
                .content();
    }

}
