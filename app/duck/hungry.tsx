import BoxHungry from "@/components/BoxHungry";
import CardDuckPages from "@/components/CardDuckPages";
import DuckGif from "@/components/DuckGif";
import ModalCustom from "@/components/ModalCustom";
import { StatusDuckEnum } from "@/components/StatusDuck";
import { DuckDatabase, useDuckDatabase } from "@/database/useDuckDatabase";
import { Link, useFocusEffect, useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";

const Hungry = () => {

    const duckDataBase = useDuckDatabase()
    const { id } = useGlobalSearchParams()
    const [duck, setDuck] = useState<DuckDatabase>()
    const [animation, setAnimation] = useState<string>("")
    const [modalVisible, setModalVisible] = useState(false);

    const handleEat = async ()=> {
        try {
            const updatedDuck = await duckDataBase.findById(Number(id))
            
            if(!updatedDuck) return Alert.alert("Não foi possível encontrar o pato!")
            if(updatedDuck.hungry >= 100) {
                setAnimation("nope")
                setTimeout(() => setAnimation(""), 2000)
                return Alert.alert("O pato comeu demais.")
            }
            await duckDataBase.updateAtributes({
                hungry: updatedDuck.hungry + 10,
                joy: updatedDuck.joy,
                sleep: updatedDuck.sleep,
                id: updatedDuck.id
            })
            
        } catch (error) {
            console.log(error)
        }

    }
    

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
                source={require('@/assets/images/background_hungry.png')}
                resizeMode="cover"
                style={styles.image}
            >
                {duck ? (
                    <>
                        <View style={styles.mainContainer}>
                            <CardDuckPages duck={duck} nameStatus={StatusDuckEnum.Hunger} />
                            <DuckGif duck={duck.type} width={140} status={duck.status} action={animation} />
                        </View>
                        <View style={styles.boxHungry}>
                            <BoxHungry onPress={handleEat}/>
                        </View>
                    </>
                ) : (<View style={styles.loadingContainer}>
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
        padding: 20,
        alignItems: "center"
    },
    mainContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    duckContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    boxHungry: {
        paddingRight: 16,
        paddingBottom: 16,
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 40,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    }
})

export default Hungry;
