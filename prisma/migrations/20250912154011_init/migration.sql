/*
  Warnings:

  - Added the required column `visit_id` to the `user_list` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Template_type" AS ENUM ('ISSUED', 'ACTIVE', 'EXPIRED');

-- AlterTable
ALTER TABLE "public"."user_list" ADD COLUMN     "visit_id" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."Key_status";

-- CreateTable
CREATE TABLE "public"."visit_list" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lon" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visit_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."template_list" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."Template_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "template_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sns_list" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sns_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."template_connect" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "main" TEXT NOT NULL,
    "status" "public"."General_status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "template_connect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."location_data" (
    "id" TEXT NOT NULL,
    "temp_connect_id" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lon" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sns_data" (
    "id" TEXT NOT NULL,
    "sns_id" TEXT NOT NULL,
    "temp_connect_id" TEXT NOT NULL,
    "user_link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sns_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."template_data" (
    "id" TEXT NOT NULL,
    "temp_connect_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "img_url" TEXT,
    "phone_num" TEXT,
    "fax" TEXT,
    "sns_data_id" TEXT,
    "location_id" TEXT,
    "view_cnt" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "template_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."user_list" ADD CONSTRAINT "user_list_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "public"."visit_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."template_connect" ADD CONSTRAINT "template_connect_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."template_connect" ADD CONSTRAINT "template_connect_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."template_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location_data" ADD CONSTRAINT "location_data_temp_connect_id_fkey" FOREIGN KEY ("temp_connect_id") REFERENCES "public"."template_connect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sns_data" ADD CONSTRAINT "sns_data_sns_id_fkey" FOREIGN KEY ("sns_id") REFERENCES "public"."sns_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sns_data" ADD CONSTRAINT "sns_data_temp_connect_id_fkey" FOREIGN KEY ("temp_connect_id") REFERENCES "public"."template_connect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."template_data" ADD CONSTRAINT "template_data_temp_connect_id_fkey" FOREIGN KEY ("temp_connect_id") REFERENCES "public"."template_connect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."template_data" ADD CONSTRAINT "template_data_sns_data_id_fkey" FOREIGN KEY ("sns_data_id") REFERENCES "public"."sns_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."template_data" ADD CONSTRAINT "template_data_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
