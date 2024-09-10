import React, { useCallback, useEffect, useState } from 'react';
import ButtonYellow, { ButtonColorEnum } from "@/components/ButtonYellow";
import { router, useFocusEffect, useGlobalSearchParams } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import { Accelerometer } from 'expo-sensors';
import { System, Circle, Box } from 'detect-collisions';
import ModalCustom from '@/components/ModalCustom';
import { useDuckDatabase } from '@/database/useDuckDatabase';

// Obtém a altura da tela

const { height, width } = Dimensions.get('window');

const Game1 = () => {
    const { id } = useGlobalSearchParams();
    const [positionY, setPositionY] = useState(height / 2);
    const [gameStarted, setGameStarted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [textModal, setTextModal] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [timeLeft, setTimeLeft] = useState(30); // Definindo 30 segundos para o jogo
    const duckDataBase = useDuckDatabase()

    const handleJoy = async ()=> {
        try {
            const updatedDuck = await duckDataBase.findById(Number(id))
            
            if(!updatedDuck) {
                setTextModal('Não foi possível encontrar o pato 🦆!')
                return setModalVisible(true)
            }
            if (updatedDuck.sleep >= 100) {
                setTextModal('O pato está cansado.')
                return setModalVisible(true)
            }
            await duckDataBase.updateAtributes({
                hungry: updatedDuck.hungry,
                joy: updatedDuck.joy + 10,
                sleep: updatedDuck.sleep,
                id: updatedDuck.id
            })
            
        } catch (error) {
            console.log(error)
        }

    }

    const handleBack = () => {
        router.push({
            pathname: "/duck/joy",
            params: { id: id }
        });
        setGameStarted(false);
        Accelerometer.removeAllListeners();
    };

    // Inicia o jogo e o cronômetro
    useEffect(() => {
        if (gameStarted) {
            const accelerometerSubscription = Accelerometer.addListener((data) => {
                const { x } = data;
                let newPositionY = (-x * 500) + height / 2;
                newPositionY = Math.max(64, Math.min(newPositionY, height - 64));
                setPositionY(newPositionY);
            });

            Accelerometer.setUpdateInterval(100);

            // Cronômetro simples
            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime === 1) {
                        setGameStarted(false);
                        setModalVisible(true);
                        setTextModal("Você conseguiu!\n Diversão + 10");
                        setModalTitle("Parabéns!🦆");
                        handleJoy()
                        clearInterval(timer);
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => {
                clearInterval(timer);
                accelerometerSubscription.remove();
            };
        }
    }, [gameStarted]);

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
                    <View style={styles.description}>
                        <ButtonYellow
                            onPress={() => {
                                setGameStarted(true);
                                setTimeLeft(10);
                            }}
                            text="Jogar"
                            width={147}
                            height={40}
                            buttonColor={ButtonColorEnum.Blue}
                        />
                        <Text style={styles.textDescription}>Voe com o pato 🦆 por 10 segundos para aumentar usa diversão!</Text>
                    </View>
                )}

                {gameStarted && (
                    <View style={styles.time}>
                        <Text style={styles.textTime}>
                            Tempo: {timeLeft}s
                        </Text>
                    </View>
                )}

                <Image
                    source={require("@/assets/images/game-1/white-fly-animation.gif")}
                    resizeMode="cover"
                    style={{
                        position: "absolute",
                        width: 106,
                        height: 64,
                        top: positionY,
                        left: width / 4,
                        transform: [{ scaleX: -1 }],
                    }}
                />
            </ImageBackground>

            {modalVisible && (
                <ModalCustom
                    title={modalTitle}
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    text={textModal}
                />
            )}
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
    },
    description: {
        position: 'absolute',
        bottom: 60,
        alignItems: "center"
    },
    textDescription: {
        fontSize: 18,
        fontFamily: 'supercell-font',
        color: "white",
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textAlign: "center"
    },
    time: {
        position: "absolute",
        top: 65
    },
    textTime: {
        fontSize: 18,
        fontFamily: 'supercell-font',
        color: "white",
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textAlign: "center"
    }
});

export default Game1;
