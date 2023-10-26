-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vitamin" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "alt_name" TEXT NOT NULL,
    "function" TEXT NOT NULL,
    "products" TEXT NOT NULL,
    "is_mineral" BOOLEAN NOT NULL DEFAULT false,
    "favorite_id" INTEGER,

    CONSTRAINT "vitamin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conditions" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "vitamin_id" INTEGER NOT NULL,

    CONSTRAINT "conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combination" (
    "id" SERIAL NOT NULL,
    "positive" TEXT,
    "negative" TEXT,
    "vitamin_id" INTEGER NOT NULL,

    CONSTRAINT "combination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "norm" (
    "id" SERIAL NOT NULL,
    "child" TEXT NOT NULL,
    "men" TEXT NOT NULL,
    "women" TEXT NOT NULL,
    "pregnant" TEXT NOT NULL,
    "vitamin_id" INTEGER NOT NULL,

    CONSTRAINT "norm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_favorites_user_id_key" ON "user_favorites"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "vitamin_category_key" ON "vitamin"("category");

-- CreateIndex
CREATE UNIQUE INDEX "vitamin_favorite_id_key" ON "vitamin"("favorite_id");

-- CreateIndex
CREATE UNIQUE INDEX "conditions_id_key" ON "conditions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "combination_vitamin_id_key" ON "combination"("vitamin_id");

-- CreateIndex
CREATE UNIQUE INDEX "norm_vitamin_id_key" ON "norm"("vitamin_id");

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vitamin" ADD CONSTRAINT "vitamin_favorite_id_fkey" FOREIGN KEY ("favorite_id") REFERENCES "user_favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conditions" ADD CONSTRAINT "conditions_vitamin_id_fkey" FOREIGN KEY ("vitamin_id") REFERENCES "vitamin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combination" ADD CONSTRAINT "combination_vitamin_id_fkey" FOREIGN KEY ("vitamin_id") REFERENCES "vitamin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "norm" ADD CONSTRAINT "norm_vitamin_id_fkey" FOREIGN KEY ("vitamin_id") REFERENCES "vitamin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
