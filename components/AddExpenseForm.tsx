"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AddExpenseForm() {
	const { data: session } = useSession();
	const [formData, setFormData] = useState({
		amount: "",
		category: "",
		description: "",
		date: new Date().toISOString().split("T")[0],
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const categories = [
		"House Rent",
		"Utilities",
		"Food & Groceries",
		"Transportation",
		"Healthcare",
		"Entertainment",
		"Shopping",
		"Education",
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		try {
			const response = await fetch("/api/expenses", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					amount: parseFloat(formData.amount),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to add expense");
			}

			setSuccess("Expense added successfully!");
			setFormData({
				amount: "",
				category: "",
				description: "",
				date: new Date().toISOString().split("T")[0],
			});

			// Refresh the page to update dashboard
			setTimeout(() => window.location.reload(), 1000);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Add Expense</CardTitle>
				<CardDescription>Track your spending</CardDescription>
			</CardHeader>
			<CardContent>
				{error && (
					<Alert variant="destructive" className="mb-4">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}
				{success && (
					<Alert className="mb-4 border-green-200 bg-green-50 dark:bg-green-950">
						<AlertDescription>{success}</AlertDescription>
					</Alert>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="amount">Amount (৳)</Label>
						<Input
							id="amount"
							type="number"
							placeholder="0.00"
							value={formData.amount}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, amount: e.target.value }))
							}
							required
							min="0"
							step="0.01"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<Select
							onValueChange={(value) =>
								setFormData((prev) => ({ ...prev, category: value }))
							}
							required
						>
							<SelectTrigger>
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description (Optional)</Label>
						<Input
							id="description"
							type="text"
							placeholder="What was this expense for?"
							value={formData.description}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="date">Date</Label>
						<Input
							id="date"
							type="date"
							value={formData.date}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, date: e.target.value }))
							}
							required
						/>
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Adding Expense..." : "Add Expense"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
