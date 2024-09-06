import { StyleSheet, View, Text, ImageBackground, Alert } from "react-native";
import StatusDuck, { StatusDuckEnum } from "@/components/StatusDuck";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalSearchParams } from "expo-router";
import { DuckDatabase, useDuckDatabase } from "@/database/useDuckDatabase";
import { useEffect, useState } from "react";
import CardMenu from "@/components/CardMenu";
import DuckGif from "@/components/DuckGif";

const Duck = () => {
    const duckDataBase = useDuckDatabase()
    const { id } = useGlobalSearchParams()
    const [duck, setDuck] = useState<DuckDatabase>()

    const handleGetDuck = async (id: number) => {
        try {
            const response = await duckDataBase.findById(id)
            if (response) return setDuck(response)
            return Alert.alert("Pato não encontrado!")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetDuck(Number(id))
    }, [duck])

    return (
        <View style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/background_duck.png')}
                resizeMode="cover"
                style={styles.image}
            >
                {duck ? (
                    <View style={styles.mainContainer}>
                        <CardMenu duck={duck} />
                        <DuckGif duck={duck.type} width={140}/>
                    </View>
                ): (<View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Carregando...</Text>
                    </View>
                    )
                }


            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "grey"
    },
    image: {
        flex: 1,
        padding: 40,
        alignItems: "center"
    },
    mainContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText : {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 40,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    }
})

export default Duck;