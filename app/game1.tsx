import React, { useCallback, useEffect, useState } from 'react';
import ButtonYellow, { ButtonColorEnum } from "@/components/ButtonYellow";
import { router, useFocusEffect, useGlobalSearchParams } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import { Accelerometer } from 'expo-sensors';
import { System } from 'detect-collisions'; // Importa a biblioteca de colisões

// Obtém a altura da tela

const { height, width } = Dimensions.get('window');
type Target = {
    id: number;
    x: number;
    y: number;
}

const Game1 = () => {

    const { id } = useGlobalSearchParams()
    const [positionY, setPositionY] = useState(height / 2);  // Posição vertical do pato
    const [gameStarted, setGameStarted] = useState(false);
    const [targets, setTargets] = useState<Target[]>([]);  // Estado para armazenar os targets
    const [targetIntervalId, setTargetIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [collisionDetected, setCollisionDetected] = useState(false);

    const system = new System();

    const handleBack = () => {
        router.push({
            pathname: "/duck/joy",
            params: { id: id }
        });
        setGameStarted(false)
        Accelerometer.removeAllListeners()
        if (targetIntervalId) {
            clearInterval(targetIntervalId);
        }
    };


    const checkCollision = (duckY: number, duckHeight: number, targetX: number, targetY: number, targetHeight: number) => {
        const duckCollider = system.createCircle({ x: -200, y: duckY }, duckHeight / 2); // Exemplo de posição fixa no eixo X
        const targetCollider = system.createCircle({ x: targetX, y: targetY }, targetHeight / 2);
        console.log(duckCollider)
        // Detecta colisão entre o pato e o alvo
        const response = system.checkCollision(duckCollider, targetCollider);
        return response;
    };




    const generateAndMoveTargets = () => {
        const minY = 64; // 64px da borda superior
        const maxY = height - 64; // 64px da borda inferior

        const generateSingleTarget = () => {
            return {
                id: Math.random(),
                x: width,  // Inicializa na borda direita da tela
                y: Math.random() * (maxY - minY) + minY  // Posição Y entre minY e maxY
            };
        };

        const generateTargets = () => {
            // Gera o primeiro target imediatamente
            const firstTarget = generateSingleTarget();
            setTargets(prevTargets => [...prevTargets, firstTarget]);

            // Gera o segundo target após um tempo aleatório entre 500ms e 1500ms
            const delay = Math.random() * 1000 + 500; // Tempo entre 500ms e 1500ms
            setTimeout(() => {
                const secondTarget = generateSingleTarget();
                setTargets(prevTargets => [...prevTargets, secondTarget]);
            }, delay);
        };

        // Função que move os targets a cada intervalo
        const moveTargets = setInterval(() => {
            setTargets((prevTargets) => {
                const movedTargets = prevTargets.map(target => ({
                    ...target,
                    x: target.x - 4 // Move o target mais rápido, mudando 4 unidades em vez de 2
                })).filter(target => target.x > -64); // Remove se sair da tela (esquerda)

                // Verifica colisão para cada target
                movedTargets.forEach(target => {
                    const hasCollided = checkCollision(positionY, 64,target.x, target.y, 64); // 64 é o tamanho do pato e do target
                    if (hasCollided) {
                        console.log("Colidiu");
                        setCollisionDetected(true);
                    }
                });

                if (movedTargets.length === 0) {
                    generateTargets();
                }

                return movedTargets;
            });
        }, 50); // Intervalo de 50ms para mover os targets

        setTargetIntervalId(moveTargets);  // Guarda o intervalo para ser limpo posteriormente
    };

    useEffect(() => {
        if (gameStarted) {
            generateAndMoveTargets();

            const accelerometerSubscription = Accelerometer.addListener((data) => {
                const { x, y, z } = data;
                // Cálculo da nova posição vertical e horizontal
                let newPositionY = (-x * 500) + height / 2; // Ajusta para começar no meio
                // Limita o pato para não ultrapassar as bordas da tela (vertical)
                newPositionY = Math.max(height - (height + 16), Math.min(newPositionY, height));  // 64 é a altura do pato
                // Limita o pato para não ultrapassar as bordas da tela (horizontal)
                setPositionY(newPositionY);  // Define a nova posição vertical do pato
            });

            // Define o intervalo de atualização do acelerômetro
            Accelerometer.setUpdateInterval(100);
        }
    }, [gameStarted]);


    useFocusEffect(
        useCallback(() => {
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
