import CardDuckPages from "@/components/CardDuckPages";
import DuckGif from "@/components/DuckGif";
import ModalCustom from "@/components/ModalCustom";
import StatusDuck, { StatusDuckEnum } from "@/components/StatusDuck";
import { DuckDatabase, useDuckDatabase } from "@/database/useDuckDatabase";
import { Link, useFocusEffect, useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const Sleep = () => {
    const duckDataBase = useDuckDatabase()
    const {id} = useGlobalSearchParams()
    const [duck, setDuck] = useState<DuckDatabase>()
    const [animation, setAnimation] = useState<string>("")
    const [modalVisible, setModalVisible] = useState(false);
    const [textModal, setTextModal] = useState('');

    const handleSleep = async ()=> {
        try {
            const updatedDuck = await duckDataBase.findById(Number(id))
            
            if(!updatedDuck) {
                setTextModal('Não foi possível encontrar o pato 🦆!')
                return setModalVisible(true)
            }
            if (updatedDuck.sleep >= 100) {
                setTextModal('O pato 🦆 já dormiu demais.')
                return setModalVisible(true)
            }
            console.log(updatedDuck.sleep)
            await duckDataBase.updateAtributes({
                hungry: updatedDuck.hungry,
                joy: updatedDuck.joy,
                sleep: updatedDuck.sleep + 10,
                id: updatedDuck.id
            })
            setTimeout(() => setAnimation(""), 3000)
            
        } catch (error) {
            console.log(error)
        }

    }

    const handleGetDuck = async (id: number) => {
        try {
            await duckDataBase.updateAtributesByTime()
            const response = await duckDataBase.findById(id)
            if (response) return setDuck(response)
            setTextModal('Não foi possível encontrar o pato 🦆!')
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
                source={require('@/assets/images/background_sleep.png')}
                resizeMode="cover"
                style={styles.image}
            >
                {duck ? (
                    <View style={styles.mainContainer}>
                        <CardDuckPages duck={duck} handleSleep={handleSleep} nameStatus={StatusDuckEnum.Sleep}/>
                        <DuckGif duck={duck.type} status={duck.status} width={140} action={animation}/>
                    </View>
                ): (<View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Carregando...</Text>
                    </View>
                    )
                }
            </ImageBackground>
            <ModalCustom
                visible={modalVisible}
                title='Alerta'
                text={textModal}
                onClose={
                    () => setModalVisible(false)
                }
            />
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