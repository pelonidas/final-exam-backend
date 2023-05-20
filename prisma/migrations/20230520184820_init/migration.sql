-- CreateTable
CREATE TABLE "place" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "title" TEXT,
    "image" TEXT,
    "type" TEXT,
    "place_location_id" UUID,

    CONSTRAINT "place_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_location" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longtitude" DOUBLE PRECISION,

    CONSTRAINT "place_location_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "title" TEXT,
    "done" BOOLEAN NOT NULL,
    "description" TEXT,
    "priority" TEXT,

    CONSTRAINT "todo_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user__index" ON "user"("email");

-- AddForeignKey
ALTER TABLE "place" ADD CONSTRAINT "place_place_location_id_fk" FOREIGN KEY ("place_location_id") REFERENCES "place_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "place" ADD CONSTRAINT "place_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
