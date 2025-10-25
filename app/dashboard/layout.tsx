// src/app/dashboard/layout.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") return;

		if (!session) {
			router.push("/login");
		}
	}, [session, status, router]);

	if (status === "loading") {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	if (!session) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white border-b shadow-sm">
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
								<span className="text-white font-bold text-sm">💰</span>
							</div>
							<span className="text-xl font-bold text-gray-800">
								MoneyManager
							</span>
						</div>
						<div className="flex items-center space-x-4">
							<span className="text-gray-600">
								Welcome, {session.user?.name}
							</span>
							<Button variant="outline" onClick={() => signOut()}>
								Logout
							</Button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-4 py-8">{children}</main>
		</div>
	);
}
