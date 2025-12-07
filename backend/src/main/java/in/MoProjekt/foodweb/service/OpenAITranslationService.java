package in.MoProjekt.foodweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OpenAITranslationService {

    private final ChatClient chatClient;

    public String translate(String text, String targetLang) {

        String prompt = """
            Translate the following food name/description into %s.
            Make it natural, short, and suitable for a restaurant menu.
            Keep emojis or remove them if needed.

            TEXT:
            %s
        """.formatted(targetLang, text);

        return chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();
    }
}
