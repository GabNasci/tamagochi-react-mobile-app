import { DuckDatabase, DuckType, useDuckDatabase } from "@/database/useDuckDatabase";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, FlatList } from "react-native";
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
                source={require('@/assets/images/background_create.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <Text>Listagem de patos</Text>
                <Link href={'/duck/'}>Pato</Link>
                <FlatList 
                    data={ducks}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => <Text>{item.name}, {item.type}</Text>}
                />
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
})

export default ListDucks;