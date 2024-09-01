import { ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Link, Href } from "expo-router";

type ButtonYellow = {
    onPress: () => void
    text: string
}

const ButtonYellow = ({text, onPress}: ButtonYellow) => {
    return (

        <TouchableOpacity onPress={onPress}
            style={styles.button}
            activeOpacity={0.85}
        >
            
                <ImageBackground
                    source={require('@/assets/images/yellow-button.png')}
                    style={styles.imageBackground}
                    imageStyle={styles.imageStyle}
                    resizeMode="contain"
                >
                    <Text style={styles.text}>{text}</Text>
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
        width: 180,
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
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default ButtonYellow;