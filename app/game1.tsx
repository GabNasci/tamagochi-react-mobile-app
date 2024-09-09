import React, { useCallback, useEffect, useState } from 'react';
import ButtonYellow, { ButtonColorEnum } from "@/components/ButtonYellow";
import { router, useFocusEffect } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import { Accelerometer } from 'expo-sensors';

// Obtém a altura da tela

const { height, width } = Dimensions.get('window');
type Target = {
    id: number;
    x: number;
    y: number;
}

const Game1 = () => {
    const [positionY, setPositionY] = useState(120);  // Posição vertical do pato
    const [gameStarted, setGameStarted] = useState(false);
    const [targets, setTargets] = useState<Target[]>([]);  // Estado para armazenar os targets

    const handleBack = () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        accelerometerSubscription.remove()
        router.back();
        setGameStarted(false)
        Accelerometer.removeAllListeners()
    };

    const setLandscapeOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };



    const accelerometerSubscription = Accelerometer.addListener((data) => {
        if (gameStarted) {
            const { x, y } = data;

            // Cálculo da nova posição vertical e horizontal
            let newPositionY = (y * 200) + height / 2 - 100; // Ajusta para começar no meio

            // Limita o pato para não ultrapassar as bordas da tela (vertical)
            newPositionY = Math.max(height - (height + 16), Math.min(newPositionY, height));  // 64 é a altura do pato
            // Limita o pato para não ultrapassar as bordas da tela (horizontal)
            console.log(newPositionY)
            setPositionY(newPositionY);  // Define a nova posição vertical do pato
        }
    });

    // useEffect(() => {
    //     console.log(height, positionY)

    // }, [positionY]);


    useFocusEffect(
        useCallback(() => {
            setLandscapeOrientation();
        setPositionY(120);
        Accelerometer.setUpdateInterval(100); // Atualiza a cada 100ms
        }, [])
    );




    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/game-1/background_game1.gif')}
                resizeMode="cover"
                style={[styles.image]}
            >
                <ButtonYellow
                    onPress={handleBack}
                    text="Voltar"
                    width={147}
                    height={40}
                    buttonColor={ButtonColorEnum.Orange}
                />
                {!gameStarted && (
                    <ButtonYellow
                        onPress={() => setGameStarted(true)}
                        text="Jogar"
                        width={147}
                        height={40}
                        buttonColor={ButtonColorEnum.Blue}
                    />
                )}
                <Image
                    source={require("@/assets/images/game-1/white-fly-animation.gif")}
                    resizeMode="cover"
                    style={{
                        position: "absolute",
                        width: 106,
                        height: 64,
                        transform: [
                            { translateY: positionY },  // Muda a posição vertical do pato
                            { translateX: -(width / 4) },  // Muda a posição horizontal do pato
                            { scaleX: -1 },             // Reflete o pato horizontalmente
                        ]
                    }}
                />
                {targets.map((target) => (
                    <Image
                        key={target.id}
                        source={require("@/assets/images/game-1/target.png")}
                        resizeMode="cover"
                        style={{
                            position: 'absolute',
                            width: 64,
                            height: 64,
                            left: target.x,  // Posição X do target (movendo da direita para a esquerda)
                            top: target.y,   // Posição Y aleatória do target
                        }}
                    />
                ))}
                <Image
                    source={require("@/assets/images/game-1/target.png")}
                    resizeMode="cover"
                    style={{
                        width: 64,
                        height: 64,
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
