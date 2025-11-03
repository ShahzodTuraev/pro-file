/*
  Warnings:

  - You are about to drop the column `countryRegion` on the `location_data` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `visit_list` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `visit_list` table. All the data in the column will be lost.
  - You are about to drop the column `country_region` on the `visit_list` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `visit_list` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `visit_list` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `visit_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."location_data" DROP COLUMN "countryRegion",
ADD COLUMN     "country_region" TEXT;

-- AlterTable
ALTER TABLE "public"."visit_list" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "country_region",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "region";
