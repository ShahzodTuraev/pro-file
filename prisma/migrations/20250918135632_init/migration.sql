-- CreateEnum
CREATE TYPE "public"."Auth_type" AS ENUM ('GOOGLE', 'EMAIL_PASS');

-- AlterTable
ALTER TABLE "public"."user_list" ADD COLUMN     "auth_type" "public"."Auth_type" NOT NULL DEFAULT 'EMAIL_PASS',
ADD COLUMN     "img_url" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
