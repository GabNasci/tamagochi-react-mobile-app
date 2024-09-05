import { ImageBackground, StyleSheet, Text, View } from "react-native";
import StatusDuck, { StatusDuckEnum } from "./StatusDuck";
import { DuckDatabase } from "@/database/useDuckDatabase";
import { useCallback, useEffect, useState } from "react";

type StatusDuckProps = {
    duck: DuckDatabase,
}

const CardMenu = ({ duck }: StatusDuckProps) => {

    const [statusName, setStatusName] = useState<string>("")

    const getStatusName = useCallback(() => {
        if (duck.status !== undefined) {
            if (duck.status === 0) {
                setStatusName("Morto");
            } else if (duck.status >= 1 && duck.status <= 50) {
                setStatusName("Crítico");
            } else if (duck.status >= 51 && duck.status <= 100) {
                setStatusName("Muito Triste");
            } else if (duck.status >= 101 && duck.status <= 150) {
                setStatusName("Triste");
            } else if (duck.status >= 151 && duck.status <= 200) {
                setStatusName("Ok");
            } else if (duck.status >= 201 && duck.status <= 250) {
                setStatusName("Bem");
            } else if (duck.status >= 251 && duck.status <= 300) {
                setStatusName("Muito Bem");
            }
        }
    }, [duck]);

    useEffect(() => {
        getStatusName();
    }, [getStatusName]);




    return (
        <ImageBackground
            source={require('@/assets/images/background/backgroundStatusMenu.png')}
            style={styles.container}
        >
            <Text style={[styles.text, styles.textTitles]}>{duck.name}</Text>
            <Text style={[styles.text, styles.subTitles]}>{statusName}</Text>
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