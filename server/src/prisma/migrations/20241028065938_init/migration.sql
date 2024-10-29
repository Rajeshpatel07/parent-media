-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pname" TEXT NOT NULL,
    "sname" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "sclass" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "society" TEXT,
    "cardImage" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "circle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "circle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "replycount" INTEGER NOT NULL DEFAULT 0,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "circleId" TEXT,
    "parentId" TEXT,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserCircles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserCircles_AB_unique" ON "_UserCircles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCircles_B_index" ON "_UserCircles"("B");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "circle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCircles" ADD CONSTRAINT "_UserCircles_A_fkey" FOREIGN KEY ("A") REFERENCES "circle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCircles" ADD CONSTRAINT "_UserCircles_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
