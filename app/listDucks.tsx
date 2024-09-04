import { Link } from "expo-router";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ListDucks = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/background/background_create.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <Text>Listagem de patos</Text>
                <Link href={'/duck/'}>Pato</Link>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "grey"
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
})

export default ListDucks;