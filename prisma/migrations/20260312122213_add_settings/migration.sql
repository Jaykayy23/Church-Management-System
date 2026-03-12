-- CreateTable
CREATE TABLE "app_settings" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "church_name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'Africa/Accra',
    "currency" TEXT NOT NULL DEFAULT 'GHS',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "app_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_settings_slug_key" ON "app_settings"("slug");
