import { DuckDatabase } from "@/database/useDuckDatabase";
import { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";

type DuckGifProps = {
    duck: string,
    width: number,
    inverted?: boolean
}

const DuckGif = ({duck, width, inverted}: DuckGifProps) => {

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
        <Image
                source={duckGif}
                style={{
                    width: (width - 15),
                    height: (width),
                    transform: inverted ? [{ scaleX: -1 }] : undefined
                }}
            />
    );
}

export default DuckGif;