-- CreateTable
CREATE TABLE "public"."pending_user" (
    "id" TEXT NOT NULL,
    "visit_id" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pending_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."pending_user" ADD CONSTRAINT "pending_user_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "public"."visit_list"("id") ON DELETE SET NULL ON UPDATE CASCADE;
