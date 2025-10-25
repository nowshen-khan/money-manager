"use client";

import { useState } from "react";
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
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { AddExpenseForm } from "@/components/add-expense-form";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

// ... (previous imports and components)

export default function DashboardPage() {
	const { data: session } = useSession();
	const { stats, recentExpenses, loading, error } = useDashboardData();
	const [sheetOpen, setSheetOpen] = useState(false);

	// ... (previous component logic)

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
			{/* ... (stats grid remains same) */}

			{/* Recent Activity & Quick Actions */}
			<div className="grid gap-8 lg:grid-cols-2">
				<RecentExpensesCard expenses={recentExpenses} />

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
			</div>

			{/* AI Suggestions */}
			<AISuggestionsCard stats={stats} />
		</div>
	);
}

// ... (rest of the components remain same)
