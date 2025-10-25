// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(
	amount: number,
	currency: string = "BDT"
): string {
	return new Intl.NumberFormat("en-BD", {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("en-BD", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(date);
}
