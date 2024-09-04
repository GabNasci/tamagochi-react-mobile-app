import { Image, StyleSheet, Text, View, ImageBackground } from "react-native";

export enum StatusDuckEnum {
    Hunger = 'Fome',
    Joy = 'Diversão',
    Sleep = 'Sono'
}

type StatusDuckProps = {
    nameStatus: StatusDuckEnum,
    statusNumber: number,
}

const StatusDuck = ({ nameStatus, statusNumber }: StatusDuckProps) => {
    const imgIconStatus = {
        [StatusDuckEnum.Hunger]: require('@/assets/images/statusDuck/iconHunger.png'),
        [StatusDuckEnum.Joy]: require('@/assets/images/statusDuck/iconJoy.png'),
        [StatusDuckEnum.Sleep]: require('@/assets/images/statusDuck/iconSleep.png'),
    };

    const imgStatusBar = {
        [StatusDuckEnum.Hunger]: require('@/assets/images/statusDuck/statusBarHunger.png'),
        [StatusDuckEnum.Joy]: require('@/assets/images/statusDuck/statusBarJoy.png'),
        [StatusDuckEnum.Sleep]: require('@/assets/images/statusDuck/statusBarSleep.png'),
    };

    const imgStatusBarEmpty = require('@/assets/images/statusDuck/statusBarEmpty.png');

    const filledWidth = (statusNumber / 100) * 164;
    return (
        <View style={styles.container}>
            <Image
                source={imgIconStatus[nameStatus]}
                style={styles.imgIconStatus}
            />
            <View style={styles.containerDetails}>
                <View style={styles.textStatus}>
                    <Text style={styles.text}>{nameStatus} </Text>
                    <Text style={styles.text}>{statusNumber}/100</Text>
                </View>
                <View style={styles.statusBarContainer}>
                    <ImageBackground
                        source={imgStatusBarEmpty}
                        style={styles.imgStatusBar}
                    >
                        <View style={{ width: filledWidth, overflow: 'hidden', alignItems: 'flex-start' }}>
                            <Image
                                source={imgStatusBar[nameStatus]}
                                style={styles.imgStatusBar}
                                resizeMode="cover"
                            />
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    imgIconStatus: {
        width: 34,
        height: 34,
    },
    imgStatusBar: {
        width: 164,
        height: 12,
    },
    containerDetails: {
        marginLeft: 5
    },
    textStatus: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 5
    },
    text: {
        fontFamily: 'supercell-font',
        color: "white",
        fontSize: 14,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    statusBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})

export default StatusDuck;
