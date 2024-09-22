import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { diceImages } from '@/mock';
import DuckGif from '@/components/DuckGif';
import { DuckDatabase, useDuckDatabase } from '@/database/useDuckDatabase';
import { router, useFocusEffect, useGlobalSearchParams } from 'expo-router';
import ModalCustom from '@/components/ModalCustom';
import ButtonYellow, { ButtonColorEnum } from '@/components/ButtonYellow';

const Game2 = () => {
  const duckDataBase = useDuckDatabase()
  const { id } = useGlobalSearchParams()
  const [duck, setDuck] = useState<DuckDatabase>()
  const [modalVisible, setModalVisible] = useState(false);
  const [textModal, setTextModal] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [diceNumber, setDiceNumber] = useState(0);
  const [diceDuckNumber, setDiceDuckNumber] = useState(0);
  const [wasRolled, setWasRolled] = useState(false);


  const handleBack = () => {
    router.push({
        pathname: "/duck/joy",
        params: { id: id }
    });
    Accelerometer.removeAllListeners();
    setModalVisible(false);
    setDiceNumber(0);
    setDiceDuckNumber(0);
    setWasRolled(false);
};

  const handleGetDuck = async (id: number) => {
    try {
      await duckDataBase.updateAtributesByTime()
      const response = await duckDataBase.findById(id)
      if (response) return setDuck(response)
      setTitleModal('Alerta')
      setTextModal('Não foi possível encontrar o pato 🦆!')
      return setModalVisible(true)

    } catch (error) {
      console.log(error)
    }
  }

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

  useFocusEffect(
    useCallback(() => {
      handleGetDuck(Number(id))
    }, [duck])
  );

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });


  useEffect(() => {
    if (!wasRolled) {
      Accelerometer.setUpdateInterval(1500);

      const subscription = Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
        checkForShake(accelerometerData);
      });

      rollDiceDuck();

      return () => subscription && subscription.remove();
    }
  }, [wasRolled]);

  const checkForShake = ({ x, y, z }: any) => {
    const shakeThreshold = 1.5;
    const totalForce = Math.abs(x) + Math.abs(y) + Math.abs(z);

    if (totalForce > shakeThreshold && !wasRolled) {
      rollDice();
    }
  };

  const rollDice = () => {
    if (!wasRolled) {
      const newDiceNumber = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(7)
      setTimeout(() => {
        setDiceNumber(newDiceNumber);
        setWasRolled(true);
      }, 3000);
    }
  };

  const rollDiceDuck = () => {
    const newDiceDuckNumber = Math.floor(Math.random() * 6) + 1;
    setDiceDuckNumber(7)
    setTimeout(() => {
      setDiceDuckNumber(newDiceDuckNumber);
    }, 2000)
  };

  const checkWinner = (dice: number, duckDice: number) => {
    Accelerometer.removeAllListeners()
    const scoreboard = `Vc ${diceNumber} X ${diceDuckNumber} 🦆\n\n`
    if (dice > duckDice) {
      handleJoy(10);
      if (modalVisible === false) setModalVisible(true);
      setTitleModal('Você ganhou! 🎉');
      setTextModal(`${scoreboard} Diversão + 10`);

    } else if (dice < duckDice) {
      handleJoy(20);
      if (modalVisible === false) setModalVisible(true);
      setTitleModal('O pato ganhou! 🦆🎉');
      setTextModal(`${scoreboard} Diversão + 20`);


    } else if (dice === duckDice) {
      if (modalVisible === false) setModalVisible(true);
      setTitleModal('Empate!');
      setTextModal(`${scoreboard}Tente novamente para ver quem vence!`);


    }
    setWasRolled(true);
  };


  useEffect(() => {
    if (!wasRolled && diceNumber !== 0 && diceDuckNumber !== 0 && diceNumber !== 7 && diceDuckNumber !== 7) {

      checkWinner(diceNumber, diceDuckNumber);
    }
  }, [wasRolled, diceDuckNumber, diceNumber])


  const restGame = () => {
    setModalVisible(false);
    setDiceNumber(0);
    setDiceDuckNumber(0);
    setWasRolled(false);
  }

  return (
    <View style={styles.safeAreaContainer}>
      <View
        style={styles.image}
      >
        {duck ? (
          <View style={styles.mainContainer} >
            <Text style={[styles.text, styles.title]} >
              Disputas de dados
            </Text>
            <Text style={[styles.text, styles.subTitle]} >
              Tende ganhar do seu pato 🦆 para ver quem tira o maior numero no dado
            </Text>
            <View style={{ marginTop: 10 }}>
              <ButtonYellow
                onPress={handleBack}
                text="Voltar"
                width={147}
                height={40}
                buttonColor={ButtonColorEnum.Orange}
              />
            </View>
            <View style={styles.containerDice} >
              <Image
                source={diceImages[diceNumber]}
                style={{ width: 100, height: 100 }}
              />
            </View>
            <View style={styles.containerDuck} >
              <View style={styles.containerDiceDuck} >
                <Image
                  source={diceImages[diceDuckNumber]}
                  style={{ width: 100, height: 100 }}
                />
              </View>
              <DuckGif
                duck={duck.type}
                width={140}
                status={duck.status}
                inverted={true}
              />
            </View>
          </View>
        ) : (
          <View style={styles.loadingContainer} >
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        )}
        <ModalCustom
          visible={modalVisible}
          title={titleModal}
          text={textModal}
          onClose={restGame}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#132646'
  },
  image: {
    flex: 1,
    padding: 20,
    alignItems: "center"
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
  },
  containerDice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerDuck: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDiceDuck: {
    marginRight: 40
  },
  text: {
    fontFamily: 'supercell-font',
    color: "white",
  },
  title: {
    fontSize: 40,
    marginTop: 50,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    fontFamily: 'supercell-font',
    color: "white",
    fontSize: 40,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  }
})

export default Game2;
