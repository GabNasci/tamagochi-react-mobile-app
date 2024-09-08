import Header from "@/components/Header";
import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";

const Layout = () => {

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { backgroundColor: "#40495A", height: 80 },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    header: () => (
                        <Header title="Pato" />
                    ),
                    tabBarLabel: 'Home',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) return <Image style={styles.IconSelected} resizeMode="cover" source={require('@/assets/images/navbar-icons/rubber_duck-selected.png')} />
                        return <Image style={styles.IconUnselected} resizeMode="cover" source={require('@/assets/images/navbar-icons/rubber_duck.png')} />
                    },
                }}
            />
            <Tabs.Screen
                name="hungry"
                options={{
                    header: () => (
                        <Header title="Fomes" />
                    ),
                    tabBarLabel: 'Hungry',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) return <Image style={styles.IconSelected} resizeMode="cover" source={require('@/assets/images/navbar-icons/potatochip_green-selected.png')} />
                        return <Image style={styles.IconUnselected} resizeMode="cover" source={require('@/assets/images/navbar-icons/potatochip_green.png')} />
                    },
                }}

            />
            <Tabs.Screen
                name="joy"
                options={{
                    header: () => (
                        <Header title="Divertes" />
                    ),
                    tabBarLabel: 'Joy',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) return <Image style={styles.IconSelected} resizeMode="cover" source={require('@/assets/images/navbar-icons/rubber_ducktopus-selected.png')} />
                        return <Image style={styles.IconUnselected} resizeMode="cover" source={require('@/assets/images/navbar-icons/rubber_ducktopus.png')} />
                    },
                }}
            />
            <Tabs.Screen
                name="sleep"
                options={{
                    header: () => (
                        <Header title="Dormes" />
                    ),
                    tabBarLabel: 'Sleep',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) return <Image style={styles.IconSelected} resizeMode="cover" source={require('@/assets/images/navbar-icons/moon-selected.png')} />
                        return <Image style={styles.IconUnselected} resizeMode="cover" source={require('@/assets/images/navbar-icons/moon.png')} />
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