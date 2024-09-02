import { ImageBackground, StyleSheet, Text, View } from "react-native";
import StatusDuck, { StatusDuckEnum } from "./StatusDuck";

type StatusDuckProps = {
    nameDuck: string,
    messageStatus: string,
}

const CardMenu = ({ nameDuck, messageStatus, }: StatusDuckProps) => {
    return (
        <ImageBackground
            source={require('@/assets/images/background/backgroundStatusMenu.png')}
            style={styles.container}
        >
            <Text style={[styles.text, styles.textTitles]}>{nameDuck}</Text>
            <Text style={[styles.text, styles.subTitles]}>{messageStatus}</Text>
            <View style={styles.containerStatusDuck}>
                <StatusDuck nameStatus={StatusDuckEnum.Hunger} statusNumber={80} />
                <StatusDuck nameStatus={StatusDuckEnum.Joy} statusNumber={90} />
                <StatusDuck nameStatus={StatusDuckEnum.Sleep} statusNumber={50} />
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