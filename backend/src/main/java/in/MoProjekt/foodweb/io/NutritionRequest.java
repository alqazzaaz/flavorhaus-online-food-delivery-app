package in.MoProjekt.foodweb.io;

public class NutritionRequest {

    private String foodName;
    private int portion;

    public NutritionRequest() {}

    public NutritionRequest(String foodName, int portion) {
        this.foodName = foodName;
        this.portion = portion;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public int getPortion() {
        return portion;
    }

    public void setPortion(int portion) {
        this.portion = portion;
    }
}
