import {
  cookingMethodOptions,
  targetUserOptions,
  usageTypeOptions,
} from "@/features/food-items/constants";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      email: "phamnam079202038134@gmail.com",
    },
    update: {
      role: "ADMIN",
    },
    create: {
      name: "admin",
      email: "phamnam079202038134@gmail.com",
      password: await argon2.hash("161102"),
      role: "ADMIN",
      address: "address",
      phone: "012321321",
    },
  });

  const billboards = [
    {
      name: "BB1",
      imageUrl:
        "https://th.bing.com/th/id/R.a28278b479357259a71ffe51d5cfe557?rik=Fm434IPDLQCqKw&pid=ImgRaw&r=0",
    },
    {
      name: "BB2",
      imageUrl:
        "https://cdn.statically.io/img/sporked.com/wp-content/uploads/2023/05/LISTICLE_CHEESE-LOVERS-SNACKS_HEADER.jpg",
    },
  ];

  for (const billboard of billboards) {
    await prisma.billboard.upsert({
      where: { name: billboard.name },
      update: billboard,
      create: billboard,
    });
  }

  const categories = [
    { name: "Snacks", description: "Các loại đồ ăn vặt" },
    { name: "Đồ ăn nhanh", description: "Các món ăn nhanh" },
    { name: "Đặc sản", description: "Các món đặc sản" },
    { name: "Đồ uống", description: "Các loại thức uống" },
    { name: "Thực phẩm chay", description: "Các món ăn chay" },
    { name: "Bánh kẹo", description: "Các loại bánh và kẹo" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Seed Snacks
  const snacksCategory = await prisma.category.findUnique({
    where: { name: "Snacks" },
  });

  if (snacksCategory) {
    await prisma.foodItem.createMany({
      data: [
        {
          name: "Bánh gạo",
          description:
            "Bánh gạo Play Nutrition sử dụng không chiên dầu, không đường kính và không chất bảo quản. Bánh gạo có thành phần chính là gạo lứt, yến mạch và hạt điều được sấy rang giữ tối đa hàm lượng dinh dưỡng.",
          origin: "Việt Nam",
          size: "Lớn",
          price: 40000,
          targetUsers: targetUserOptions,
          imageUrl:
            "https://cdn.tgdd.vn/Products/Images/3361/316849/bhx/-202312271630527156.jpg",
          categoryId: snacksCategory.id,
          cookingMethod: cookingMethodOptions[0],
          usageType: usageTypeOptions[0],
          quantity: 890,
          sold: 110,
        },
        {
          name: "Khoai tây que",
          description:
            "Khoai tây que giòn rụm, thơm ngon, được chế biến từ khoai tây tươi chất lượng cao.",
          origin: "Việt Nam",
          size: "Vừa",
          price: 25000,
          targetUsers: targetUserOptions,
          imageUrl:
            "https://cdn.tgdd.vn/Products/Images/3364/76440/bhx/khoai-tay-que-vi-bbq-lay-s-stax-lon-100g-202205161435552254.jpg",
          categoryId: snacksCategory.id,
          cookingMethod: cookingMethodOptions[0],
          usageType: usageTypeOptions[0],
          quantity: 750,
          sold: 250,
        },
        {
          name: "Hạt điều rang muối",
          description:
            "Hạt điều được chọn lọc kỹ càng, rang với muối biển tự nhiên, giòn ngon bổ dưỡng.",
          origin: "Bình Phước",
          size: "Nhỏ",
          price: 120000,
          targetUsers: targetUserOptions,
          imageUrl:
            "https://cdn.tgdd.vn/Products/Images/3364/76441/bhx/hat-dieu-rang-muoi-200g-202205161435552254.jpg",
          categoryId: snacksCategory.id,
          cookingMethod: cookingMethodOptions[0],
          usageType: usageTypeOptions[0],
          quantity: 450,
          sold: 50,
        },
      ],
    });
  }

  // Seed Fast Food
  const fastFoodCategory = await prisma.category.findUnique({
    where: { name: "Đồ ăn nhanh" },
  });

  if (fastFoodCategory) {
    await prisma.foodItem.createMany({
      data: [
        {
          name: "Mì xào hải sản",
          description:
            "Mì xào với các loại hải sản tươi ngon, rau củ tươi và sốt đặc biệt.",
          origin: "Việt Nam",
          size: "Lớn",
          price: 55000,
          targetUsers: targetUserOptions,
          imageUrl:
            "https://cdn.tgdd.vn/Products/Images/2289/mi-xao-hai-san-202205161435552254.jpg",
          categoryId: fastFoodCategory.id,
          cookingMethod: cookingMethodOptions[2],
          usageType: usageTypeOptions[1],
          quantity: 200,
          sold: 800,
        },
        {
          name: "Cơm gà xối mỡ",
          description:
            "Cơm gà với da gà giòn rụm, thịt gà mềm ngọt, kèm rau và nước mắm.",
          origin: "Việt Nam",
          size: "Vừa",
          price: 45000,
          targetUsers: targetUserOptions,
          imageUrl:
            "https://cdn.tgdd.vn/Products/Images/2289/com-ga-xoi-mo-202205161435552254.jpg",
          categoryId: fastFoodCategory.id,
          cookingMethod: cookingMethodOptions[1],
          usageType: usageTypeOptions[1],
          quantity: 150,
          sold: 850,
        },
      ],
    });
  }

  // Seed Đặc sản
  const specialtyCategory = await prisma.category.findUnique({
    where: { name: "Đặc sản" },
  });

  if (specialtyCategory) {
    await prisma.foodItem.createMany({
      data: [
        {
          name: "Nem chua Thanh Hóa",
          description:
            "Nem chua truyền thống Thanh Hóa, vị chua ngọt đặc trưng, thơm ngon đậm đà.",
          origin: "Thanh Hóa",
          size: "Vừa",
          price: 15000,
          targetUsers: targetUserOptions,
          imageUrl:
            "https://cdn.tgdd.vn/Products/Images/2289/nem-chua-thanh-hoa-202205161435552254.jpg",
          categoryId: specialtyCategory.id,
          cookingMethod: cookingMethodOptions[0],
          usageType: usageTypeOptions[0],
          quantity: 300,
          sold: 700,
        },
        {
          name: "Chả cá Lã Vọng",
          description:
            "Chả cá truyền thống Hà Nội, làm từ cá lăng tươi ngon, thơm mùi nghệ và mùi thì là.",
          origin: "Hà Nội",
          size: "Lớn",
          price: 250000,
          targetUsers: targetUserOptions,
          imageUrl:
            "https://cdn.tgdd.vn/Products/Images/2289/cha-ca-la-vong-202205161435552254.jpg",
          categoryId: specialtyCategory.id,
          cookingMethod: cookingMethodOptions[2],
          usageType: usageTypeOptions[1],
          quantity: 100,
          sold: 900,
        },
      ],
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
