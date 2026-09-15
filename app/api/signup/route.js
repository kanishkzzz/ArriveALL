"use server";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { usersTable } from "@/lib/schemas/userSchema.js";
// This is a SignUp System which will be using plain javascript and Node.js to handle user registration. I have already created a userSchema I need to create a unique ID when user Registers. 
import { bcrypt } from 'bcryptjs';
async function checkIfUserExists ( username, contact, email ) {
  // Check if a user with the given username, contact, or email already exists
  if(await db.select().from(usersTable).where(eq(usersTable.username, username).or(eq(usersTable.contact, contact)).or(eq(usersTable.email, email))) ) {
    return true;
  }else{
    return false
  }
}

export async function SignUpUser(req, res) {
  if(!req.body.username || !req.body.contact || !req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).JSON.stringify({ message: "All fields are required babua"});
  }

  const { username, contact, email, password, name } = req.body;

  // I need to check whether if this username, contact or mail exists already in the database. If Yes I cant let them register. If No then they must continue;

  if(await checkIfUserExists(username, contact, email)) {
    return res.status(400).JSON.stringify({ message: "User already exists with this credenials"});
  }
  //Hashing the password before storing it in the database for security reasons
  const saltRounds = 10;
  
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // If the user doesn't exist, create a new user with a unique ID
  try {
    const newUser = {
      id: uuidv4(), // Generate a unique ID using uuid
      username: username,
      email: email,
      password: hashedPassword,
      name: name,
      contact: contact
    };
    await db.insert(usersTable).values(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).JSON.stringify({ message: "Internal server error" });
  }
}