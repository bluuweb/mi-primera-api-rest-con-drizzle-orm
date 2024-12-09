import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import type { InsertUser } from "../db/schema";
import { usersTable } from "../db/schema";

const createUser = async (user: InsertUser) => {
  const [findUser] = await getUserByEmail(user.email);

  if (findUser) {
    throw new Error("User with this email already exists");
  }

  return await db
    .insert(usersTable)
    .values(user)
    .returning({ insertedId: usersTable.id, username: usersTable.name });
};

const getUsers = async () => {
  return await db.select().from(usersTable);
};

const getUserById = async (id: number) => {
  return await db.select().from(usersTable).where(eq(usersTable.id, id));
};

const getUserByEmail = async (email: string) => {
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
};

export const userService = {
  createUser,
  getUsers,
  getUserById,
};
