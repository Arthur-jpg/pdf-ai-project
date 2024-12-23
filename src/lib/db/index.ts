import {neon, neonConfig} from '@neondatabase/serverless'
import { error } from 'console'
import {drizzle} from 'drizzle-orm/neon-http'

neonConfig.fetchConnectionCache = true

if (!process.env.DATABASE_URL) {
    throw new Error('database url not found')
}

const sql = neon(process.env.DATABASE_URL)


export const db = drizzle(sql)