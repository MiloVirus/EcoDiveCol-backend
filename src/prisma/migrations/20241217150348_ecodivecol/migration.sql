-- CreateTable
CREATE TABLE "Usuarios" (
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "PADL_NAU" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "DiveShop" (
    "diveshop_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "DiveShop_pkey" PRIMARY KEY ("diveshop_id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "booking_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "diveshop_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "review_id" TEXT NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "diveshop_id" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "Actividades" (
    "actividad_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "diveshop_id" TEXT NOT NULL,

    CONSTRAINT "Actividades_pkey" PRIMARY KEY ("actividad_id")
);

-- CreateTable
CREATE TABLE "Logros" (
    "logro_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Logros_pkey" PRIMARY KEY ("logro_id")
);

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuarios"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_diveshop_id_fkey" FOREIGN KEY ("diveshop_id") REFERENCES "DiveShop"("diveshop_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuarios"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_diveshop_id_fkey" FOREIGN KEY ("diveshop_id") REFERENCES "DiveShop"("diveshop_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividades" ADD CONSTRAINT "Actividades_diveshop_id_fkey" FOREIGN KEY ("diveshop_id") REFERENCES "DiveShop"("diveshop_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logros" ADD CONSTRAINT "Logros_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuarios"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
