import { NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { auditEvents, resultRows, resultSlips, validationRules } from '@/lib/db/schema'

export async function GET() {
  try {
    const slips = await db.select().from(resultSlips).orderBy(desc(resultSlips.updatedAt))
    const rows = slips.length ? await db.select().from(resultRows).where(eq(resultRows.slipId, slips[0].id)) : []
    const audit = slips.length ? await db.select().from(auditEvents).where(eq(auditEvents.slipId, slips[0].id)).orderBy(desc(auditEvents.createdAt)) : []
    const rules = await db.select().from(validationRules).orderBy(desc(validationRules.updatedAt))
    return NextResponse.json({ slips, rows, audit, rules })
  } catch (error) {
    console.error('[v0] results api read failed', error)
    return NextResponse.json({ error: 'Database is not ready yet' }, { status: 503 })
  }
}
