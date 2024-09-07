import { foodImage } from "@/mock";
import { useState } from "react";
import { Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

const BoxHungry = () => {
  const [foodNumber, setFoodNumber] = useState<number>(0)

  function NextFood(foodIndex: number): number {
    if (foodIndex === (foodImage.length - 1)) return 0
    return foodIndex + 1;
  }

  const handleChangeDuck = () => {
    setFoodNumber(NextFood(foodNumber))
  }

  return (
    <TouchableOpacity onPress={handleChangeDuck} style={styles.teste} activeOpacity={0.9}>
      <ImageBackground
        source={require('@/assets/images/background/backgroundHungry.png')}
        style={styles.containerImage}
      >
        <Image source={foodImage[foodNumber].image} style={styles.containerFood} />
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  teste: {
    right: 0,
    bottom: 0,
  },
  containerFood: {
    width: 55,
    height: 55,
  },
  containerImage: {
    width: 85,
    height: 85,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default BoxHungry;