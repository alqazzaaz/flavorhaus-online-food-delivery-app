package in.MoProjekt.foodweb.service;

import in.MoProjekt.foodweb.io.UserRequest;
import in.MoProjekt.foodweb.io.UserResponse;

public interface UserService {
    UserResponse registerUser(UserRequest userRequest);

    String findByUserId();
}
