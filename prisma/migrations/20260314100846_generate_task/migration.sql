/*
  Warnings:

  - The `edit` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "edit",
ADD COLUMN     "edit" BOOLEAN NOT NULL DEFAULT false;
