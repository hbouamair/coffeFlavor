-- CreateTable
CREATE TABLE "CoffeeFlavor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CoffeeFlavor_pkey" PRIMARY KEY ("id")
);
