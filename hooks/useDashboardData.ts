// src/hooks/useDashboardData.ts
import { useState, useEffect } from "react";

interface DashboardStats {
	income: number;
	expenses: number;
	balance: number;
	savings: number;
}

interface Expense {
	_id: string;
	amount: number;
	category: string;
	description?: string;
	date: string;
}

export function useDashboardData() {
	const [stats, setStats] = useState<DashboardStats>({
		income: 0,
		expenses: 0,
		balance: 0,
		savings: 0,
	});
	const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadDashboardData() {
			try {
				setLoading(true);
				setError(null);

				// Fetch stats and expenses in parallel
				const [statsResponse, expensesResponse] = await Promise.all([
					fetch("/api/dashboard/stats"),
					fetch("/api/dashboard/expenses"),
				]);

				if (!statsResponse.ok || !expensesResponse.ok) {
					throw new Error("Failed to fetch dashboard data");
				}

				const [statsData, expensesData] = await Promise.all([
					statsResponse.json(),
					expensesResponse.json(),
				]);

				setStats(statsData);
				setRecentExpenses(expensesData);
			} catch (err) {
				console.error("Error loading dashboard data:", err);
				setError("Failed to load dashboard data");
			} finally {
				setLoading(false);
			}
		}

		loadDashboardData();
	}, []);

	return { stats, recentExpenses, loading, error };
}
