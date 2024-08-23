import { ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonCustom = () => {
    return (
        <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.85}
        >
            <ImageBackground
                source={require('@/assets/images/button_play.png')}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
            >
                <Text style={styles.text}>Jogar</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 24,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    button: {
        width: 186,
        height: 50,
        overflow: 'hidden',
      },
      imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      imageStyle: {
        borderRadius: 10, 
      },
      buttonText: {
        color: 'white',
        fontSize: 18 ,
        fontWeight: 'bold',
      },
})

export default ButtonCustom;