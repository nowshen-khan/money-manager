import { Button } from "@/components/ui/button";
import Link from "next/link";
const Navbar = () => {
	return (
		<nav className="border-b bg-white/80 backdrop-blur-sm">
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
					<div className="flex space-x-4">
						<Link href="/login">
							<Button variant="outline">Login</Button>
						</Link>
						<Link href="/register">
							<Button className="bg-green-600 hover:bg-green-700">
								Get Started
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
