import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { expenseOperations, incomeOperations } from "@/lib/dbOperations";

interface Income {
	_id: string;
	amount: number;
	date: string | Date;
}

interface Expense {
	_id: string;
	amount: number;
	category: string;
	description?: string;
	date: string | Date;
}

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();

		// Get user's expenses and incomes
		const expenses = (await expenseOperations.getUserExpenses(
			session.user.id
		)) as Expense[];
		const incomes = (await incomeOperations.getUserIncomes(
			session.user.id
		)) as Income[];

		// Calculate monthly totals
		const monthlyIncomes = incomes.filter((income) => {
			const incomeDate = new Date(income.date);
			return (
				incomeDate.getFullYear() === currentYear &&
				incomeDate.getMonth() === currentMonth
			);
		});

		const monthlyExpenses = expenses.filter((expense) => {
			const expenseDate = new Date(expense.date);
			return (
				expenseDate.getFullYear() === currentYear &&
				expenseDate.getMonth() === currentMonth
			);
		});

		const totalIncome = monthlyIncomes.reduce(
			(sum, income) => sum + income.amount,
			0
		);
		const totalExpenses = monthlyExpenses.reduce(
			(sum, expense) => sum + expense.amount,
			0
		);
		const balance = totalIncome - totalExpenses;
		const savings = Math.max(balance, 0);
		const savingsRate =
			totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;

		// Get recent expenses (last 3)
		const recentExpenses = expenses
			.sort(
				(a: any, b: any) =>
					new Date(b.date).getTime() - new Date(a.date).getTime()
			)
			.slice(0, 3)
			.map((expense) => ({
				_id: expense._id.toString(),
				amount: expense.amount,
				category: expense.category,
				description: expense.description,
				date: new Date(expense.date).toISOString(),
			}));

		const stats = {
			income: totalIncome,
			expenses: totalExpenses,
			balance,
			savings,
			savingsRate,
		};

		return NextResponse.json({
			stats,
			recentExpenses,
		});
	} catch (error) {
		console.error("Dashboard API error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
