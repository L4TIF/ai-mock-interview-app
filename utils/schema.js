import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    mockId: varchar('mockId').notNull()
})

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockIdRef').notNull(),
    questionId: varchar('questionId').notNull(),
    question: varchar('question').notNull(),
    correctAnswer: text('correctAnswer').notNull(),
    userAnswer: text('userAnswer').notNull(),
    feedback: text('feedback').notNull(),
    rating: varchar('rating').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    updatedAt: varchar('updatedAt').notNull(),
})