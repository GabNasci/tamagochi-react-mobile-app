import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';




const play = () => {

    const [fontsLoaded] = useFonts({
        'supercell-font': require('@/assets/fonts/supercell-magic.ttf'),
        // Adicione outras fontes aqui
    });



    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ImageBackground source={require('@/assets/images/background_play.png')} resizeMode="cover" style={styles.image}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.text}>Pato</Text>
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
        flexDirection: "row",
        justifyContent: 'center',
        paddingHorizontal: 32

    },
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        paddingVertical: 130

    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 40,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    }
})

export default play;