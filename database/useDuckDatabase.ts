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
    sleep: number,
    updated_at: Date,
}


export function useDuckDatabase() {

    const database = useSQLiteContext()

    async function create(data: Omit<DuckDatabase, "id" | "updated_at">) {
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

            const response = await database.getAllAsync<DuckDatabase>(query)

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

    async function updadteAtributes(data: Omit<DuckDatabase, "name" | "type">) {
        const statement = await database.prepareAsync(
            "UPDATE ducks SET hungry = $hungry, joy = $joy, sleep = $sleep, updated_at = $updated_at WHERE id = $id"
        );
    
        try {
            const result = await statement.executeAsync({
                $hungry: data.hungry,
                $joy: data.joy,
                $sleep: data.sleep,
                $updated_at: Date.now(),
                $id: data.id             
            });

        } catch (error) {
            throw error
        } finally {
            statement.finalizeAsync()
        }
    }

    return { create, getAll, findFirst, findById, updadteAtributes }
}