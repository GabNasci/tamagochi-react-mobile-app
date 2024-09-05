import { ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Link, Href, router } from "expo-router";

type ButtonProps = {
    link: Href,
    text: string
}

const ButtonPlay = ({ link, text }: ButtonProps) => {
    return (

        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => router.push(link)}
        >
            <ImageBackground
                source={require('@/assets/images/button_play.png')}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
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
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default ButtonPlay;