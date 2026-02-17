import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  console.log("Contact submission", {
    name: body.name,
    email: body.email,
    company: body.company ?? "",
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
