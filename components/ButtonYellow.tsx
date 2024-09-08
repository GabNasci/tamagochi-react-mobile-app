import { ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";

export enum ButtonColorEnum {
    Yellow,
    Orange,
    Blue,
}

type ButtonYellow = {
    onPress: () => void
    text: string
    width: number,
    height: number,
    buttonColor: ButtonColorEnum,
    fontSize?: number,
}

const ButtonYellow = ({ text, onPress, width, height, buttonColor, fontSize }: ButtonYellow) => {
    const colorButton = {
        [ButtonColorEnum.Yellow]: require('@/assets/images/yellow-button.png'),
        [ButtonColorEnum.Orange]: require('@/assets/images/button_play.png'),
        [ButtonColorEnum.Blue]: require('@/assets/images/button_blue.png'),
    }

    if (!fontSize) fontSize = 24;

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[styles.button, { width: width, height: height }]}
            activeOpacity={0.85}
        >
            <ImageBackground
                source={colorButton[buttonColor]}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
                resizeMode="contain"
            >
                <Text style={[styles.text, {fontSize: fontSize}]}>{text}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'supercell-font',
        color: "white",
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    button: {
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