package in.MoProjekt.foodweb.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserRequest {

    private String name;
    private String email;
    private String password;
}
