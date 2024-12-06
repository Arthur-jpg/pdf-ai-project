
// vamos importar coisas importantes do postgress como integer ...
import {integer, pgEnum, pgTable, serial, text, timestamp, varchar} from 'drizzle-orm/pg-core'

export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

export const chats = pgTable('chats', {
    id: serial("id").primaryKey(),
    pdfName: text("pdf_name").notNull(),
    pdfUrl: text("pdf_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: varchar("user_id", {length: 256}).notNull(),
    fileKey: text("file_key").notNull(),
})


// no quesito do role, basicamente todas as trocas de mensagem vão ser guardadas juntas, sendo do gpt ou do usuário, o role é para definir de quem é cada mensagem
export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    chatId: integer("chat_id").references(()=>chats.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    role: userSystemEnum('role').notNull(),
})