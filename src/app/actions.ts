"use server";

import { prisma } from "@/lib/prisma";
import { generateDeterministicKhodamId, KHODAMS } from "@/lib/khodams";
import { revalidatePath } from "next/cache";

export async function checkKhodam(name: string) {
  const trimmedName = name.trim();
  if (!trimmedName) return null;

  // 1. Check if name exists in DB
  let record = await prisma.khodamRecord.findFirst({
    where: { userName: { equals: trimmedName } },
  });

  let khodamId;
  if (record) {
    khodamId = record.khodamId;
  } else {
    // 2. Generate and save
    khodamId = generateDeterministicKhodamId(trimmedName);
    record = await prisma.khodamRecord.create({
      data: {
        userName: trimmedName,
        khodamId: khodamId,
      },
    });
  }

  const khodam = KHODAMS.find((k) => k.id === khodamId);
  revalidatePath("/");
  return { record, khodam };
}

export async function getHistory() {
  return await prisma.khodamRecord.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}
