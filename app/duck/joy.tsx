import CardDuckPages from "@/components/CardDuckPages";
import DuckGif from "@/components/DuckGif";
import ModalCustom from "@/components/ModalCustom";
import StatusDuck, { StatusDuckEnum } from "@/components/StatusDuck";
import { DuckDatabase, useDuckDatabase } from "@/database/useDuckDatabase";
import { Link, router, useFocusEffect, useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const Joy = () => {
    const duckDataBase = useDuckDatabase()
    const {id} = useGlobalSearchParams()
    const [duck, setDuck] = useState<DuckDatabase>()
    const [modalVisible, setModalVisible] = useState(false);
    const [textModal, setTextModal] = useState('');

    const handleJoy = async (gameNumber: number)=> {
        try {
            const updatedDuck = await duckDataBase.findById(Number(id))
            
            if(!updatedDuck) {
                setTextModal('Não foi possível encontrar o pato 🦆!')
                return setModalVisible(true)
            }
            if (updatedDuck.sleep >= 100) {
                setTextModal('O pato 🦆 já brincou demais.')
                return setModalVisible(true)
            }
            await duckDataBase.updateAtributes({
                hungry: updatedDuck.hungry,
                joy: updatedDuck.joy + 10,
                sleep: updatedDuck.sleep,
                id: updatedDuck.id
            })
            router.push({ pathname: gameNumber === 1 ? "/game1" : "/game2", params: { id: id } })
            
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
            console.log("erro aqui:" + error)
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
                source={require('@/assets/images/background_joy.png')}
                resizeMode="cover"
                style={styles.image}
            >
                {duck ? (
                    <View style={styles.mainContainer}>
                        <CardDuckPages handleGame1={() => handleJoy(1)} handleGame2={() => handleJoy(2)} duck={duck} nameStatus={StatusDuckEnum.Joy}/>
                        <DuckGif duck={duck.type} width={140} status={duck.status} inverted={true}/>
                    </View>
                ): (<View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Carregando...</Text>
                    </View>
                    )
                }
                <ModalCustom
                    visible={modalVisible}
                    title='Alerta'
                    text='Não foi possível encontrar o pato 🦆! '
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
        alignItems: "flex-end",
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

export default Joy;