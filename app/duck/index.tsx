import { Link } from "expo-router";
import { Text, View } from "react-native";

const Duck = () => {
    return (
        <View>
            <Text>Duck page</Text>
            <Link href={"/listDucks"}>Voltar</Link>
        </View>
    );
}

export default Duck;