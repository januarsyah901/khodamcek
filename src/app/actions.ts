"use server";

import { prisma } from "@/lib/prisma";
import { generateDeterministicKhodamId } from "@/lib/khodams";
import { revalidatePath } from "next/cache";

// --- KHODAM REGISTRY LOGIC ---

export async function checkKhodam(name: string) {
  const trimmedName = name.trim();
  if (!trimmedName) return null;

  // 1. Check if name exists in DB
  let record = await prisma.khodamRecord.findFirst({
    where: { userName: { equals: trimmedName } },
  });

  let khodamId;
  const allKhodams = await prisma.khodam.findMany({
    orderBy: { id: "asc" },
  });

  if (record) {
    khodamId = record.khodamId;
  } else {
    // 2. Generate and save
    if (allKhodams.length === 0) return null;
    khodamId = generateDeterministicKhodamId(trimmedName, allKhodams.length, allKhodams.map(k => k.id));
    record = await prisma.khodamRecord.create({
      data: {
        userName: trimmedName,
        khodamId: khodamId,
      },
    });
  }

  const khodam = allKhodams.find((k) => k.id === khodamId);
  revalidatePath("/");
  return { record, khodam };
}

export async function getHistory() {
  return await prisma.khodamRecord.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { khodam: true },
  });
}

// --- DASHBOARD CRUD LOGIC ---

export async function getAllKhodams() {
  return await prisma.khodam.findMany({
    orderBy: { id: "desc" },
  });
}

export async function createKhodam(data: { name: string; description: string; type?: string }) {
  const khodam = await prisma.khodam.create({
    data,
  });
  revalidatePath("/dashboard");
  revalidatePath("/");
  return khodam;
}

export async function updateKhodam(id: number, data: { name: string; description: string; type?: string }) {
  const khodam = await prisma.khodam.update({
    where: { id },
    data,
  });
  revalidatePath("/dashboard");
  revalidatePath("/");
  return khodam;
}

export async function deleteKhodam(id: number) {
  await prisma.khodam.delete({
    where: { id },
  });
  revalidatePath("/dashboard");
  revalidatePath("/");
}
