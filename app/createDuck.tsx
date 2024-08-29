import ButtonPlay from "@/components/ButtonPlay";
import ButtonYellow from "@/components/ButtonYellow";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateDuck = () => {
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
                        <ImageBackground
                            source={require('@/assets/images/duck-box.png')}
                            resizeMode="cover"
                            style={styles.boxImage}
                        >
                            <Image
                                source={require('@/assets/images/pato-marelo/yellow-pose-animation.gif')}
                                style={styles.duckImage}
                            />
                        </ImageBackground>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonYellow text="mudar"/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonPlay link={'/listDucks'} text={'Confirmar'}/>
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