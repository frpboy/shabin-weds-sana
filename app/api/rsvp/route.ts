import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() });
}

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500, headers: corsHeaders() });
  }

  const sql = neon(databaseUrl);
  try {
    const rows = await sql`
      SELECT full_name, attendance, guest_count, dietary_or_notes, created_at
      FROM rsvps
      ORDER BY created_at DESC
      LIMIT 50;
    `;
    return NextResponse.json(rows, { status: 200, headers: corsHeaders() });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch RSVPs.' }, { status: 500, headers: corsHeaders() });
  }
}

export async function POST(req: Request) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500, headers: corsHeaders() });
  }

  const sql = neon(databaseUrl);
  try {
    const { fullName, attendance, guestCount, dietaryOrNotes } = await req.json();
    if (!fullName || !attendance) {
      return NextResponse.json({ error: 'Full name and attendance are required' }, { status: 400, headers: corsHeaders() });
    }

    const result = await sql`
      INSERT INTO rsvps (full_name, attendance, guest_count, dietary_or_notes)
      VALUES (${fullName}, ${attendance}, ${String(guestCount || '1')}, ${dietaryOrNotes || ''})
      RETURNING *;
    `;
    return NextResponse.json({ success: true, data: result[0] }, { status: 200, headers: corsHeaders() });
  } catch {
    return NextResponse.json({ error: 'Failed to submit RSVP. Please try again.' }, { status: 500, headers: corsHeaders() });
  }
}
