// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { userDB } from "@/lib/server/dbOperations";

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

		// Basic validation
		if (!email || !password || !name || !profession || !maritalStatus) {
			return NextResponse.json(
				{ error: "Missing required fields" },
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
		const user = await userDB.createUser({
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
					id: user._id,
					email: user.email,
					name: user.name,
					profession: user.profession,
				},
			},
			{ status: 201 }
		);
	} catch (error: unknown) {
		console.error("Registration error:", error);

		if (error.message.includes("already exists")) {
			return NextResponse.json({ error: error.message }, { status: 409 });
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
