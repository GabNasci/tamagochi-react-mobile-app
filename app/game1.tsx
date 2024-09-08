import React, { useEffect, useState } from 'react';
import ButtonYellow, { ButtonColorEnum } from "@/components/ButtonYellow";
import { router } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import { Accelerometer } from 'expo-sensors';

// Obtém a altura da tela
const { height, width } = Dimensions.get('window');

const Game1 = () => {
    const [position, setPosition] = useState(0);  // Posição vertical do pato
    const [rotation, setRotation] = useState(0);  // Rotação do pato

    const handleBack = () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        accelerometerSubscription.remove()
        router.back();
    };

    const setLandscapeOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    const accelerometerSubscription = Accelerometer.addListener((data) => {
        const { x, y } = data;
        const newPosition = (y * 300) + height / 2 - 100; // Ajusta para começar no meio
        const newRotation = x * 50;   // Use o eixo 'x' para rotação horizontal

        setPosition(newPosition);  // Define a nova posição do pato
        setRotation(newRotation);  // Define a nova rotação do pato
    });

    useEffect(() => {
        setLandscapeOrientation();
        Accelerometer.setUpdateInterval(100); // Atualiza a cada 100ms

    }, []);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/background/background_game1.gif')}
                resizeMode="contain"
                style={[styles.image]}
            >
                <ButtonYellow
                    onPress={handleBack}
                    text="Voltar"
                    width={147}
                    height={40}
                    buttonColor={ButtonColorEnum.Blue}
                />
                <Image
                    source={require("@/assets/images/pato-marelo/white-fly-animation.gif")}
                    resizeMode="cover"
                    style={{
                        width: 106,
                        height: 64,
                        transform: [
                            { translateY: position },  // Muda a posição vertical do pato
                            { scaleX: -1 },
                            {translateX: 200} // Reflete o pato horizontalmente
                        ]
                    }}
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#75D1E8"
    },
    image: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    }
});

export default Game1;
