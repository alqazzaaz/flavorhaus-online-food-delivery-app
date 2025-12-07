package in.MoProjekt.foodweb.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import in.MoProjekt.foodweb.entity.FoodEntity;
import in.MoProjekt.foodweb.io.FoodRequest;
import in.MoProjekt.foodweb.io.FoodResponse;
import in.MoProjekt.foodweb.repository.FoodRepository;
import software.amazon.awssdk.core.sync.RequestBody;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private S3Client s3Client;

    @Autowired
    private FoodRepository foodRepository;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Override
    public String uploadFile(MultipartFile file) {
        // Implementation for file upload
        String filenameExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
        String key = UUID.randomUUID().toString() + "." + filenameExtension;
        try{
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .acl("public-read")
            .contentType(file.getContentType())
            .build();
            PutObjectResponse response = s3Client.putObject(putObjectRequest,
            RequestBody.fromBytes(file.getBytes()));

            if(response.sdkHttpResponse().isSuccessful()){
                return "https://" + bucketName + ".s3.amazonaws.com/" + key;
        }else{
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Failed to upload the file");
            }
        
        }catch(IOException ex){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"An error occurred while uploading the file");
            
        }
    }

    private FoodResponse convertToResponse(FoodEntity entity){
    return FoodResponse.builder()
            .id(entity.getId())
            .name(entity.getName())               // komplette Map
            .description(entity.getDescription()) // komplette Map
            .price(entity.getPrice())
            .category(entity.getCategory())
            .imageUrl(entity.getImageUrl())
            .build();
}


    @Override
public List<FoodResponse> readFoods(String lang) {
    return foodRepository.findAll().stream()
            .map(food -> convertToResponse(food, lang))
            .collect(Collectors.toList());
}


   @Override
public FoodResponse readFood(String id, String lang) {
    FoodEntity entity = foodRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Food not found"));
    return convertToResponse(entity, lang);
}


    @Override
    public boolean deleteFile(String filename) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
            .bucket(bucketName)
            .key(filename)
            .build();
            s3Client.deleteObject(deleteObjectRequest);
            return true;
    }

    @Override
public void deleteFood(String id) {

    // hole deutsche Version, reicht für delete
    FoodResponse response = readFood(id, "de");

    String imageUrl = response.getImageUrl();
    String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

    boolean fileDeleted = deleteFile(filename);

    if (fileDeleted) {
        foodRepository.deleteById(id);
    }
}


   
    @SuppressWarnings("unchecked")
private Map<String, String> cast(Object obj) {
    if (obj instanceof Map<?, ?> map) {
        return (Map<String, String>) map;
    }
    return Map.of();
}

private FoodResponse convertToResponse(FoodEntity entity, String lang) {

    Map<String, String> nameMap = cast(entity.getName());
    Map<String, String> descMap = cast(entity.getDescription());

    String name = nameMap.getOrDefault(lang, nameMap.getOrDefault("de", ""));
    String desc = descMap.getOrDefault(lang, descMap.getOrDefault("de", ""));

    return FoodResponse.builder()
        .id(entity.getId())
        .name(Map.of(lang, name))
        .description(Map.of(lang, desc))
        .price(entity.getPrice())
        .category(entity.getCategory())
        .imageUrl(entity.getImageUrl())
        .build();
}



    @Override
public FoodResponse addFood(FoodRequest request, MultipartFile file) {
    String imageUrl = uploadFile(file);

    FoodEntity entity = new FoodEntity();
    entity.setName(request.getNameMap());
    entity.setDescription(request.getDescriptionMap());
    entity.setCategory(request.getCategory());
    entity.setPrice(request.getPrice());
    entity.setImageUrl(imageUrl);

    FoodEntity saved = foodRepository.save(entity);

    return convertToResponse(saved, "de");
}


}

