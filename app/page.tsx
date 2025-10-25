import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
			{/* Navigation */}
			<nav className="border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center justify-between px-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
							<span className="text-sm font-bold text-white">💰</span>
						</div>
						<span className="text-xl font-bold">MoneyManager</span>
					</div>
					<div className="flex items-center gap-4">
						<Link href="/login">
							<Button variant="outline" size="sm">
								Login
							</Button>
						</Link>
						<Link href="/register">
							<Button size="sm">Get Started</Button>
						</Link>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="container flex flex-col items-center px-4 py-16 text-center">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
					Smart Money Management
					<span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
						for Bangladeshi Users
					</span>
				</h1>
				<p className="mt-6 max-w-2xl text-xl text-muted-foreground">
					AI-powered financial assistant that helps you track expenses, save
					money, and make better financial decisions with cutting-edge
					technology.
				</p>
				<div className="mt-8 flex gap-4">
					<Link href="/register">
						<Button size="lg" className="bg-green-600 hover:bg-green-700">
							Start Free
						</Button>
					</Link>
					<Button size="lg" variant="outline">
						Learn More
					</Button>
				</div>
			</section>

			{/* Features Grid */}
			<section className="container px-4 py-16">
				<div className="grid gap-8 md:grid-cols-3">
					<div className="rounded-lg border bg-card p-6 shadow-sm">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
							<span className="text-2xl">🤖</span>
						</div>
						<h3 className="mb-2 text-xl font-semibold">AI-Powered Insights</h3>
						<p className="text-muted-foreground">
							Get personalized suggestions to optimize your spending and
							increase savings.
						</p>
					</div>

					<div className="rounded-lg border bg-card p-6 shadow-sm">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
							<span className="text-2xl">📊</span>
						</div>
						<h3 className="mb-2 text-xl font-semibold">Smart Analytics</h3>
						<p className="text-muted-foreground">
							Visualize your spending patterns and understand your financial
							health.
						</p>
					</div>

					<div className="rounded-lg border bg-card p-6 shadow-sm">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
							<span className="text-2xl">🎯</span>
						</div>
						<h3 className="mb-2 text-xl font-semibold">Goal Tracking</h3>
						<p className="text-muted-foreground">
							Set financial goals and track your progress with intelligent
							management.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
