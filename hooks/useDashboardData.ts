"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface DashboardStats {
	income: number;
	expenses: number;
	balance: number;
	savings: number;
	savingsRate: number;
}

interface Expense {
	_id: string;
	amount: number;
	category: string;
	description?: string;
	date: string;
}

export function useDashboardData() {
	const { data: session } = useSession();
	const [stats, setStats] = useState<DashboardStats>({
		income: 0,
		expenses: 0,
		balance: 0,
		savings: 0,
		savingsRate: 0,
	});
	const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadDashboardData() {
			if (!session?.user?.id) return;

			try {
				setLoading(true);
				setError(null);

				const response = await fetch("/api/dashboard", {
					credentials: "include",
				});

				if (!response.ok) {
					throw new Error("Failed to fetch dashboard data");
				}

				const data = await response.json();

				setStats(data.stats);
				setRecentExpenses(data.recentExpenses);
			} catch (err: any) {
				console.error("Error loading dashboard data:", err);
				setError(err.message || "Failed to load dashboard data");
			} finally {
				setLoading(false);
			}
		}

		loadDashboardData();
	}, [session]);

	return { stats, recentExpenses, loading, error };
}
