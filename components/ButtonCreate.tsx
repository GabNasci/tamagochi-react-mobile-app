import { router } from "expo-router";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

const ButtonCreate = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/createDuck")}
      style={styles.lal}
    >
      <ImageBackground
        source={require('@/assets/images/background/backgroundButtonCreate.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lal: {
    padding: 40,
  },
  image: {
    width: 100,
    height: 100,
  }
})

export default ButtonCreate;