/*
  Warnings:

  - You are about to drop the column `link` on the `user_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."user_list" DROP COLUMN "link",
ADD COLUMN     "name" TEXT;
