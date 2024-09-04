import { ImageBackground, StyleSheet, Text, View } from "react-native";
import StatusDuck, { StatusDuckEnum } from "./StatusDuck";
import BoxDuck from "./BoxDuck";
import { DuckDatabase } from "@/database/useDuckDatabase";

type CardDuckProps = {
    duck: DuckDatabase
}

const CardDuck = ({ duck }: CardDuckProps) => {
    return (
        <ImageBackground
            source={require('@/assets/images/background/backgroundCardDuck.png')}
            style={styles.container}
        >
            <View style={styles.containerDuck}>
                <BoxDuck duck={duck.type} width={117} />
                <Text style={[styles.text, styles.subTitles]}>{"lal"}</Text>
            </View>
            <View style={styles.containerDuckInfo}>
                <Text style={[styles.text, styles.textTitles]}>{duck.name}</Text>
                <View style={styles.containerStatusDuck}>
                    <StatusDuck nameStatus={StatusDuckEnum.Hunger} statusNumber={duck.hungry} />
                    <StatusDuck nameStatus={StatusDuckEnum.Joy} statusNumber={duck.joy} />
                    <StatusDuck nameStatus={StatusDuckEnum.Sleep} statusNumber={duck.sleep} />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 345,
        height: 192,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    containerDuck: {
        marginLeft: 5,
        marginTop: 10,
        alignItems: "center",
    },
    containerDuckInfo: {
        alignItems: "center",
    },
    containerStatusDuck: {
        marginTop: 15,
        marginRight: 10,
        gap: 10,
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
        fontSize: 26
    },
    subTitles: {
        fontSize: 16,
    },
})

export default CardDuck;