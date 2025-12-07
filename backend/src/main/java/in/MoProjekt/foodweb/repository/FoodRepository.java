package in.MoProjekt.foodweb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import in.MoProjekt.foodweb.entity.FoodEntity;


@Repository
public interface FoodRepository extends MongoRepository<FoodEntity, String> {

}
