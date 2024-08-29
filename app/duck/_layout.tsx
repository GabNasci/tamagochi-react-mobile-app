import { Tabs } from "expo-router";

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="hungry"
                options={{
                    title: 'Hungry'
                }}
            />
            <Tabs.Screen
                name="joy"
                options={{
                    title: 'Joy'
                }}
            />
            <Tabs.Screen
                name="sleep"
                options={{
                    title: 'Sleep'
                }}
            />
        </Tabs>
    );
}

export default Layout;