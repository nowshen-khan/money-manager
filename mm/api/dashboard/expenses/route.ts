// src/app/api/dashboard/expenses/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth-config";
import { expenseDB } from "@/lib/server/dbOperations";

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const expenses = await expenseDB.getUserExpenses(session.user.id);
		const sortedExpenses = expenses
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			.slice(0, 3);

		return NextResponse.json(sortedExpenses);
	} catch (error) {
		console.error("Dashboard expenses error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
