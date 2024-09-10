import React, { useEffect, useState } from 'react';
import ButtonYellow, { ButtonColorEnum } from "@/components/ButtonYellow";
import { router, useGlobalSearchParams } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, Dimensions, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Accelerometer } from 'expo-sensors';
import ModalCustom from '@/components/ModalCustom';
import { useDuckDatabase } from '@/database/useDuckDatabase';

const { height, width } = Dimensions.get('window');

type DuckHunter = {
  id: string,
  positionX: number,
  positionY: number,
  direction: 'left' | 'right',
}

const Game3 = () => {
  const { id } = useGlobalSearchParams();
  const [gameStarted, setGameStarted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [textModal, setTextModal] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [joyValue, setJoyValue] = useState<number>(0);
  const duckDataBase = useDuckDatabase();
  const [duckHunters, setDuckHunters] = useState<DuckHunter[]>([]);
  const [hunterImage, setHunterImage] = useState(require("@/assets/images/game-2/duckhunting.gif"));

  const handleJoy = async (value: number) => {
    try {
      const updatedDuck = await duckDataBase.findById(Number(id));

      if (!updatedDuck) {
        setTextModal('Não foi possível encontrar o pato 🦆!');
        return setModalVisible(true);
      }
      if (updatedDuck.joy >= 100) {
        setTextModal('O pato está cansado.');
        return setModalVisible(true);
      }

      await duckDataBase.updateAtributes({
        hungry: updatedDuck.hungry,
        joy: (updatedDuck.joy + value) > 100 ? 100 : updatedDuck.joy + value,
        sleep: updatedDuck.sleep,
        id: updatedDuck.id
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    router.push({
      pathname: "/duck/joy",
      params: { id: id }
    });
    setGameStarted(false);
  };

  // Função para gerar posições e direções aleatórias para os cachorros
  const generateRandomPosition = (): Omit<DuckHunter, "id"> => {
    return {
      positionX: Math.floor(Math.random() * (width - 80)) + 40,  // Limita X entre 40 e width - 40
      positionY: Math.floor(Math.random() * (height - 400)) + 200, // Limita Y entre 200 e height - 200
      direction: Math.random() > 0.5 ? 'left' : 'right', // Define a direção como 'left' ou 'right'
    };
  };
  

  // Função para gerar 2 cachorros
  const generateDogs = () => {
    const newDuckHunters = Array.from({ length: 2 }, (_, idx) => ({
      id: `${Date.now()}-${idx}`, // Ids únicos
      ...generateRandomPosition()
    }));
    setDuckHunters(newDuckHunters);
  };

  // Função para atualizar um cachorro ao clicar
  const handleDogClick = (id: string) => {
    setScore(prevScore => prevScore + 1); // Incrementa o score
    setDuckHunters(prevDuckHunters => {
      const updatedDuckHunters = prevDuckHunters.map(duck =>
        duck.id === id ? { ...duck, ...generateRandomPosition() } : duck
      );
      return updatedDuckHunters;
    });
  };
  

  // Movimento automático dos cachorros da esquerda para a direita e vice-versa
  const moveDucks = () => {
    setDuckHunters(prevDuckHunters =>
      prevDuckHunters.map(duck => {
        let newPositionX = duck.direction === 'left' ? duck.positionX - 5 : duck.positionX + 5;

        if (newPositionX < 0) {
          newPositionX = 0;
          duck.direction = 'right'; // Altera a direção ao atingir o limite esquerdo
        } else if (newPositionX > width - 60) {
          newPositionX = width - 60;
          duck.direction = 'left'; // Altera a direção ao atingir o limite direito
        }

        return { ...duck, positionX: newPositionX };
      })
    );
  };

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 1) {
            setGameStarted(false);
            setModalVisible(true);
            setModalTitle("Parabéns!🦆");
            handleJoy(joyValue);
            setDuckHunters([])
            clearInterval(timer);
          }
          return prevTime - 1;
        });
      }, 1000);
      const moveInterval = setInterval(moveDucks, 50); // Movimento constante dos cachorros

      return () => {
        clearInterval(timer);
        clearInterval(moveInterval);
      };
    }
  }, [gameStarted, joyValue]);

  useEffect(() => {
    if(gameStarted) {
      setJoyValue(parseInt(`${score/10}`) * 10)
      setTextModal(`Pontuação: ${score}\n+ ${parseInt(`${score/10}`) * 10} de Diversão 🦆`)
    }
  }, [score])

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ImageBackground
        source={require('@/assets/images/game-2/background_game2.png')}
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
            <Text style={styles.textTitle}>DUCK REVENGE</Text>
            <Image
              source={require("@/assets/images/game-2/duckhunt_dead.png")}
              style={{
                width: 74,
                height: 108,
                marginBottom: 200
              }}
              resizeMode="cover"
            />
            <ButtonYellow
              onPress={() => {
                setGameStarted(true);
                setScore(0);
                setTimeLeft(10);
                generateDogs(); // Gera os cachorros ao iniciar o jogo
              }}
              text="Jogar"
              width={147}
              height={40}
              buttonColor={ButtonColorEnum.Blue}
            />
            <Text style={styles.textDescription}>Tente acertar o máximo de DuckHunters que você conseguir!🦆</Text>
          </View>
        )}

        {gameStarted && (
          <>
            <View style={styles.time}>
              <Text style={styles.textTime}>
                Tempo: {timeLeft}s
              </Text>
            </View>
            <View style={styles.score}>
              <Text style={styles.textScore}>
                Pontuação: {score}
              </Text>
            </View>
          </>
        )}

        {duckHunters.map((dog) => (
          <TouchableOpacity
            key={dog.id}
            onPress={() => handleDogClick(dog.id)}
            style={{
              position: "absolute",
              width: 55,
              height: 44,
              top: dog.positionY,
              left: dog.positionX,
            }}
          >
            <Image
              source={hunterImage}
              style={{
                width: 55,
                height: 44,
                transform: [{ scaleX: dog.direction === 'left' ? -1 : 1 }] // Inverte a imagem se estiver indo para a esquerda
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}

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
    backgroundColor: "#6AD055 "
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
  },
  score: {
    position: "absolute",
    top: 100,
  },
  textScore: {
    fontSize: 18,
    fontFamily: 'supercell-font',
    color: "white",
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textAlign: "center"
  },
  textTitle: {
    fontSize: 30,
    fontFamily: 'supercell-font',
    color: "red",
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textAlign: "center"
  }
});

export default Game3;
