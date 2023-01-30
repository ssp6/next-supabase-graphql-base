import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/api/graphql',
  documents: 'src/domain/**/*.graphql',
  generates: {
    'src/domain/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
      hooks: { afterOneFileWrite: ['yarn eslint src/domain/graphql --fix'] },
    },
    'src/domain/graphql/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
