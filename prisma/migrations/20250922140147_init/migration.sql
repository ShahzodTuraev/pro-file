/*
  Warnings:

  - Added the required column `name` to the `pending_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."pending_user" ADD COLUMN     "name" TEXT NOT NULL;
