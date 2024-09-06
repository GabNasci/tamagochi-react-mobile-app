import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HeaderProps = {
    title: string
}

const Header = ({title}: HeaderProps) => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Link style={styles.button} href={"/listDucks"}>Voltar</Link>
                <Text style={styles.title}>{title}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        backgroundColor: "gray"
    },
    container: {
        height: 80,
        justifyContent: "center",
        backgroundColor: "#132646"
    },
    title: {
        alignSelf: "center",
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 30,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    button: {
        alignSelf: "flex-start",
        marginLeft: 10,
        padding: 10,
        position: "absolute",
        backgroundColor: "cyan",
        fontFamily: 'supercell-font',
        color: "white",
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        borderRadius: 8
    }
})

export default Header;