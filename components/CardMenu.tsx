import { ImageBackground, StyleSheet, Text, View } from "react-native";
import StatusDuck, { StatusDuckEnum } from "./StatusDuck";
import { DuckDatabase } from "@/database/useDuckDatabase";

type StatusDuckProps = {
    duck: DuckDatabase,
}

const CardMenu = ({ duck }: StatusDuckProps) => {
    return (
        <ImageBackground
            source={require('@/assets/images/background/backgroundStatusMenu.png')}
            style={styles.container}
        >
            <Text style={[styles.text, styles.textTitles]}>{duck.name}</Text>
            <Text style={[styles.text, styles.subTitles]}>{duck.status}</Text>
            <View style={styles.containerStatusDuck}>
                <StatusDuck nameStatus={StatusDuckEnum.Hunger} statusNumber={duck.hungry} />
                <StatusDuck nameStatus={StatusDuckEnum.Joy} statusNumber={duck.joy} />
                <StatusDuck nameStatus={StatusDuckEnum.Sleep} statusNumber={duck.sleep} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 259,
        height: 265,
        alignItems: "center",
    },
    containerStatusDuck: {
        marginTop: 30,
        gap: 20,
    },
    text: {
        fontFamily: 'supercell-font',
        color: "white",
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    textTitles: {
        marginTop: 8,
        fontSize: 32
    },
    subTitles: {
        fontSize: 16,
        color: '#b2b2b2'
    },
})

export default CardMenu;