-- CreateTable
CREATE TABLE "_GuestFollows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuestFollows_AB_unique" ON "_GuestFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_GuestFollows_B_index" ON "_GuestFollows"("B");

-- AddForeignKey
ALTER TABLE "_GuestFollows" ADD CONSTRAINT "_GuestFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuestFollows" ADD CONSTRAINT "_GuestFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
