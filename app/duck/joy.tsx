import { Link } from "expo-router";
import { Text, View } from "react-native";

const Joy = () => {
    return (
        <View>
            <Text>Joy page</Text>
            <Link href={"/listDucks"}>Voltar</Link>
        </View>
    );
}

export default Joy;