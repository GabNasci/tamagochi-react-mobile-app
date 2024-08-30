import BoxDuck from "@/components/BoxDuck";
import ButtonPlay from "@/components/ButtonPlay";
import ButtonYellow from "@/components/ButtonYellow";
import { useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateDuck = () => {

    const [duck, setDuck] = useState<string>('yellow')
    const [ducks, setDucks] = useState<string[]>(['yellow', 'mallard-duck', 'purple', 'green'])

    function getRandomDuck(ducks: string[], duck: string): string {
        const randomDuck = ducks[Math.floor(Math.random() * ducks.length)];
        if (duck === randomDuck) return getRandomDuck(ducks, duck);
        setDuck(randomDuck);
        return randomDuck;
    }
    
    function loopIndex(ducks: string[], duck: string): number {
        let index  = ducks.indexOf(duck)
        if(index === (ducks.length - 1)) return 0
        return index + 1;
    }
    function getAnotherDuck(ducks: string[], duck: string): string {
        const anotherDuck = ducks[loopIndex(ducks, duck)]
        return anotherDuck;
    }
    

    const handleChangeDuck = () => {
        setDuck(getAnotherDuck(ducks, duck))
    }





    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/background_create.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.text}>Pato</Text>
                    </View>
                    <View style={styles.phraseContainer}>
                        <ImageBackground
                            source={require('@/assets/images/talk-box.png')}
                            resizeMode="contain"
                            style={styles.phraseImage}
                        >
                            <Text style={styles.phraseText}>
                                Por outro lado, o fenômeno da Internet desafia a capacidade de equalização dos conhecimentos estratégicos para atingir a excelência.
                            </Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.duckBoxContainer}>
                        <BoxDuck duck={duck} width={180}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonYellow onPress={handleChangeDuck} text="mudar"/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonPlay link={'/listDucks'} text={duck}/>
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

    },
    phraseContainer: {
        flex: 1,
        alignItems: 'center',
    },
    duckBoxContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    phraseImage: {
        width: 350,
        height: 135,
        justifyContent: 'flex-start',
        padding: 22,
        alignItems: 'center',
    },
    boxImage: {
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    duckImage: {
        width: 120,
        height: 135,
    },
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        paddingVertical: 24,


    },
    text: {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 40,
    },
    phraseText: {
        fontFamily: 'supercell-font',
        color: "black",
        fontSize: 14,
    },
})

export default CreateDuck;