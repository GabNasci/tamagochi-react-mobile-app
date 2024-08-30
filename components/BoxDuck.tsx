import { useCallback, useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

type BoxDuckProps = {
    duck: string,
    width: number
}

const BoxDuck = ({ duck, width }: BoxDuckProps) => {

    const [duckGif, setDuckGif] = useState()

    const getDuckGif = useCallback(() => {
        if (duck === 'yellow') return setDuckGif(require('@/assets/images/pato-marelo/yellow-pose-animation.gif'))
        if (duck === 'mallard-duck') return setDuckGif(require('@/assets/images/pato-real/mallard-duck-pose-animation.gif'))
        if (duck === 'purple') return setDuckGif(require('@/assets/images/pato-roxo/purple-pose-animation.gif'))
        if (duck === 'green') return setDuckGif(require('@/assets/images/pato-verde/green-pose-animation.gif'))
            
    }, [duck])


    useEffect(() => {
        getDuckGif()
        
    }, [getDuckGif])
    

    return (
        <ImageBackground
            source={require('@/assets/images/duck-box.png')}
            resizeMode="cover"
            style={{
                width: width,
                height: width,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                source={duckGif}
                style={{
                    width: (width - 60),
                    height: (width - 45),
                }}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    duckBoxContainer: {
        flex: 1,
        justifyContent: 'flex-start',
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
})

export default BoxDuck;