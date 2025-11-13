import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const categories = [
  "Food",
  "Rent",
  "Salary",
  "Investment",
  "Dividends",
  "Utilities",
  "Entertainment",
  "Transportation",
  "Healthcare",
  "Education",
  "Shopping",
  "Travel",
  "Miscellaneous",
  "Other",
];

async function seed() {
  const transactions = [];

  for (let i = 0; i < 10; i++) {
    const created_at = faker.date.between({
      from: new Date("2025-10-29"),
      to: new Date("2025-11-01"),
    });
    let type,
      category = null;
    const typeBias = Math.random();
    if (typeBias < 0.8) {
      type = "Expense";
      category = faker.helpers.arrayElement(categories);
    } else if (typeBias < 0.9) {
      type = "Income";
    } else if (typeBias < 0.95) {
      type = "Saving";
    } else {
      type = "Investment";
    }
    let amount;
    switch (type) {
      case "Income":
        amount = faker.number.int({ min: 2000, max: 6000 });
        break;
      case "Expense":
        amount = faker.number.int({ min: 2, max: 500 });
        break;
      case "Investment":
        amount = faker.number.int({ min: 1000, max: 2000 });
        break;
      case "Saving":
        amount = faker.number.int({ min: 3000, max: 10000 });
        break;
    }
    transactions.push({
      amount,
      type,
      description: faker.lorem.sentence(),
      category: category || null,
      created_at: created_at.toISOString(),
    });
  }

  const { error } = await supabase.from("transactions").insert(transactions);
  if (error) {
    console.error("Error seeding data:", error);
  } else {
    console.log("Data seeded successfully!");
  }
}

seed().catch(console.error);
