import { DuckDatabase } from "@/database/useDuckDatabase";
import { duckGifs } from "@/mock";
import { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";

type DuckGifProps = {
    duck: string,
    width: number,
    inverted?: boolean,
    status?: number,
    screen?: string
}

const DuckGif = ({duck, width, inverted = false, status, screen}: DuckGifProps) => {

    const [duckGif, setDuckGif] = useState();

    const getDuckGif = useCallback(() => {
        const selectedDuck = duckGifs.find(d => d.name === duck);

        if (selectedDuck) {
            if (status === 0) {
                setDuckGif(selectedDuck.dead); 
            } else if (screen === 'sleep') {
                setDuckGif(selectedDuck.sleep); 
            } else if (screen === 'hungry') {
                setDuckGif(selectedDuck.swim); 
            } else if (status && status <= 150) {
                setDuckGif(selectedDuck.cry); 
            } else {
                setDuckGif(selectedDuck.pose); 
            }
        }
    }, [duck, screen, status]);

    useEffect(() => {
        getDuckGif();
    }, [getDuckGif]);

    return (
        <Image
                source={duckGif}
                resizeMode="contain"
                style={{
                    width: (width - 15),
                    height: (width),
                    transform: inverted ? [{ scaleX: -1 }] : undefined
                }}
            />
    );
}

export default DuckGif;