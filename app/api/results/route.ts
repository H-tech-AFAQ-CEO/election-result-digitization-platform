import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { auditEvents, resultRows, resultSlips, validationRules } from '@/lib/db/schema'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files').filter((value): value is File => value instanceof File)
    if (!files.length) return NextResponse.json({ error: 'Choose at least one file.' }, { status: 400 })
    const allowed = new Set(['image/png', 'image/jpeg', 'application/pdf'])
    for (const file of files) {
      if (!allowed.has(file.type)) return NextResponse.json({ error: `${file.name} is not a PNG, JPG, or PDF file.` }, { status: 415 })
      if (file.size > 25 * 1024 * 1024) return NextResponse.json({ error: `${file.name} exceeds the 25 MB limit.` }, { status: 413 })
    }
    const now = new Date()
    const created = []
    for (const file of files) {
      const slipId = randomUUID()
      await db.insert(resultSlips).values({ id: slipId, reference: `UPLOAD-${slipId.slice(0, 8).toUpperCase()}`, station: 'Unassigned', district: 'Unassigned', pageLabel: file.name, status: 'queued', confidence: '0', totalVotes: 0, expectedVotes: 0, sourceUrl: file.name, createdAt: now, updatedAt: now })
      await db.insert(auditEvents).values({ id: randomUUID(), slipId, action: 'uploaded', actor: 'Workspace user', detail: `${file.name} added to the OCR intake queue`, createdAt: now })
      created.push({ id: slipId, name: file.name })
    }
    return NextResponse.json({ uploaded: created }, { status: 201 })
  } catch (error) {
    console.error('[v0] results api upload failed', error)
    return NextResponse.json({ error: 'Upload could not be saved to the database.' }, { status: 503 })
  }
}

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
