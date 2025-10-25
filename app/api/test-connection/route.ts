// src/app/api/test-connection/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
	try {
		await connectDB();

		const connectionState = mongoose.connection.readyState;
		const states = {
			0: "disconnected",
			1: "connected",
			2: "connecting",
			3: "disconnecting",
		};

		return NextResponse.json({
			success: true,
			connected: connectionState === 1,
			connectionState: states[connectionState],
			message: "MongoDB connection test completed",
			timestamp: new Date().toISOString(),
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				connected: false,
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
