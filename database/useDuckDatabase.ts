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

    async function create(data: Omit<DuckDatabase, "id" | "updated_at" | "hungry" | "joy" | "sleep">) {
        const statement = await database.prepareAsync(
            "INSERT INTO ducks (name, type, hungry, joy, sleep, updated_at) VALUES($name, $type, $hungry, $joy, $sleep, $updated_at)")

        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $type: data.type,
                $hungry: 70,
                $joy: 70,
                $sleep: 70,
                $updated_at: new Date().toISOString()
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

    async function updateAtributes(data: Omit<DuckDatabase, "name" | "type" | "updated_at">) {
        const statement = await database.prepareAsync(
            "UPDATE ducks SET hungry = $hungry, joy = $joy, sleep = $sleep WHERE id = $id"
        );

        try {
            const result = await statement.executeAsync({
                $hungry: data.hungry,
                $joy: data.joy,
                $sleep: data.sleep,
                $id: data.id
            });

        } catch (error) {
            throw error
        } finally {
            statement.finalizeAsync()
        }
    }

    async function updateAtributesByTime() {
        const ducks = await getAll();
    
        for (const duck of ducks) {
            const minutesPassed = (new Date().getTime() - new Date(duck.updated_at).getTime()) / (1000 * 60);
            if (Math.floor(minutesPassed) >= 1) {
                const statement = await database.prepareAsync(
                    "UPDATE ducks SET hungry = $hungry, joy = $joy, sleep = $sleep, updated_at = $updated_at WHERE id = $id"
                );
    
                try {
                    const result = await statement.executeAsync({
                        $hungry: Math.max(0, duck.hungry - Math.floor(minutesPassed) * 10),
                        $joy: Math.max(0, duck.joy - Math.floor(minutesPassed) * 10),
                        $sleep: Math.max(0, duck.sleep - Math.floor(minutesPassed) * 10),
                        $updated_at: new Date().toISOString(),
                        $id: duck.id
                    });
                } catch (error) {
                    throw error;
                } finally {
                    await statement.finalizeAsync();
                }
            }
        }
    }
    

    

    return { create, getAll, findFirst, findById, updateAtributes, updateAtributesByTime }
}
