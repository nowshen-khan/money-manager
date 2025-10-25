import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { expenseOperations } from "@/lib/dbOperations";

export async function POST(request: Request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const { amount, category, description, date } = body;

		// Validation
		if (!amount || !category || !date) {
			return NextResponse.json(
				{ error: "Amount, category, and date are required" },
				{ status: 400 }
			);
		}

		if (amount <= 0) {
			return NextResponse.json(
				{ error: "Amount must be greater than 0" },
				{ status: 400 }
			);
		}

		// Add expense
		await expenseOperations.addExpense(session.user.id, {
			amount,
			category,
			description,
			date: new Date(date),
			isBusinessExpense: false,
			isNecessary: true,
		});

		return NextResponse.json({ message: "Expense added successfully" });
	} catch (error) {
		console.error("Expense API error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const expenses = await expenseOperations.getUserExpenses(session.user.id);

		const formattedExpenses = expenses.map((expense) => ({
			_id: expense._id.toString(),
			amount: expense.amount,
			category: expense.category,
			description: expense.description,
			date: expense.date.toISOString(),
			isBusinessExpense: expense.isBusinessExpense,
			isNecessary: expense.isNecessary,
		}));

		return NextResponse.json({ expenses: formattedExpenses });
	} catch (error) {
		console.error("Expense API error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
