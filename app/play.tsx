import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "white"
    },

    container: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
})

const image = { uri: '../../../assets/images/background_play.png' }

const play = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.container}>
                    <Text>Lal</Text>
                </View>
            </ImageBackground>

        </SafeAreaView>
    );
}

export default play;