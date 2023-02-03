create table "public"."Assignment" (
    "id" text not null,
    "name" text not null,
    "pdfFileUrl" text not null,
    "creatorId" text not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP
);


alter table "public"."User" add column "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP;

alter table "public"."User" add column "updatedAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP;

CREATE UNIQUE INDEX "Assignment_pkey" ON public."Assignment" USING btree (id);

alter table "public"."Assignment" add constraint "Assignment_pkey" PRIMARY KEY using index "Assignment_pkey";

alter table "public"."Assignment" add constraint "Assignment_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Assignment" validate constraint "Assignment_creatorId_fkey";


