import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import StatusDuck, { StatusDuckEnum } from "./StatusDuck";
import ButtonYellow, { ButtonColorEnum } from "./ButtonYellow";
import ButtonPlay from "./ButtonPlay";
import { DuckDatabase } from "@/database/useDuckDatabase";
import { Href, router } from "expo-router";

type CardDuckPagesProps = {
    duck: DuckDatabase,
    nameStatus: StatusDuckEnum,
    handleSleep?: () => {},
    link1?: Href<string | object>
    link2?: Href<string | object>
    link3?: Href<string | object>
}

const CardDuckPages = ({ duck, nameStatus, handleSleep, link1, link2, link3}: CardDuckPagesProps) => {
    const { imgBackground, heightBackground } = nameStatus === StatusDuckEnum.Hunger ?
        { imgBackground: require('@/assets/images/background/backgroundCardDuckPagesSmall.png'), heightBackground: 122 } :
        nameStatus === StatusDuckEnum.Joy ? 
        { imgBackground: require('@/assets/images/background/backgroundStatusMenu.png'), heightBackground: 300 } :
        { imgBackground: require('@/assets/images/background/backgroundCardDuckPages.png'), heightBackground: 220 }

    return (
        <ImageBackground
            source={imgBackground}
            style={[styles.container, { height: heightBackground }]}
            resizeMode="cover"
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
                        onPress={() => router.push(link1 ? link1 : "/duck/joy")}
                        text="É o voas"
                        width={160}
                        height={48}
                        buttonColor={ButtonColorEnum.Yellow}
                    />
                    <ButtonYellow
                        onPress={() => router.push(link2 ? link2 : "/duck/joy")}
                        text="É o rólas"
                        width={160}
                        height={48}
                        buttonColor={ButtonColorEnum.Orange}
                    />
                    <ButtonYellow
                        onPress={() => router.push(link3 ? link3 : "/duck/joy")}
                        text="É o vingas"
                        width={160}
                        height={48}
                        buttonColor={ButtonColorEnum.Blue}
                    />
                
                </View>
            ) : nameStatus === StatusDuckEnum.Sleep ? (
                <View style={styles.containerSleep}>
                    <ButtonYellow
                        onPress={handleSleep ? handleSleep : () => Alert.alert("Erro ao executar a função!")}
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