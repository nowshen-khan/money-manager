import User, { IIncomeSource, IExpense, IUserCategory } from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Default categories for new users
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

export const userOperations = {
	async createUser(userData: any) {
		await connectDB();

		// Check if user already exists
		const existingUser = await User.findOne({ email: userData.email });
		if (existingUser) {
			throw new Error("User already exists with this email");
		}

		const hashedPassword = userData.password
			? await bcrypt.hash(userData.password, 12)
			: undefined;

		const user = new User({
			email: userData.email,
			name: userData.name,
			password: hashedPassword,
			age: userData.age ? parseInt(userData.age) : undefined,
			profession: userData.profession || "other",
			professionType: userData.professionType,
			experience: userData.experience
				? parseInt(userData.experience)
				: undefined,
			maritalStatus: userData.maritalStatus || "single",
			familyMembers: userData.familyMembers
				? parseInt(userData.familyMembers)
				: 1,
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

export const incomeOperations = {
	async addIncome(userId: string, incomeData: IIncomeSource) {
		await connectDB();
		const result = await User.findByIdAndUpdate(
			userId,
			{ $push: { incomeSources: incomeData } },
			{ new: true, runValidators: true }
		);

		if (!result) {
			throw new Error("User not found");
		}
		return result;
	},

	async getUserIncomes(userId: string) {
		await connectDB();
		const user = await User.findById(userId);

		if (!user) {
			throw new Error("User not found");
		}
		return user?.incomeSources || [];
	},

	async getMonthlyIncomes(userId: string, year: number, month: number) {
		await connectDB();
		const user = await User.findById(userId);
		if (!user) return 0;

		const monthlyIncomes = user.incomeSources.filter(
			(income: IIncomeSource) => {
				const incomeDate = new Date(income.date);
				return (
					incomeDate.getFullYear() === year && incomeDate.getMonth() === month
				);
			}
		);

		return monthlyIncomes.reduce(
			(total: number, income: IIncomeSource) => total + income.amount,
			0
		);
	},
};

export const expenseOperations = {
	async addExpense(userId: string, expenseData: IExpense) {
		await connectDB();
		const result = await User.findByIdAndUpdate(
			userId,
			{ $push: { expenses: expenseData } },
			{ new: true, runValidators: true }
		);

		if (!result) {
			throw new Error("User not found");
		}
		return result;
	},

	async getUserExpenses(userId: string) {
		await connectDB();
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		return user?.expenses || [];
	},

	async getMonthlyExpenses(userId: string, year: number, month: number) {
		await connectDB();
		const user = await User.findById(userId);
		if (!user) return 0;

		const monthlyExpenses = user.expenses.filter((expense: IExpense) => {
			const expenseDate = new Date(expense.date);
			return (
				expenseDate.getFullYear() === year && expenseDate.getMonth() === month
			);
		});

		return monthlyExpenses.reduce(
			(total: number, expense: IExpense) => total + expense.amount,
			0
		);
	},
};
