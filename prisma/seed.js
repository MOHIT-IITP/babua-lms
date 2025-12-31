import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DIRECT_URL,
});


const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.course.deleteMany();
  await prisma.course.createMany({
    data: [
      {
        title: "DBMS – Babua Edition",
        description: "Concepts that actually matter in interviews",
        totalLectures: 10,
      },
      {
        title: "DSA Patterns",
        description: "Pattern-based DSA, no random grinding",
        totalLectures: 15,
      },
    ],
  });

  console.log("Seeded successfully 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
