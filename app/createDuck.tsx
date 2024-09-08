import BoxDuck from "@/components/BoxDuck";
import ButtonYellow, { ButtonColorEnum } from "@/components/ButtonYellow";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { generate, developerSentences } from "@/lerolero/index";
import { useDuckDatabase } from "@/database/useDuckDatabase"
import { router } from "expo-router";

const CreateDuck = () => {
    const [saveLerolero, setLerolero] = useState<string>(generate(developerSentences))
    const [duck, setDuck] = useState<string>('yellow')
    const [ducks, setDucks] = useState<string[]>(['yellow', 'mallard-duck', 'purple', 'green'])
    const [name, setName] = useState('')
    const [duckExists, setDuckExists] = useState(false)


    const duckDatabase = useDuckDatabase()

    function loopIndex(ducks: string[], duck: string): number {
        let index = ducks.indexOf(duck)
        if (index === (ducks.length - 1)) return 0
        return index + 1;
    }

    function getAnotherDuck(ducks: string[], duck: string): string {
        const anotherDuck = ducks[loopIndex(ducks, duck)]
        return anotherDuck;
    }

    const handleChangeDuck = () => {
        setDuck(getAnotherDuck(ducks, duck))
        setLerolero(generate(developerSentences))
    }

    const handleDuckExists = async () => {
        try {
            const response = await duckDatabase.findFirst()
            if (response) return setDuckExists(true)

        } catch (error) {
            throw error
        }
    }


    const handleCreateDuck = async () => {

        try {
            if (name === "") return Alert.alert("O nome precisa ser preenchido!")

            const response = await duckDatabase.create({
                name: name,
                type: duck,
                hungry: 100,
                sleep: 100,
                joy: 100
            })

            Alert.alert("Pato cadastrado!")
            router.push("/listDucks")


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        handleDuckExists()
    }, [])


    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('@/assets/images/background/background_create.png')}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.text}>Pato</Text>
                    </View>
                    <View style={styles.phraseContainer}>
                        <ImageBackground
                            source={require('@/assets/images/talk-box.png')}
                            resizeMode="contain"
                            style={styles.phraseImage}
                        >
                            <Text style={styles.phraseText}>
                                {saveLerolero}
                            </Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.duckBoxContainer}>
                        <BoxDuck duck={duck} width={180} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonYellow
                            onPress={handleChangeDuck}
                            text="mudar"
                            width={180}
                            height={50}
                            buttonColor={ButtonColorEnum.Yellow}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <ImageBackground
                            source={require('@/assets/images/text-input.png')}
                            resizeMode="cover"
                            style={styles.textInputBackground}
                        >
                            <TextInput
                                style={styles.textInput}
                                onChangeText={newName => setName(newName)}
                                value={name}
                                placeholder="Nome..."
                                placeholderTextColor={"white"}

                            />
                        </ImageBackground>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonYellow
                            onPress={handleCreateDuck}
                            text="Confirmar"
                            width={200}
                            height={60}
                            buttonColor={ButtonColorEnum.Orange}
                        />
                        {duckExists && (
                            <ButtonYellow
                                onPress={() => router.back()}
                                text="Voltar"
                                width={147}
                                height={40}
                                buttonColor={ButtonColorEnum.Blue}
                            />
                        )}

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

    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignContent: 'center',

    },
    phraseContainer: {
        alignItems: 'center',
    },
    duckBoxContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    phraseImage: {
        width: 350,
        height: 135,
        justifyContent: 'flex-start',
        padding: 22,
        alignItems: 'center',
    },
    boxImage: {
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    duckImage: {
        width: 120,
        height: 135,
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
    phraseText: {
        fontFamily: 'supercell-font',
        color: "black",
        fontSize: 14,
    },
    inputContainer: {
        alignItems: "center",
        padding: 20
    },
    textInputBackground: {
        width: 300,  // Defina a largura do background
        height: 50,  // Defina a altura do background
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingBottom: 5
    },
    textInput: {
        flex: 1, // Ocupa todo o espaço disponível dentro do ImageBackground
        color: "white", // Cor do texto
        backgroundColor: 'transparent', // Remove o fundo padrão do TextInput
        fontSize: 16, // Tamanho do texto
        fontFamily: 'supercell-font'

    },
})

export default CreateDuck;