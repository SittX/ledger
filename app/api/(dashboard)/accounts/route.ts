import { createAccount, getAllAccounts } from "@/services/account.service";
import { NextRequest, NextResponse } from "next/server";
import { AccountCreateSchema } from '../../../../database/schema/account';

export async function GET() {
    const accounts = getAllAccounts();
    return NextResponse.json(accounts);
}

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();

        const validation = AccountCreateSchema.safeParse(payload);
        if (validation.error) {
            return NextResponse.json(
                {
                    error: "Request body validation failed", details: validation.error.message
                },
                { status: 400 }
            )
        }

        const account = await createAccount(validation.data);

        return NextResponse.json(account, { status: 201 });
    } catch (error) {
        console.error("POST /api/accounts error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}