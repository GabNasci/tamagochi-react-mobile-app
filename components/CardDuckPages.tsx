import { ImageBackground, StyleSheet, Text, View } from "react-native";
import StatusDuck, { StatusDuckEnum } from "./StatusDuck";
import ButtonYellow, { ButtonColorEnum } from "./ButtonYellow";
import ButtonPlay from "./ButtonPlay";
import { DuckDatabase } from "@/database/useDuckDatabase";

type CardDuckPagesProps = {
    duck: DuckDatabase,
    nameStatus: StatusDuckEnum
}

const CardDuckPages = ({ duck, nameStatus }: CardDuckPagesProps) => {
    const { imgBackground, heightBackground } = nameStatus === StatusDuckEnum.Hunger ?
        { imgBackground: require('@/assets/images/background/backgroundCardDuckPagesSmall.png'), heightBackground: 122 } :
        { imgBackground: require('@/assets/images/background/backgroundCardDuckPages.png'), heightBackground: 220 }

    return (
        <ImageBackground
            source={imgBackground}
            style={[styles.container, { height: heightBackground }]}
        >
            <Text style={styles.text}>{duck.name}</Text>
            {  nameStatus === StatusDuckEnum.Joy ? (
                <StatusDuck nameStatus={nameStatus} statusNumber={duck.joy} />
            ): nameStatus === StatusDuckEnum.Sleep ? (
                <StatusDuck nameStatus={nameStatus} statusNumber={duck.sleep} />
            ): nameStatus === StatusDuckEnum.Hunger ? (
                <StatusDuck nameStatus={nameStatus} statusNumber={duck.hungry} />
            ): <></>}

            {nameStatus === StatusDuckEnum.Joy ? (
                
                <View style={styles.containerJoy}>
                    <ButtonYellow
                        onPress={() => console.log('Jogo 01')}
                        text="Jogo 01"
                        width={147}
                        height={40}
                        buttonColor={ButtonColorEnum.Yellow}
                    />
                    <ButtonYellow
                        onPress={() => console.log('Jogo 02')}
                        text="Jogo 02"
                        width={147}
                        height={40}
                        buttonColor={ButtonColorEnum.Orange}
                    />
                </View>
            ) : nameStatus === StatusDuckEnum.Sleep ? (
                <View style={styles.containerSleep}>
                    <ButtonYellow
                        onPress={() => console.log('Dormir')}
                        text="Dormir"
                        width={147}
                        height={40}
                        buttonColor={ButtonColorEnum.Yellow}
                    />
                </View>
            ) : <></>}

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 290,
        alignItems: "center",
        gap: 20,
        paddingTop: 10,
    },
    containerJoy: {
        gap: 8,
    },
    containerSleep: {
        marginTop: 25
    },
    text: {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 32,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
})

export default CardDuckPages;