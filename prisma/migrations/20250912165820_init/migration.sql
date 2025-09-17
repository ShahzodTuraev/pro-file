/*
  Warnings:

  - You are about to drop the column `view_cnt` on the `template_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."template_data" DROP COLUMN "view_cnt";

-- CreateTable
CREATE TABLE "public"."view_list" (
    "id" TEXT NOT NULL,
    "visit_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "view_list_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."view_list" ADD CONSTRAINT "view_list_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "public"."visit_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
