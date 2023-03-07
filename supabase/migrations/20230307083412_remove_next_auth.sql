alter table "public"."Account" drop constraint "Account_userId_fkey";

alter table "public"."Session" drop constraint "Session_userId_fkey";

alter table "public"."Account" drop constraint "Account_pkey";

alter table "public"."Session" drop constraint "Session_pkey";

drop index if exists "public"."Account_pkey";

drop index if exists "public"."Account_provider_providerAccountId_key";

drop index if exists "public"."Session_pkey";

drop index if exists "public"."Session_sessionToken_key";

drop index if exists "public"."User_email_key";

drop index if exists "public"."VerificationToken_identifier_token_key";

drop index if exists "public"."VerificationToken_token_key";

drop table "public"."Account";

drop table "public"."Session";

drop table "public"."VerificationToken";

alter table "public"."User" drop column "email";

alter table "public"."User" drop column "emailVerified";

alter table "public"."User" drop column "image";

alter table "public"."User" alter column "name" set not null;


