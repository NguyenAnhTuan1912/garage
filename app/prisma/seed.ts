import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

import { PrismaClient, Role } from "@prisma/client";

// 1. Tạo kết nối pool bằng thư viện 'pg'
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Khởi tạo adapter
const adapter = new PrismaPg(pool);

// 3. Truyền adapter vào PrismaClient (Đây là argument nó đang mong đợi)
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("--- Đang khởi tạo dữ liệu mẫu ---");

  // 1. Tạo User Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@garage.com" },
    update: {},
    create: {
      email: "admin@garage.com",
      username: "admin",
      hashedPassword: "$2a$12$Dy/behDIasBJ4dvO57jXm.9Wv7yxtMDP663A5tvGwL2ewQXQjRswK",
      fullName: "System Administrator",
      displayName: "System Administrator",
      role: Role.ADMIN,
      updatedAt: new Date(),
    },
  });

  // 2. Tạo User thường
  const user = await prisma.user.upsert({
    where: { email: "nguyenanhtuan19122002@gmail.com" },
    update: {},
    create: {
      email: "nguyenanhtuan19122002@gmail.com",
      username: "anhtuan1912",
      hashedPassword: "$2a$12$aHwg0jY6lnLYS0cTKgMULe02ZkkH2hstG73JL6owc4HwrNVEsgw2a",
      fullName: "Nguyen Anh Tuan",
      displayName: "Nguyen Anh Tuan",
      role: Role.USER,
      updatedAt: new Date(),
    },
  });

  console.log({ admin, user });
  console.log("--- Seed hoàn tất! ---");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
