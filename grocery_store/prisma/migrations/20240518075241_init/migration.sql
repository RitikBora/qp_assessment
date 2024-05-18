-- CreateTable
CREATE TABLE "grocery_items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 10
);

-- CreateIndex
CREATE UNIQUE INDEX "grocery_items_id_key" ON "grocery_items"("id");
