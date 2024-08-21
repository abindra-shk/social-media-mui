import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import UserModel from "@/models/user";

interface RequestBody {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { username, email, password }: RequestBody = await req.json();

    // Validate email format and password length
    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      return NextResponse.json(
        { message: "Invalid input - password should be at least 7 characters long and email should be valid." },
        { status: 422 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Check if the username or email already exists
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username or email already taken." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    await UserModel.create({ username, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
