import ButtonYellow, { ButtonColorEnum } from "@/components/ButtonYellow";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const Game2 = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text>Game 2</Text>
                <ButtonYellow
                                onPress={() => router.back()}
                                text="Voltar"
                                width={147}
                                height={40}
                                buttonColor={ButtonColorEnum.Blue}
                            />
            </View>
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
})

export default Game2;