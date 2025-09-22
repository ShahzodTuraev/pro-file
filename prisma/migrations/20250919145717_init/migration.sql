-- CreateTable
CREATE TABLE "public"."otp_list" (
    "id" TEXT NOT NULL,
    "visit_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expire_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_list_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."otp_list" ADD CONSTRAINT "otp_list_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "public"."visit_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
