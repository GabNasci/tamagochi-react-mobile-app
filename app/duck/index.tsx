import { StyleSheet, View, Text, ImageBackground } from "react-native";
import StatusDuck, { StatusDuckEnum } from "@/components/StatusDuck";
import { Link, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalSearchParams } from "expo-router";
import { DuckDatabase, useDuckDatabase } from "@/database/useDuckDatabase";
import { useCallback, useEffect, useState } from "react";
import CardMenu from "@/components/CardMenu";
import DuckGif from "@/components/DuckGif";
import ModalCustom from "@/components/ModalCustom";

const Duck = () => {
    const duckDataBase = useDuckDatabase()
    const { id } = useGlobalSearchParams()
    const [duck, setDuck] = useState<DuckDatabase>()
    const [modalVisible, setModalVisible] = useState(false);

    const handleGetDuck = async (id: number) => {
        try {
            await duckDataBase.updateAtributesByTime()
            const response = await duckDataBase.findById(id)
            if (response) return setDuck(response)
            return setModalVisible(true)
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            handleGetDuck(Number(id))
        }, [duck])
    );

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
                        <DuckGif duck={duck.type} status={duck.status} width={140}/>
                    </View>
                ): (<View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Carregando...</Text>
                    </View>
                    )
                }
                <ModalCustom
                    visible={modalVisible}
                    title='Alerta'
                    text='Não foi possível encontrar o pato 🦆!'
                    onClose={
                        () => setModalVisible(false)
                    }
                />
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