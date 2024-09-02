import { Link, Tabs } from "expo-router";
import { Button, Image, StyleSheet, View } from "react-native";

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {backgroundColor: "#40495A", height: 80},
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: "Pato",
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <Link href={"/listDucks"}>Voltar</Link>
                    ),
                    tabBarLabel: 'Home',
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        if(focused) return <Image style={styles.IconSelected} resizeMode="cover" source={require('@/assets/images/navbar-icons/rubber_duck-selected.png')}/>
                        return <Image style={styles.IconUnselected} resizeMode="cover" source={require('@/assets/images/navbar-icons/rubber_duck.png')}/>
                    },
                }}
            />
            <Tabs.Screen
                name="hungry"
                options={{
                    headerTitle: "Fome",
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <Link href={"/listDucks"}>Voltar</Link>
                    ),
                    tabBarLabel: 'Hungry',
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        if(focused) return <Image style={styles.IconSelected} resizeMode="cover" source={require('@/assets/images/navbar-icons/potatochip_green-selected.png')}/>
                        return <Image style={styles.IconUnselected} resizeMode="cover" source={require('@/assets/images/navbar-icons/potatochip_green.png')}/>
                    },
                }}
                
            />
            <Tabs.Screen
                name="joy"
                options={{
                    headerTitle: "Diversão",
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <Link href={"/listDucks"}>Voltar</Link>
                    ),
                    tabBarLabel: 'Joy',
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        if(focused) return <Image style={styles.IconSelected} resizeMode="cover" source={require('@/assets/images/navbar-icons/rubber_ducktopus-selected.png')}/>
                        return <Image style={styles.IconUnselected} resizeMode="cover" source={require('@/assets/images/navbar-icons/rubber_ducktopus.png')}/>
                    },
                }}
            />
            <Tabs.Screen
                name="sleep"
                options={{
                    headerTitle: "Dormir",
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <Link href={"/listDucks"}>Voltar</Link>
                    ),
                    tabBarLabel: 'Sleep',
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        if(focused) return <Image style={styles.IconSelected} resizeMode="cover" source={require('@/assets/images/navbar-icons/moon-selected.png')}/>
                        return <Image style={styles.IconUnselected} resizeMode="cover" source={require('@/assets/images/navbar-icons/moon.png')}/>
                    },
                }}
            />
        </Tabs>
    );
}


const styles = StyleSheet.create({
    IconSelected: {
        width: 64,
        height: 64,
        backgroundColor: "#40495A",

    },
    IconUnselected: {
        width: 40,
        height: 40
    }
})

export default Layout;