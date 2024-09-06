import { useCallback, useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import DuckGif from "./DuckGif";
import { DuckDatabase } from "@/database/useDuckDatabase";

type BoxDuckProps = {
    duck: string,
    width: number,
    status?: number
}

const BoxDuck = ({ duck, width, status}: BoxDuckProps) => {

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
            <DuckGif duck={duck} width={width - 35} status={status}/>
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