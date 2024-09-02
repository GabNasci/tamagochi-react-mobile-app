import { StyleSheet, View } from "react-native";
import CardDuckPages from "@/components/CardDuckPages";
import { StatusDuckEnum } from "@/components/StatusDuck";

const Duck = () => {
    return (
        <View style={styles.container}>
            <CardDuckPages nameDuck="Juninho" nameStatus={StatusDuckEnum.Hunger} />
            <CardDuckPages nameDuck="Juninho" nameStatus={StatusDuckEnum.Joy} />
            <CardDuckPages nameDuck="Juninho" nameStatus={StatusDuckEnum.Sleep} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: '#999',
        height: 1000,
        gap: 20,
    }
})

export default Duck;