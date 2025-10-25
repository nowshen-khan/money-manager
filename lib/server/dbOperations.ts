// src/lib/dbOperations.ts
import User, {
	IUser,
	IIncomeSource,
	IExpense,
	IUserCategory,
} from "@/models/User";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Default categories
const defaultCategories: IUserCategory[] = [
	// Expense Categories
	{ name: "House Rent", type: "expense", color: "#ef4444", icon: "🏠" },
	{ name: "Utilities", type: "expense", color: "#f59e0b", icon: "💡" },
	{ name: "Food & Groceries", type: "expense", color: "#10b981", icon: "🍔" },
	{ name: "Transportation", type: "expense", color: "#3b82f6", icon: "🚗" },
	{ name: "Healthcare", type: "expense", color: "#8b5cf6", icon: "🏥" },
	{ name: "Entertainment", type: "expense", color: "#ec4899", icon: "🎉" },
	{ name: "Shopping", type: "expense", color: "#6366f1", icon: "🛒" },
	{ name: "Education", type: "expense", color: "#14b8a6", icon: "📚" },

	// Income Categories
	{ name: "Salary", type: "income", color: "#22c55e", icon: "💰" },
	{ name: "Business Income", type: "income", color: "#22c55e", icon: "💼" },
	{ name: "Freelance", type: "income", color: "#22c55e", icon: "👨‍💻" },
	{ name: "Investment", type: "income", color: "#22c55e", icon: "📈" },
];

// User Operations
export const userDB = {
	async createUser(userData: Partial<IUser>) {
		await connectDB();

		// Check if user already exists
		const existingUser = await User.findOne({ email: userData.email });
		if (existingUser) {
			throw new Error("User already exists with this email");
		}

		const hashedPassword = await bcrypt.hash(userData.password, 12);

		const user = new User({
			email: userData.email,
			name: userData.name,
			password: hashedPassword,
			age: parseInt(userData.age) || undefined,
			profession: userData.profession,
			professionType: userData.professionType,
			experience: parseInt(userData.experience) || undefined,
			maritalStatus: userData.maritalStatus,
			familyMembers: parseInt(userData.familyMembers) || 1,
			isPrimaryEarner: true, // Default value
			otherEarners: 0, // Default value
			housingRent: 0, // Default value
			loans: 0, // Default value
			savings: 0, // Default value
			categories: defaultCategories,
		});

		await user.save();
		return user;
	},

	async findUserByEmail(email: string) {
		await connectDB();
		return await User.findOne({ email });
	},

	async findUserById(id: string) {
		await connectDB();
		return await User.findById(id);
	},

	async verifyPassword(plainPassword: string, hashedPassword: string) {
		return await bcrypt.compare(plainPassword, hashedPassword);
	},
};

// Income Operations
export const incomeDB = {
	async addIncome(userId: string, incomeData: IIncomeSource) {
		await connectDB();
		return await User.findByIdAndUpdate(
			userId,
			{ $push: { incomeSources: incomeData } },
			{ new: true }
		);
	},

	async getUserIncomes(userId: string) {
		await connectDB();
		const user = await User.findById(userId);
		return user?.incomeSources || [];
	},

	async getMonthlyIncome(userId: string, year: number, month: number) {
		await connectDB();
		const user = await User.findById(userId);
		if (!user) return 0;

		const monthlyIncomes = user.incomeSources.filter((income) => {
			const incomeDate = new Date(income.date);
			return (
				incomeDate.getFullYear() === year && incomeDate.getMonth() === month
			);
		});

		return monthlyIncomes.reduce((total, income) => total + income.amount, 0);
	},
};

// Expense Operations
export const expenseDB = {
	async addExpense(userId: string, expenseData: IExpense) {
		await connectDB();
		return await User.findByIdAndUpdate(
			userId,
			{ $push: { expenses: expenseData } },
			{ new: true }
		);
	},

	async getUserExpenses(userId: string) {
		await connectDB();
		const user = await User.findById(userId);
		return user?.expenses || [];
	},

	async getMonthlyExpenses(userId: string, year: number, month: number) {
		await connectDB();
		const user = await User.findById(userId);
		if (!user) return 0;

		const monthlyExpenses = user.expenses.filter((expense) => {
			const expenseDate = new Date(expense.date);
			return (
				expenseDate.getFullYear() === year && expenseDate.getMonth() === month
			);
		});

		return monthlyExpenses.reduce(
			(total, expense) => total + expense.amount,
			0
		);
	},

	async getExpensesByCategory(userId: string) {
		await connectDB();
		const user = await User.findById(userId);
		if (!user) return {};

		const categoryTotals = user.expenses.reduce(
			(acc: Record<string, number>, expense) => {
				const category = expense.category;
				acc[category] = (acc[category] || 0) + expense.amount;
				return acc;
			},
			{}
		);

		return categoryTotals;
	},
};

// Category Operations
export const categoryDB = {
	async getUserCategories(userId: string) {
		await connectDB();
		const user = await User.findById(userId);
		return user?.categories || [];
	},
};
