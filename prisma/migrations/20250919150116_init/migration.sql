-- DropForeignKey
ALTER TABLE "public"."otp_list" DROP CONSTRAINT "otp_list_visit_id_fkey";

-- AlterTable
ALTER TABLE "public"."otp_list" ALTER COLUMN "visit_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."otp_list" ADD CONSTRAINT "otp_list_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "public"."visit_list"("id") ON DELETE SET NULL ON UPDATE CASCADE;
