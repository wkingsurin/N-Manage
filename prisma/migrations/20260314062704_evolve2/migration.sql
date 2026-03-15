/*
  Warnings:

  - Added the required column `edit` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" ADD COLUMN     "edit" TEXT NOT NULL;
