/*
  Warnings:

  - Added the required column `otp` to the `otp_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."otp_list" ADD COLUMN     "otp" TEXT NOT NULL;
