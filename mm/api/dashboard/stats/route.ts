// src/app/api/dashboard/stats/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth-config";
import { expenseDB, incomeDB } from "@/lib/server/dbOperations";

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();

		const monthlyIncome = await incomeDB.getMonthlyIncome(
			session.user.id,
			currentYear,
			currentMonth
		);
		const monthlyExpenses = await expenseDB.getMonthlyExpenses(
			session.user.id,
			currentYear,
			currentMonth
		);

		const stats = {
			income: monthlyIncome,
			expenses: monthlyExpenses,
			balance: monthlyIncome - monthlyExpenses,
			savings: Math.max(monthlyIncome - monthlyExpenses, 0),
		};

		return NextResponse.json(stats);
	} catch (error) {
		console.error("Dashboard stats error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
