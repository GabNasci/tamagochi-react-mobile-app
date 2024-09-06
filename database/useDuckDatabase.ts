import { useSQLiteContext } from "expo-sqlite"

export enum DuckType {
    Amarelo = "yellow",
    Real = "mallard",
    Verde = "green",
    Roxo = "purple"
}


export type DuckDatabase = {
    id: number,
    name: string,
    type: string,
    status?: number,
    hungry: number,
    joy: number,
    sleep: number
}


export function useDuckDatabase() {

    const database = useSQLiteContext()

    async function create(data: Omit<DuckDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO ducks (name, type, hungry, joy, sleep) VALUES($name, $type, $hungry, $joy, $sleep)")

        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $type: data.type,
                $hungry: data.hungry,
                $joy: data.joy,
                $sleep: data.sleep
            })

        } catch (error) {
            throw error
        } finally {
            statement.finalizeAsync()
        }
    }

    async function getAll() {
        try {
            const query = "SELECT * FROM ducks"

            const response = await database.getAllAsync<DuckDatabase[]>(query)

            return response
        } catch (error) {
            throw error
        } 
    }

    async function findFirst() {
        try {
            const query = "SELECT * FROM ducks LIMIT 1;"

            const response = await database.getFirstAsync<DuckDatabase>(query)

            return response
        } catch (error) {
            throw error
        } 
    }

    async function findById(id: number) {
        try {
            const query = `SELECT * FROM ducks WHERE id = ${id};` 

            const response = await database.getFirstAsync<DuckDatabase>(query)

            return response
        } catch (error) {
            throw error
        } 
    }

    return { create, getAll, findFirst, findById }
}