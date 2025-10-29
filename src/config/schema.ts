import { serial, pgTable, varchar, json, integer,timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  imageUrl: varchar('imageUrl'),
  credits: integer('credits').default(30) 
})

export const VideoData = pgTable('videoData', {
  id: serial('id').primaryKey(),
  script: json('script').notNull(),
  audioFileUrl: varchar('audioFileUrl').notNull(),
  captions: json('captions').notNull(),
  imageList: varchar('imageList').array(),
  videoUrl: varchar('videoUrl'),
  status: varchar('status').default('rendering'),
  createdBy: varchar('createdBy').notNull()
})



export const Payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id").notNull().unique(), // unique ensures no double-credit
  userId: varchar("user_id").notNull(),
  credits: integer("credits").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
