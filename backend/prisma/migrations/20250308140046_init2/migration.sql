/*
  Warnings:

  - You are about to drop the `_BlogDislikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LikeType" AS ENUM ('LIKE', 'DISLIKE');

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
CREATE TABLE "BlogLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "type" "LikeType" NOT NULL,

    CONSTRAINT "BlogLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogLike_userId_blogId_key" ON "BlogLike"("userId", "blogId");

-- AddForeignKey
ALTER TABLE "BlogLike" ADD CONSTRAINT "BlogLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogLike" ADD CONSTRAINT "BlogLike_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
