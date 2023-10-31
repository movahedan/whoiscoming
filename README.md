# Whoiscoming 

The proposed project is a comprehensive office attendance management system, designed to streamline the process of logging and tracking office days for all team members. Divided into two main backend services and two frontend applications, the system ensures a microservices-based architecture that enhances maintainability and scalability. The backend services are built using Nest.js, with one service handling authentication and settings, and the other managing timing table data, all backed by a Postgresql database and Prisma as the ORM. On the frontend, we have two separate Next.js applications, the first frontend app is focused on authentication, while the second handles user settings and office day entries. The entire project is structured as a monorepo using Turborepo, ensuring streamlined workflow and code sharing, with GitHub Actions and Vercel handling the CI/CD pipeline, and an OpenAPI specification in place to auto-generate the data layer for the frontend, ensuring consistency and speeding up the development process. This setup not only facilitates a clear separation of concerns but also provides a robust, scalable, and user-friendly solution to office attendance management.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

#### Apps

- `auth`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app

#### Packages

- `ui`: a stub React component library shared by both `web` and `docs` applications
- `config`: `eslint` and `tsconfig` and `tailwind` configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
