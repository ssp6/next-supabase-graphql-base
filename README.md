## Getting Started
1. Set the `.env.local` file with variables from `mock.env` file
2. Start the Supabase API server and db with `yarn api:start`
3. Update the local db with `yarn db:migrate:prisma`
4. Ensure have db types using `prisma db:generate`
5. Start the app! `yarn dev`


View the app - [http://localhost:3000](http://localhost:3000)

View the supabase dashboard - [http://localhost:54323](http://localhost:54323)

## Updating the db
To update the db first make changes to the prisma schema file at `src/backend/prisma/schema.prisma`

Then run `yarn db:migrate:prisma` to update the db.

To create a supabase migration file run `yarn db:migrate:supabase ${NAME_OF_MIGRATION}`

It's a bit complex but there are 2 migration files, one for prisma and one for supabase. 
The supabase migration file is what will be used to update the db on the supabase server.

### GraphQL
To make use of any changes in the db you will likely need to make changes to the graphql.

First edit the `src/backend/graphql/schema.graphql` file to add any new types or fields.

Then update the queries/mutations you're going to use in the app (these are in `src/domain/**/graphql/`)
