import { NextResponse } from "next/server";
import { userOperations } from "@/lib/dbOperations";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const {
			email,
			password,
			name,
			profession,
			professionType,
			experience,
			maritalStatus,
			familyMembers,
		} = body;

		// Validation
		if (!email || !password || !name) {
			return NextResponse.json(
				{ error: "Email, password, and name are required" },
				{ status: 400 }
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{ error: "Password must be at least 6 characters" },
				{ status: 400 }
			);
		}

		// Create user
		const user = await userOperations.createUser({
			email,
			password,
			name,
			profession,
			professionType,
			experience,
			maritalStatus,
			familyMembers,
		});

		return NextResponse.json(
			{
				message: "User created successfully",
				user: {
					id: user._id.toString(),
					email: user.email,
					name: user.name,
					profession: user.profession,
				},
			},
			{ status: 201 }
		);
	} catch (error: any) {
		console.error("Registration error:", error);

		if (error.message.includes("already exists")) {
			return NextResponse.json(
				{ error: "User already exists with this email" },
				{ status: 409 }
			);
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
