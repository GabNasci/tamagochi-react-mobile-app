import CardDuckPages from "@/components/CardDuckPages";
import DuckGif from "@/components/DuckGif";
import StatusDuck, { StatusDuckEnum } from "@/components/StatusDuck";
import { DuckDatabase, useDuckDatabase } from "@/database/useDuckDatabase";
import { Link, useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";

const Sleep = () => {
    const duckDataBase = useDuckDatabase()
    const {id} = useGlobalSearchParams()
    const [duck, setDuck] = useState<DuckDatabase>()

    const handleGetDuck = async (id: number) => {
        try {
            const response = await duckDataBase.findById(id)
            if(response) return setDuck(response)
            return Alert.alert("Pato não encontrado!")
        } catch (error) {
            console.log(error)
        }
    }

    const handleSleep = useCallback(async ()=> {
        try {
            const updatedDuck = await duckDataBase.findById(Number(id))
            if(!updatedDuck) return Alert.alert("Não foi possível encontrar o pato!")
            const response = await duckDataBase.updadteAtributes({
                hungry: updatedDuck.hungry,
                joy: updatedDuck.joy,
                sleep: updatedDuck.sleep - 10,
                updated_at: updatedDuck.updated_at,
                id: updatedDuck.id
            })
        } catch (error) {
            console.log(error)
        }

    }, [duck])

    useEffect(() => {
        handleGetDuck(Number(id))
    }, [handleGetDuck])




    return (
        <View style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/background_sleep.png')}
                resizeMode="cover"
                style={styles.image}
            >
                {/* <Text style={styles.text}>{duck.updated_at}</Text> */}
                {duck ? (
                    <View style={styles.mainContainer}>
                        <CardDuckPages duck={duck} handleSleep={handleSleep} nameStatus={StatusDuckEnum.Sleep}/>
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
        padding: 20,
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
    },
    text: {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 10,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    }
})

export default Sleep;