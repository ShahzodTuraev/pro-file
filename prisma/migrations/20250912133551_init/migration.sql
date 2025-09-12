-- CreateEnum
CREATE TYPE "public"."General_status" AS ENUM ('ACTIVE', 'PAUSED', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."User_role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."Key_status" AS ENUM ('ISSUED', 'ACTIVE', 'EXPIRED');

-- CreateTable
CREATE TABLE "public"."user_list" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."User_role" NOT NULL DEFAULT 'ADMIN',
    "status" "public"."General_status" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_list_email_key" ON "public"."user_list"("email");
