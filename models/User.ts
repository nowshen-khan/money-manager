// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IIncomeSource {
	sourceType:
		| "salary"
		| "business"
		| "freelance"
		| "investment"
		| "rental"
		| "other";
	amount: number;
	frequency: "monthly" | "weekly" | "yearly" | "one-time";
	description?: string;
	isRecurring: boolean;
	date: Date;
}

export interface IExpense {
	amount: number;
	category: string;
	subcategory?: string;
	description?: string;
	date: Date;
	isBusinessExpense: boolean;
	isNecessary: boolean;
	tags?: string[];
}

export interface IUserCategory {
	name: string;
	type: "income" | "expense" | "investment";
	parentCategory?: string;
	budgetLimit?: number;
	color?: string;
	icon?: string;
}

export interface IUser extends Document {
	email: string;
	name?: string;
	password: string;

	// Personal Information
	age?: number;
	profession:
		| "salaried"
		| "business"
		| "freelancer"
		| "student"
		| "housewife"
		| "other";
	professionType?: string;
	experience?: number;
	maritalStatus: "single" | "married";
	familyMembers: number;
	isPrimaryEarner: boolean;
	otherEarners: number;

	// Financial Information
	housingRent: number;
	loans: number;
	savings: number;
	financialGoals?: string;

	// Embedded Documents
	incomeSources: IIncomeSource[];
	expenses: IExpense[];
	categories: IUserCategory[];

	// Timestamps
	createdAt: Date;
	updatedAt: Date;
}

const IncomeSourceSchema = new Schema({
	sourceType: { type: String, required: true },
	amount: { type: Number, required: true },
	frequency: { type: String, required: true },
	description: String,
	isRecurring: { type: Boolean, default: true },
	date: { type: Date, default: Date.now },
});

const ExpenseSchema = new Schema({
	amount: { type: Number, required: true },
	category: { type: String, required: true },
	subcategory: String,
	description: String,
	date: { type: Date, default: Date.now },
	isBusinessExpense: { type: Boolean, default: false },
	isNecessary: { type: Boolean, default: true },
	tags: [String],
});

const UserCategorySchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	parentCategory: String,
	budgetLimit: Number,
	color: String,
	icon: String,
});

const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		name: String,
		password: { type: String, required: true },

		// Personal Information
		age: Number,
		profession: { type: String, required: true },
		professionType: String,
		experience: Number,
		maritalStatus: { type: String, required: true },
		familyMembers: { type: Number, default: 1 },
		isPrimaryEarner: { type: Boolean, default: true },
		otherEarners: { type: Number, default: 0 },

		// Financial Information
		housingRent: { type: Number, default: 0 },
		loans: { type: Number, default: 0 },
		savings: { type: Number, default: 0 },
		financialGoals: String,

		// Embedded Arrays
		incomeSources: [IncomeSourceSchema],
		expenses: [ExpenseSchema],
		categories: [UserCategorySchema],
	},
	{
		timestamps: true,
	}
);

// Only create indexes on server-side
if (typeof window === "undefined") {
	UserSchema.index({ email: 1 });
	UserSchema.index({ "expenses.date": -1 });
	UserSchema.index({ "incomeSources.date": -1 });
}

export default mongoose.models.User ||
	mongoose.model<IUser>("User", UserSchema);
