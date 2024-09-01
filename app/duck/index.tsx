import { StyleSheet, View, Text } from "react-native";
import StatusDuck, { StatusDuckEnum } from "@/components/StatusDuck";
import { Link } from "expo-router";

const Duck = () => {
    return (
        <View>
            <Text>Duck page</Text>
            <StatusDuck nameStatus={StatusDuckEnum.Hunger} statusNumber={80} />
            <StatusDuck nameStatus={StatusDuckEnum.Joy} statusNumber={90} />
            <StatusDuck nameStatus={StatusDuckEnum.Sleep} statusNumber={50} />
            <Link href={"/listDucks"}>Voltar</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "auto",
        height: 1000,
        backgroundColor: '#132646',
    }
})

export default Duck;