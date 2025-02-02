-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Borrow', 'Return');

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "deadline" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
