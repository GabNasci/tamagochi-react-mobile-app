import StatusDuck, { StatusDuckEnum } from "@/components/StatusDuck";
import { Link } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const Hungry = () => {
    return (
        <View style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/background_hungry.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <Text>Hungry page</Text>
                <StatusDuck nameStatus={StatusDuckEnum.Hunger} statusNumber={80} />
                <StatusDuck nameStatus={StatusDuckEnum.Joy} statusNumber={90} />
                <StatusDuck nameStatus={StatusDuckEnum.Sleep} statusNumber={50} />
                <Link href={"/listDucks"}>Voltar</Link>
            </ImageBackground>
        </View>
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

export default Hungry;