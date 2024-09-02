import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import ButtonPlay from "@/components/ButtonPlay";
import { useState } from "react";
import { Link } from "expo-router";


const Play = () => {

    const [fontsLoaded] = useFonts({
        'supercell-font': require('@/assets/fonts/supercell-magic.ttf'),
    });

    if(!fontsLoaded) {
        return <Text>Carregando...</Text>
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/background/background_play.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.text}>Pato</Text>
                    </View>
                    <View style={styles.playContainer}>
                        <ButtonPlay link={'/createDuck'} text="Jogar"/>
                        
                        <View style={styles.patoContainer}>
                            <Image
                                source={require('@/assets/images/pato-marelo/yellow-pose-animation.gif')}
                                style={styles.patoImage}
                            />
                            <Text style={styles.creditsText}>Desenvolvido por LAL®</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "grey"
    },

    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 32

    },
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',


    },
    playContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 60
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    patoImage: {
        width: 120,
        height: 135,

    },
    text: {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 40,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    creditsText: {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 15,
        
    },
    patoContainer: {
        gap: 40,
        justifyContent: "flex-end",
        paddingBottom: 20,
    }
})

export default Play;