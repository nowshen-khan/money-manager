import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
			<nav className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
								<span className="text-white font-bold text-sm">💰</span>
							</div>
							<span className="text-xl font-bold text-gray-800 dark:text-white">
								MoneyManager
							</span>
						</div>
						<div className="flex space-x-4">
							<Link href="/login">
								<Button variant="outline">Login</Button>
							</Link>
							<Link href="/register">
								<Button>Get Started</Button>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			<section className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
					Smart Money Management
					<span className="block text-green-600 dark:text-green-400">
						for Bangladeshi Users
					</span>
				</h1>
				<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
					AI-powered financial assistant that helps you track expenses, save
					money, and make better financial decisions.
				</p>
				<div className="flex justify-center space-x-4">
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

			<section className="container mx-auto px-4 py-16">
				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
						<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
							<span className="text-2xl">🤖</span>
						</div>
						<h3 className="text-xl font-semibold mb-2 dark:text-white">
							AI-Powered Insights
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Get personalized suggestions to optimize your spending and
							increase savings.
						</p>
					</div>

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
						<div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
							<span className="text-2xl">📊</span>
						</div>
						<h3 className="text-xl font-semibold mb-2 dark:text-white">
							Smart Analytics
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Visualize your spending patterns and understand your financial
							health.
						</p>
					</div>

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
						<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
							<span className="text-2xl">🎯</span>
						</div>
						<h3 className="text-xl font-semibold mb-2 dark:text-white">
							Goal Tracking
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Set financial goals and track your progress with intelligent
							management.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
