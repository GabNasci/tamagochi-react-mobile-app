import { Alert } from "react-native";
import { useDuckDatabase } from "./useDuckDatabase";



export async function updadteAttributesByTime(currentTime: number) {

    const duckDatabase = useDuckDatabase()
    try {
        const updatedDuck = await duckDatabase.getAll()

        updatedDuck.map(async (duck) => {
            const minutesPassed = (currentTime - new Date(duck.updated_at).getTime()) / (1000 * 60);
            const response = await duckDatabase.updadteAtributes({
                hungry: Math.max(0, duck.hungry + Math.floor(minutesPassed)),
                joy: Math.max(0, duck.joy + Math.floor(minutesPassed)),
                sleep: Math.max(0, duck.sleep + Math.floor(minutesPassed)),
                updated_at: new Date(),
                id: duck.id
            })
        })

    } catch (error) {
        throw error
    }
}