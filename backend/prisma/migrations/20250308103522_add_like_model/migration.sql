/*
  Warnings:

  - You are about to drop the `_BlogDislikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlogDislikes" DROP CONSTRAINT "_BlogDislikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogDislikes" DROP CONSTRAINT "_BlogDislikes_B_fkey";

-- DropForeignKey
ALTER TABLE "_BlogLikes" DROP CONSTRAINT "_BlogLikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogLikes" DROP CONSTRAINT "_BlogLikes_B_fkey";

-- DropTable
DROP TABLE "_BlogDislikes";

-- DropTable
DROP TABLE "_BlogLikes";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_blogId_key" ON "Like"("userId", "blogId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
