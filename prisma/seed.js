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

  // 1️⃣ UPSERT COURSES (no deletion)
  const dbmsCourse = await prisma.course.upsert({
    where: { title: "DBMS – Babua Edition" },
    update: {
      description: "Concepts that actually matter in interviews",
      totalLectures: 3,
    },
    create: {
      title: "DBMS – Babua Edition",
      description: "Concepts that actually matter in interviews",
      totalLectures: 3,
    },
  });

  const dsaCourse = await prisma.course.upsert({
    where: { title: "DSA Patterns" },
    update: {
      description: "Pattern-based DSA, no random grinding",
      totalLectures: 3,
    },
    create: {
      title: "DSA Patterns",
      description: "Pattern-based DSA, no random grinding",
      totalLectures: 3,
    },
  });

  // 2️⃣ OPTIONAL: clean only lectures for THESE courses
  await prisma.lecture.deleteMany({
    where: {
      courseId: { in: [dbmsCourse.id, dsaCourse.id] },
    },
  });

  // 3️⃣ RECREATE LECTURES (safe)
  await prisma.lecture.createMany({
    data: [
      {
        courseId: dbmsCourse.id,
        title: "Introduction to DBMS",
        description:
          "What databases are, why DBMS is needed, and real-world use cases.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 1,
      },
      {
        courseId: dbmsCourse.id,
        title: "ER Model",
        description:
          "Entities, attributes, relationships, and ER diagram design.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 2,
      },
      {
        courseId: dbmsCourse.id,
        title: "Relational Model",
        description:
          "Tables, primary keys, foreign keys, and constraints.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 3,
      },

      {
        courseId: dsaCourse.id,
        title: "What are DSA Patterns?",
        description:
          "Why patterns matter and how they simplify problem solving.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 1,
      },
      {
        courseId: dsaCourse.id,
        title: "Two Pointer Pattern",
        description:
          "Solving array and string problems efficiently using two pointers.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 2,
      },
      {
        courseId: dsaCourse.id,
        title: "Sliding Window Pattern",
        description:
          "Handling subarrays and substrings using sliding window technique.",
        videoUrl: "https://www.youtube.com/embed/H9AqFz90yXo",
        order: 3,
      },
    ],
  });

  console.log("✅ Safe seeding completed");
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
