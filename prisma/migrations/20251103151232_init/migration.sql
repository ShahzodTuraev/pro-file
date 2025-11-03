/*
  Warnings:

  - You are about to drop the column `lat` on the `location_data` table. All the data in the column will be lost.
  - You are about to drop the column `lon` on the `location_data` table. All the data in the column will be lost.
  - You are about to drop the column `country_code` on the `visit_list` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `visit_list` table. All the data in the column will be lost.
  - You are about to drop the column `lon` on the `visit_list` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `location_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `location_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_region` to the `visit_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `visit_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `visit_list` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."location_data" DROP CONSTRAINT "location_data_temp_connect_id_fkey";

-- AlterTable
ALTER TABLE "public"."location_data" DROP COLUMN "lat",
DROP COLUMN "lon",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "countryRegion" TEXT,
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "visit_id" TEXT,
ALTER COLUMN "temp_connect_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."visit_list" DROP COLUMN "country_code",
DROP COLUMN "lat",
DROP COLUMN "lon",
ADD COLUMN     "country_region" TEXT NOT NULL,
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."location_data" ADD CONSTRAINT "location_data_temp_connect_id_fkey" FOREIGN KEY ("temp_connect_id") REFERENCES "public"."template_connect"("id") ON DELETE SET NULL ON UPDATE CASCADE;
