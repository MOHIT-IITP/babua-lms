import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DIRECT_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  console.log("🌱 Safe seeding database...");

  // ===============================
  // 1️⃣ UPSERT COURSES (safe)
  // ===============================

  const dbmsCourse = await prisma.course.upsert({
    where: { title: "DBMS – Babua Edition" },
    update: {
      description: "Concepts that actually matter in interviews",
      totalLectures: 3,
      difficulty: "BEGINNER",
    },
    create: {
      title: "DBMS – Babua Edition",
      description: "Concepts that actually matter in interviews",
      totalLectures: 3,
      difficulty: "BEGINNER",
    },
  });

  const dsaCourse = await prisma.course.upsert({
    where: { title: "DSA Patterns" },
    update: {
      description: "Pattern-based DSA, no random grinding",
      totalLectures: 3,
      difficulty: "INTERMEDIATE",
    },
    create: {
      title: "DSA Patterns",
      description: "Pattern-based DSA, no random grinding",
      totalLectures: 3,
      difficulty: "INTERMEDIATE",
    },
  });

  // ===============================
  // 2️⃣ REMOVE ONLY LECTURES
  // ===============================

  await prisma.lecture.deleteMany({
    where: {
      courseId: { in: [dbmsCourse.id, dsaCourse.id] },
    },
  });

  // ===============================
  // 3️⃣ RECREATE LECTURES (with takeaways)
  // ===============================

  await prisma.lecture.createMany({
    data: [
      // ---------- DBMS ----------
      {
        courseId: dbmsCourse.id,
        title: "Introduction to DBMS",
        description:
          "What databases are, why DBMS is needed, and real-world use cases.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 1,
        takeaways: [
          "What a database is",
          "Why DBMS is required",
          "Real-world DBMS examples",
        ],
      },
      {
        courseId: dbmsCourse.id,
        title: "ER Model",
        description:
          "Entities, attributes, relationships, and ER diagram design.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 2,
        takeaways: [
          "Entity and attribute concepts",
          "Relationship types",
          "ER diagram design rules",
        ],
      },
      {
        courseId: dbmsCourse.id,
        title: "Relational Model",
        description:
          "Tables, primary keys, foreign keys, and constraints.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 3,
        takeaways: [
          "Tables and schemas",
          "Primary vs foreign keys",
          "Integrity constraints",
        ],
      },

      // ---------- DSA ----------
      {
        courseId: dsaCourse.id,
        title: "What are DSA Patterns?",
        description:
          "Why patterns matter and how they simplify problem solving.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 1,
        takeaways: [
          "What problem-solving patterns are",
          "Why patterns reduce complexity",
          "How patterns help in interviews",
        ],
      },
      {
        courseId: dsaCourse.id,
        title: "Two Pointer Pattern",
        description:
          "Solving array and string problems efficiently using two pointers.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 2,
        takeaways: [
          "When to use two pointers",
          "Left-right pointer strategy",
          "Common interview problems",
        ],
      },
      {
        courseId: dsaCourse.id,
        title: "Sliding Window Pattern",
        description:
          "Handling subarrays and substrings using sliding window technique.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 3,
        takeaways: [
          "Fixed vs variable window",
          "Optimizing subarray problems",
          "Time complexity benefits",
        ],
      },
    ],
  });

  console.log("✅ Safe seeding completed successfully");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
