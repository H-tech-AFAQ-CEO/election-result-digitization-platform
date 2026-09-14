import { boolean, integer, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const resultSlips = pgTable('result_slips', { id: text('id').primaryKey(), reference: text('reference').notNull(), station: text('station').notNull(), district: text('district').notNull(), pageLabel: text('page_label').notNull(), status: text('status').notNull(), confidence: numeric('confidence').notNull(), totalVotes: integer('total_votes').notNull(), expectedVotes: integer('expected_votes').notNull(), sourceUrl: text('source_url'), createdAt: timestamp('created_at', { withTimezone: true }).notNull(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull() })
export const resultRows = pgTable('result_rows', { id: text('id').primaryKey(), slipId: text('slip_id').notNull(), party: text('party').notNull(), candidate: text('candidate').notNull(), votes: integer('votes').notNull(), confidence: numeric('confidence').notNull(), status: text('status').notNull(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull() })
export const auditEvents = pgTable('audit_events', { id: text('id').primaryKey(), slipId: text('slip_id').notNull(), action: text('action').notNull(), actor: text('actor').notNull(), detail: text('detail').notNull(), createdAt: timestamp('created_at', { withTimezone: true }).notNull() })
export const validationRules = pgTable('validation_rules', { id: text('id').primaryKey(), name: text('name').notNull(), description: text('description').notNull(), enabled: boolean('enabled').notNull(), flaggedCount: integer('flagged_count').notNull(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull() })
export type ResultSlip = typeof resultSlips.$inferSelect
export type ResultRow = typeof resultRows.$inferSelect
export type AuditEvent = typeof auditEvents.$inferSelect
export type ValidationRule = typeof validationRules.$inferSelect
