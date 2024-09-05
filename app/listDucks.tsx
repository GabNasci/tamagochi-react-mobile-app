import BoxDuck from "@/components/BoxDuck";
import CardDuck from "@/components/CardDuck";
import { DuckDatabase, DuckType, useDuckDatabase } from "@/database/useDuckDatabase";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, FlatList, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ListDucks = () => {


    const duckDatabase = useDuckDatabase()
    const [ducks, setDucks] = useState<DuckDatabase[]>([])


    const getAllDucks = async () => {

        try {
            const response = await duckDatabase.getAll()
            setDucks(response)

        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        getAllDucks()
    }, [ducks])

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/background/background_create.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                            <Text style={styles.text}>Os Patos</Text>
                        </View>
                    <FlatList 
                        data={ducks}
                        keyExtractor={item => String(item.id)}
                        renderItem={({item}) => <CardDuck duck={item}/>}
                    />
                    <View style={{padding: 40}}>
                        <Button onPress={() => router.push("/createDuck")} title="Criar"></Button>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "grey"
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        paddingVertical: 24,


    },
    text: {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 40,
    },

})

export default ListDucks;