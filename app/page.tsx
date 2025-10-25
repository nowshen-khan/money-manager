// src/app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
	return (
		<div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50">
			<Navbar />
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-5xl font-bold text-gray-900 mb-6">
					Smart Money Management
					<span className="block text-green-600">for Bangladeshi Users</span>
				</h1>
				<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
					AI-powered financial assistant that helps you track expenses, save
					money, and make better financial decisions. Sign up with Google or
					email.
				</p>
				<div className="flex justify-center space-x-4">
					<Link href="/register">
						<Button size="lg" className="bg-green-600 hover:bg-green-700">
							Start Free
						</Button>
					</Link>
					<Link href="/about">
						<Button size="lg" variant="outline">
							Learn More
						</Button>
					</Link>
				</div>
			</section>

			{/* Features Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Why Choose MoneyManager?
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						We combine cutting-edge technology with financial expertise to give
						you the best money management experience
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
							<span className="text-2xl">🤖</span>
						</div>
						<h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
						<p className="text-gray-600">
							Get personalized suggestions to optimize your spending, increase
							savings, and make better financial decisions.
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
						<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
							<span className="text-2xl">📊</span>
						</div>
						<h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
						<p className="text-gray-600">
							Visualize your spending patterns, track progress towards goals,
							and understand your financial health.
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
						<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
							<span className="text-2xl">🎯</span>
						</div>
						<h3 className="text-xl font-semibold mb-2">Goal Tracking</h3>
						<p className="text-gray-600">
							Set financial goals and track your progress with our intelligent
							goal management system.
						</p>
					</div>
				</div>
			</section>
			{/* Test Database Connection */}
			<section className="container mx-auto px-4 py-8">
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<h3 className="text-lg font-semibold mb-4">Database Status</h3>
					<div className="flex space-x-4">
						<Link href="/api/test-connection">
							<Button variant="outline">Test MongoDB Connection</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
