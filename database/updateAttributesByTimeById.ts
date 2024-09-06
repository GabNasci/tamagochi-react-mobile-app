import { Alert } from "react-native";
import { useDuckDatabase } from "./useDuckDatabase";

export async function updadteAttributesByTimeById(id: number, currentTime: number) {

    const duckDatabase = useDuckDatabase()
    try {
        const updatedDuck = await duckDatabase.findById(id)
        if (!updatedDuck) return Alert.alert("Não foi possível encontrar o pato!")

        const minutesPassed = (currentTime - new Date(updatedDuck.updated_at).getTime()) / (1000 * 60);
        const response = await duckDatabase.updadteAtributes({
            hungry: Math.max(0, updatedDuck.hungry + Math.floor(minutesPassed)),
            joy: Math.max(0, updatedDuck.joy + Math.floor(minutesPassed)),
            sleep: Math.max(0, updatedDuck.sleep + Math.floor(minutesPassed)),
            updated_at: new Date(),
            id: updatedDuck.id
        })

    } catch (error) {
        throw error
    }
}