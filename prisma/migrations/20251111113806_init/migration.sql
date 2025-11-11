-- DropForeignKey
ALTER TABLE "public"."user_list" DROP CONSTRAINT "user_list_visit_id_fkey";

-- AlterTable
ALTER TABLE "public"."user_list" ALTER COLUMN "visit_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."user_list" ADD CONSTRAINT "user_list_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "public"."visit_list"("id") ON DELETE SET NULL ON UPDATE CASCADE;
