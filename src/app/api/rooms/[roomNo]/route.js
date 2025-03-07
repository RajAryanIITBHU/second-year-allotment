
import { NextRequest, NextResponse } from "next/server";
import { readSingleRoom } from "@/actions/roomAction";

export async function GET(
  request,
  { params }
) {
  const { roomNo } = params;

  const result = await readSingleRoom(roomNo);

  if (result.success) {
    return NextResponse.json(result.data, { status: 200 });
  } else {
    return NextResponse.json({ error: result.message }, { status: 404 });
  }
}
