import { getAccountById } from "@/services/account.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const account = await getAccountById(id);

        return NextResponse.json(account, { status: 200 });
    } catch (error) {
        console.error("GET /api/accounts/[id] error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
export function PUT() { }