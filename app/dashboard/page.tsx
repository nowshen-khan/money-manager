"use client";

import { useState } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

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

export default function DashboardPage() {
	const { data: session } = useSession();
	const { stats, recentExpenses, loading, error } = useDashboardData();

	if (loading) {
		return <DashboardSkeleton />;
	}

	if (error) {
		return (
			<div className="text-center py-8">
				<div className="text-destructive mb-4">Error: {error}</div>
				<Button onClick={() => window.location.reload()}>Retry</Button>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Welcome Section */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Welcome back, {session?.user?.name}! 👋
				</h1>
				<p className="text-muted-foreground">
					Here's your financial overview for this month
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Net Balance"
					value={stats.balance}
					trend={stats.balance >= 0 ? "positive" : "negative"}
					icon="💰"
					description="Income - Expenses"
				/>

				<StatCard
					title="Monthly Income"
					value={stats.income}
					trend="positive"
					icon="💵"
					description="This month"
				/>

				<StatCard
					title="Monthly Expenses"
					value={stats.expenses}
					trend="negative"
					icon="💸"
					description="This month"
				/>

				<StatCard
					title="Savings Rate"
					value={stats.savingsRate}
					trend={stats.savingsRate >= 20 ? "positive" : "neutral"}
					icon="🎯"
					description={`${stats.savingsRate}% of income`}
				/>
			</div>

			{/* Recent Activity & Quick Actions */}
			<div className="grid gap-8 lg:grid-cols-2">
				<RecentExpensesCard expenses={recentExpenses} />
				<QuickActionsCard />
			</div>

			{/* AI Suggestions */}
			<AISuggestionsCard stats={stats} />
		</div>
	);
}

// Stat Card Component
function StatCard({
	title,
	value,
	trend,
	icon,
	description,
}: {
	title: string;
	value: number;
	trend: "positive" | "negative" | "neutral";
	icon: string;
	description: string;
}) {
	const trendColors = {
		positive: "text-green-600",
		negative: "text-red-600",
		neutral: "text-yellow-600",
	};

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<span className="text-xl">{icon}</span>
			</CardHeader>
			<CardContent>
				<div className={`text-2xl font-bold ${trendColors[trend]}`}>
					৳{value.toLocaleString()}
				</div>
				<p className="text-xs text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
}

// Recent Expenses Component
function RecentExpensesCard({ expenses }: { expenses: any[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Expenses</CardTitle>
				<CardDescription>Your last 3 transactions</CardDescription>
			</CardHeader>
			<CardContent>
				{expenses.length > 0 ? (
					<div className="space-y-4">
						{expenses.map((expense) => (
							<div
								key={expense._id}
								className="flex items-center justify-between p-3 rounded-lg border"
							>
								<div className="flex items-center gap-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
										<span className="text-sm">💰</span>
									</div>
									<div>
										<p className="font-medium text-sm">
											{expense.description || "No description"}
										</p>
										<p className="text-xs text-muted-foreground">
											{expense.category}
										</p>
									</div>
								</div>
								<div className="text-right">
									<p className="font-bold text-destructive text-sm">
										-৳{expense.amount}
									</p>
									<p className="text-xs text-muted-foreground">
										{new Date(expense.date).toLocaleDateString()}
									</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-8 text-muted-foreground">
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
	);
}

// Quick Actions Component
function QuickActionsCard() {
	const [sheetOpen, setSheetOpen] = useState(false);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
				<CardDescription>Manage your finances quickly</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4">
					<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
						<SheetTrigger asChild>
							<Button className="h-20 flex flex-col gap-2">
								<span className="text-xl">➕</span>
								Add Expense
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Add New Expense</SheetTitle>
								<SheetDescription>
									Track your spending to better manage your finances
								</SheetDescription>
							</SheetHeader>
							<div className="mt-6">
								<AddExpenseForm />
							</div>
						</SheetContent>
					</Sheet>

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
	);
}

// AI Suggestions Component
function AISuggestionsCard({ stats }: { stats: any }) {
	const suggestions = getAISuggestions(stats);

	return (
		<Card className="bg-linear-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
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
					{suggestions.map((suggestion, index) => (
						<div
							key={index}
							className="flex items-start gap-3 p-3 bg-background rounded-lg border"
						>
							<Badge variant="secondary" className="mt-1">
								{suggestion.icon}
							</Badge>
							<div>
								<p className="font-medium text-sm">{suggestion.title}</p>
								<p className="text-sm text-muted-foreground">
									{suggestion.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

// AI Suggestions Logic
function getAISuggestions(stats: any) {
	const suggestions = [];

	if (stats.expenses > stats.income) {
		suggestions.push({
			icon: "⚠️",
			title: "Expenses Exceed Income",
			description:
				"You're spending more than you earn. Consider reducing non-essential expenses.",
		});
	}

	if (stats.savingsRate < 20) {
		suggestions.push({
			icon: "💡",
			title: "Increase Savings Rate",
			description: `Try to save at least 20% of your income. Current rate: ${stats.savingsRate}%`,
		});
	}

	if (stats.expenses > stats.income * 0.5) {
		suggestions.push({
			icon: "📊",
			title: "High Expense Ratio",
			description:
				"Your expenses are more than 50% of income. Review your spending categories.",
		});
	}

	if (suggestions.length === 0) {
		suggestions.push({
			icon: "🎯",
			title: "Great Job!",
			description:
				"You're managing your finances well. Consider investing your savings.",
		});
	}

	return suggestions;
}

// Loading Skeleton
function DashboardSkeleton() {
	return (
		<div className="space-y-8">
			<div className="animate-pulse">
				<div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
				<div className="h-4 bg-muted rounded w-1/2"></div>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{[...Array(4)].map((_, i) => (
					<Card key={i}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<div className="h-4 bg-muted rounded w-1/2"></div>
							<div className="w-8 h-8 bg-muted rounded-full"></div>
						</CardHeader>
						<CardContent>
							<div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
							<div className="h-3 bg-muted rounded w-1/2"></div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
