import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, enquiries, InsertEnquiry } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Enquiry queries
export async function getAllEnquiries() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get enquiries: database not available");
    return [];
  }

  try {
    const result = await db.select().from(enquiries).orderBy((t) => desc(t.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get enquiries:", error);
    throw error;
  }
}

export async function getEnquiryById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get enquiry: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(enquiries).where(eq(enquiries.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get enquiry:", error);
    throw error;
  }
}

export async function createEnquiry(data: InsertEnquiry) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create enquiry: database not available");
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(enquiries).values(data);
    const id = result[0]?.insertId as number;
    return await getEnquiryById(id);
  } catch (error) {
    console.error("[Database] Failed to create enquiry:", error);
    throw error;
  }
}

export async function updateEnquiry(id: number, data: Partial<InsertEnquiry>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update enquiry: database not available");
    throw new Error("Database not available");
  }

  try {
    await db.update(enquiries).set(data).where(eq(enquiries.id, id));
    return await getEnquiryById(id);
  } catch (error) {
    console.error("[Database] Failed to update enquiry:", error);
    throw error;
  }
}

export async function deleteEnquiry(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete enquiry: database not available");
    throw new Error("Database not available");
  }

  try {
    const result = await db.delete(enquiries).where(eq(enquiries.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete enquiry:", error);
    throw error;
  }
}
