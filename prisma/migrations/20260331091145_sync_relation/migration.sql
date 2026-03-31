-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_KhodamRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "khodamId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "KhodamRecord_khodamId_fkey" FOREIGN KEY ("khodamId") REFERENCES "Khodam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_KhodamRecord" ("createdAt", "id", "khodamId", "userName") SELECT "createdAt", "id", "khodamId", "userName" FROM "KhodamRecord";
DROP TABLE "KhodamRecord";
ALTER TABLE "new_KhodamRecord" RENAME TO "KhodamRecord";
CREATE INDEX "KhodamRecord_userName_idx" ON "KhodamRecord"("userName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
