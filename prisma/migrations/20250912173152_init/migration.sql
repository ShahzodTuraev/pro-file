/*
  Warnings:

  - Added the required column `city` to the `visit_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."visit_list" ADD COLUMN     "city" TEXT NOT NULL;
