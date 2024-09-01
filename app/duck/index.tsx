import { StyleSheet, View } from "react-native";
import StatusDuck, { StatusDuckEnum } from "@/components/StatusDuck";

const Duck = () => {
    return (
        <View style={styles.container}>
            <StatusDuck nameStatus={StatusDuckEnum.Hunger} statusNumber={80} />
            <StatusDuck nameStatus={StatusDuckEnum.Joy} statusNumber={90} />
            <StatusDuck nameStatus={StatusDuckEnum.Sleep} statusNumber={50} />
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