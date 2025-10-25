// src/app/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function DashboardPage() {
	const { data: session } = useSession();
	const { stats, recentExpenses, loading, error } = useDashboardData();

	if (loading) {
		return (
			<div className="space-y-8">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-1/2"></div>
				</div>
				{/* Skeleton loading for stats */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{[...Array(4)].map((_, i) => (
						<Card key={i}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<div className="h-4 bg-gray-200 rounded w-1/2"></div>
								<div className="w-8 h-8 bg-gray-200 rounded-full"></div>
							</CardHeader>
							<CardContent>
								<div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
								<div className="h-3 bg-gray-200 rounded w-1/2"></div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-8">
				<div className="text-red-600 mb-4">Error: {error}</div>
				<Button onClick={() => window.location.reload()}>Retry</Button>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Welcome Section */}
			<div>
				<h1 className="text-3xl font-bold text-gray-900">
					Welcome back, {session?.user?.name}! 👋
				</h1>
				<p className="text-gray-600">
					Here's your financial overview for this month
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Net Balance</CardTitle>
						<span className="text-xl">💰</span>
					</CardHeader>
					<CardContent>
						<div
							className={`text-2xl font-bold ${
								stats.balance >= 0 ? "text-green-600" : "text-red-600"
							}`}
						>
							৳{stats.balance.toLocaleString()}
						</div>
						<p className="text-xs text-gray-600">Income - Expenses</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Monthly Income
						</CardTitle>
						<span className="text-xl">💵</span>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">
							৳{stats.income.toLocaleString()}
						</div>
						<p className="text-xs text-gray-600">This month</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Monthly Expenses
						</CardTitle>
						<span className="text-xl">💸</span>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-red-600">
							৳{stats.expenses.toLocaleString()}
						</div>
						<p className="text-xs text-gray-600">This month</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Savings</CardTitle>
						<span className="text-xl">🎯</span>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">
							৳{stats.savings.toLocaleString()}
						</div>
						<p className="text-xs text-gray-600">
							{stats.income > 0
								? Math.round((stats.savings / stats.income) * 100)
								: 0}
							% of income
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Expenses & Quick Actions */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Recent Expenses */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Expenses</CardTitle>
						<CardDescription>Your last 3 transactions</CardDescription>
					</CardHeader>
					<CardContent>
						{recentExpenses.length > 0 ? (
							<div className="space-y-4">
								{recentExpenses.map((expense) => (
									<div
										key={expense._id}
										className="flex items-center justify-between p-3 border rounded-lg"
									>
										<div className="flex items-center space-x-3">
											<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
												<span className="text-blue-600 text-sm">💰</span>
											</div>
											<div>
												<p className="font-medium">
													{expense.description || "No description"}
												</p>
												<p className="text-sm text-gray-600">
													{expense.category}
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="font-bold text-red-600">
												-৳{expense.amount}
											</p>
											<p className="text-sm text-gray-600">
												{new Date(expense.date).toLocaleDateString()}
											</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-8 text-gray-500">
								<p>No expenses yet</p>
								<p className="text-sm">
									Start tracking your expenses to see them here
								</p>
							</div>
						)}
						<Button variant="outline" className="w-full mt-4">
							View All Expenses
						</Button>
					</CardContent>
				</Card>

				{/* Quick Actions */}
				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription>Manage your finances quickly</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-4">
							<Button className="h-20 flex flex-col gap-2">
								<span className="text-xl">➕</span>
								Add Expense
							</Button>
							<Button variant="outline" className="h-20 flex flex-col gap-2">
								<span className="text-xl">💵</span>
								Add Income
							</Button>
							<Button variant="outline" className="h-20 flex flex-col gap-2">
								<span className="text-xl">📊</span>
								View Reports
							</Button>
							<Button variant="outline" className="h-20 flex flex-col gap-2">
								<span className="text-xl">🎯</span>
								Set Goals
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* AI Suggestions */}
			<Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<span>🤖</span>
						AI Suggestions
					</CardTitle>
					<CardDescription>
						Personalized tips to improve your finances
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{stats.expenses > stats.income ? (
							<div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
								<Badge variant="secondary" className="mt-1">
									⚠️
								</Badge>
								<div>
									<p className="font-medium">Expenses Exceed Income</p>
									<p className="text-sm text-gray-600">
										You're spending more than you earn. Consider reducing
										non-essential expenses.
									</p>
								</div>
							</div>
						) : stats.savings / stats.income < 0.2 ? (
							<div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
								<Badge variant="secondary" className="mt-1">
									💡
								</Badge>
								<div>
									<p className="font-medium">Increase Savings Rate</p>
									<p className="text-sm text-gray-600">
										Try to save at least 20% of your income for better financial
										security.
									</p>
								</div>
							</div>
						) : (
							<div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
								<Badge variant="secondary" className="mt-1">
									🎯
								</Badge>
								<div>
									<p className="font-medium">Great Job!</p>
									<p className="text-sm text-gray-600">
										You're managing your finances well. Consider investing your
										savings.
									</p>
								</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
