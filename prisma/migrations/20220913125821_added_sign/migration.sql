-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "full_name" TEXT NOT NULL,
    "photo_URL" TEXT,
    "email" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "full_name", "id", "photo_URL") SELECT "email", "full_name", "id", "photo_URL" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_full_name_key" ON "User"("full_name");
CREATE UNIQUE INDEX "User_photo_URL_key" ON "User"("photo_URL");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Hobby" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image_URL" TEXT,
    "active" BOOLEAN NOT NULL
);
INSERT INTO "new_Hobby" ("active", "id", "image_URL", "name") SELECT "active", "id", "image_URL", "name" FROM "Hobby";
DROP TABLE "Hobby";
ALTER TABLE "new_Hobby" RENAME TO "Hobby";
CREATE UNIQUE INDEX "Hobby_name_key" ON "Hobby"("name");
CREATE UNIQUE INDEX "Hobby_image_URL_key" ON "Hobby"("image_URL");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
