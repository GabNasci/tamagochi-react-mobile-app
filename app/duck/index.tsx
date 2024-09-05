import { StyleSheet, View, Text, ImageBackground } from "react-native";
import StatusDuck, { StatusDuckEnum } from "@/components/StatusDuck";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const Duck = () => {

    const {id} = useLocalSearchParams()

    return (
        <View style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/background_duck.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <Text>Duck page</Text>
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

export default Duck;