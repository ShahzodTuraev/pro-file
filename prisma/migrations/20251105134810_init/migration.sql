/*
  Warnings:

  - You are about to drop the column `city` on the `location_data` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `location_data` table. All the data in the column will be lost.
  - You are about to drop the column `country_region` on the `location_data` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `location_data` table. All the data in the column will be lost.
  - You are about to drop the column `visit_id` on the `location_data` table. All the data in the column will be lost.
  - Made the column `temp_connect_id` on table `location_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `location_data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `location_data` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."location_data" DROP CONSTRAINT "location_data_temp_connect_id_fkey";

-- AlterTable
ALTER TABLE "public"."location_data" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "country_region",
DROP COLUMN "region",
DROP COLUMN "visit_id",
ALTER COLUMN "temp_connect_id" SET NOT NULL,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."visit_list" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "country_region" TEXT,
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT,
ADD COLUMN     "region" TEXT;

-- AddForeignKey
ALTER TABLE "public"."location_data" ADD CONSTRAINT "location_data_temp_connect_id_fkey" FOREIGN KEY ("temp_connect_id") REFERENCES "public"."template_connect"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
