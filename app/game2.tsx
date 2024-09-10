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
  direction: 'left' | 'right'
}

const Game2 = () => {
  const { id } = useGlobalSearchParams();


  const handleBack = () => {
    router.push({
      pathname: "/duck/joy",
      params: { id: id }
    });
  };


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

export default Game2;
