-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImprssnBook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "endAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImprssnBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imprssn" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "imprssnBookId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Imprssn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ImprssnBookToUser" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ImprssnBookToUser_AB_unique" ON "_ImprssnBookToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ImprssnBookToUser_B_index" ON "_ImprssnBookToUser"("B");

-- AddForeignKey
ALTER TABLE "Imprssn" ADD CONSTRAINT "Imprssn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imprssn" ADD CONSTRAINT "Imprssn_imprssnBookId_fkey" FOREIGN KEY ("imprssnBookId") REFERENCES "ImprssnBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImprssnBookToUser" ADD CONSTRAINT "_ImprssnBookToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ImprssnBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImprssnBookToUser" ADD CONSTRAINT "_ImprssnBookToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
