---
applyTo: "**/nx.json,**/workspace.json,**/project.json,**/package.json,**/tsconfig*.json,**/*.config.js,**/*.config.ts"
---

# Nx Workspace Instructions

## Purpose

This instruction provides comprehensive guidelines for managing Nx monorepos, covering workspace configuration, project organization, library creation, build optimization, and development workflow best practices for scalable TypeScript applications.

## Workspace Organization

### Project Structure
- Organize projects by domain or feature areas
- Separate applications from libraries clearly
- Use consistent naming conventions across the workspace
- Group related projects in appropriate directories

```
workspace/
├── apps/
│   ├── web-app/                    # Angular application
│   ├── api/                        # NestJS API
│   ├── mobile-app/                 # React Native app
│   └── admin-dashboard/            # Angular admin app
├── libs/
│   ├── shared/
│   │   ├── data-access/           # State management, API services
│   │   ├── ui/                    # Reusable UI components
│   │   ├── utils/                 # Utility functions
│   │   └── models/                # TypeScript interfaces/types
│   ├── feature/
│   │   ├── user-management/       # User feature library
│   │   ├── product-catalog/       # Product feature library
│   │   └── reporting/             # Reporting feature library
│   └── domain/
│       ├── auth/                  # Authentication domain
│       ├── payments/              # Payments domain
│       └── analytics/             # Analytics domain
└── tools/
    ├── workspace-plugin/          # Custom Nx plugin
    └── scripts/                   # Build and deployment scripts
```

### Library Types and Organization
- **Feature Libraries**: Complete business use cases
- **Data Access Libraries**: State management and API interactions
- **UI Libraries**: Reusable components and design systems
- **Utility Libraries**: Pure functions and helper utilities

```typescript
// Example library structure
libs/
├── feature/
│   └── user-management/
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/
│       │   │   ├── services/
│       │   │   ├── state/
│       │   │   └── user-management.module.ts
│       │   └── index.ts
│       ├── project.json
│       ├── tsconfig.json
│       └── README.md
```

## Project Configuration

### Nx Configuration
- Configure nx.json for workspace-wide settings
- Set up proper task pipelines and caching
- Configure affected command optimization
- Use tags for project categorization

```json
{
  "extends": "nx/presets/npm.json",
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"],
        "parallel": 3,
        "runtimeCacheInputs": ["node -v"]
      }
    }
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    },
    "test": {
      "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"]
    },
    "lint": {
      "inputs": ["default", "{workspaceRoot}/.eslintrc.json"]
    }
  },
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/.eslintrc.json"
    ],
    "sharedGlobals": []
  },
  "generators": {
    "@nx/angular:application": {
      "style": "scss",
      "linter": "eslint",
      "unitTestRunner": "jest",
      "e2eTestRunner": "cypress"
    },
    "@nx/angular:library": {
      "linter": "eslint",
      "unitTestRunner": "jest"
    }
  }
}
```

### Project Configuration
- Define clear build, test, and lint targets
- Configure proper dependencies between projects
- Set up environment-specific configurations

```json
{
  "name": "user-management",
  "projectType": "library",
  "sourceRoot": "libs/feature/user-management/src",
  "targets": {
    "build": {
      "executor": "@nx/angular:ng-packagr-lite",
      "outputs": ["{workspaceRoot}/dist/libs/feature/user-management"],
      "options": {
        "project": "libs/feature/user-management/ng-package.json"
      }
    },
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/libs/feature/user-management"],
      "options": {
        "jestConfig": "libs/feature/user-management/jest.config.ts",
        "passWithNoTests": true
      }
    },
    "lint": {
      "executor": "@nx/linter:eslint",
      "options": {
        "lintFilePatterns": ["libs/feature/user-management/**/*.ts"]
      }
    }
  },
  "tags": ["scope:feature", "type:feature"]
}
```

## Library Creation and Management

### Creating Libraries
- Use Nx generators for consistent library creation
- Follow established naming conventions
- Configure proper tags for dependency rules
- Set up barrel exports correctly

```bash
# Create feature library
nx generate @nx/angular:library feature-user-management --directory=libs/feature/user-management --importPath=@workspace/feature/user-management --tags=scope:feature,type:feature

# Create shared UI library
nx generate @nx/angular:library shared-ui --directory=libs/shared/ui --importPath=@workspace/shared/ui --tags=scope:shared,type:ui

# Create data access library
nx generate @nx/angular:library shared-data-access --directory=libs/shared/data-access --importPath=@workspace/shared/data-access --tags=scope:shared,type:data-access
```

### Library Architecture
- Design libraries with clear public APIs
- Use barrel exports to control what is exposed
- Implement proper dependency injection
- Follow single responsibility principle

```typescript
// libs/shared/ui/src/index.ts
export * from './lib/components/button/button.component';
export * from './lib/components/card/card.component';
export * from './lib/components/modal/modal.component';
export * from './lib/directives/highlight/highlight.directive';
export * from './lib/pipes/currency/currency.pipe';
export * from './lib/shared-ui.module';

// libs/shared/ui/src/lib/shared-ui.module.ts
@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    ModalComponent,
    HighlightDirective,
    CurrencyPipe
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    CardComponent,
    ModalComponent,
    HighlightDirective,
    CurrencyPipe
  ]
})
export class SharedUiModule {}
```

## Dependency Management

### Dependency Rules
- Configure linting rules to enforce architectural constraints
- Use tags to control library dependencies
- Prevent circular dependencies
- Ensure proper layering

```json
// .eslintrc.json
{
  "extends": ["@nx/workspace"],
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "enforceBuildableLibDependency": true,
        "allow": [],
        "depConstraints": [
          {
            "sourceTag": "scope:shared",
            "onlyDependOnLibsWithTags": ["scope:shared"]
          },
          {
            "sourceTag": "scope:feature",
            "onlyDependOnLibsWithTags": ["scope:shared", "scope:feature"]
          },
          {
            "sourceTag": "type:app",
            "onlyDependOnLibsWithTags": ["*"]
          },
          {
            "sourceTag": "type:feature",
            "onlyDependOnLibsWithTags": ["type:data-access", "type:ui", "type:util"]
          },
          {
            "sourceTag": "type:data-access",
            "onlyDependOnLibsWithTags": ["type:data-access", "type:util"]
          },
          {
            "sourceTag": "type:ui",
            "onlyDependOnLibsWithTags": ["type:ui", "type:util"]
          }
        ]
      }
    ]
  }
}
```

### Import Path Management
- Use TypeScript path mapping for clean imports
- Configure consistent import paths across the workspace
- Avoid relative imports between libraries

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "paths": {
      "@workspace/shared/ui": ["libs/shared/ui/src/index.ts"],
      "@workspace/shared/data-access": ["libs/shared/data-access/src/index.ts"],
      "@workspace/shared/utils": ["libs/shared/utils/src/index.ts"],
      "@workspace/feature/user-management": ["libs/feature/user-management/src/index.ts"],
      "@workspace/feature/product-catalog": ["libs/feature/product-catalog/src/index.ts"]
    }
  }
}
```

## Build and Development Workflow

### Build Optimization
- Use Nx build caching for faster builds
- Configure proper build dependencies
- Implement incremental builds
- Optimize bundle sizes

```bash
# Build specific project
nx build my-app

# Build with dependencies
nx build my-app --with-deps

# Build only affected projects
nx affected:build

# Build with production configuration
nx build my-app --configuration=production
```

### Development Workflow
- Use affected commands for efficient development
- Run tests only for changed code
- Leverage Nx CLI for project management
- Use workspace generators for consistency

```bash
# Serve application with dependencies
nx serve my-app

# Run tests for affected projects
nx affected:test

# Lint affected projects
nx affected:lint

# Generate dependency graph
nx graph

# Run e2e tests
nx e2e my-app-e2e
```

## Testing Strategy

### Test Organization
- Maintain test files alongside source files
- Use consistent test naming conventions
- Configure proper test environments
- Implement integration testing for critical paths

```typescript
// libs/shared/utils/src/lib/math/math.utils.spec.ts
describe('MathUtils', () => {
  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(MathUtils.add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(MathUtils.add(-2, 3)).toBe(1);
    });

    it('should handle zero values', () => {
      expect(MathUtils.add(0, 5)).toBe(5);
    });
  });
});
```

### Test Configuration
- Configure Jest for consistent testing
- Set up proper test coverage reporting
- Use shared test utilities
- Mock external dependencies appropriately

```typescript
// jest.preset.js
const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.stories.ts',
    '!src/**/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

## Performance Optimization

### Caching Strategy
- Enable distributed task execution
- Configure remote caching for CI/CD
- Use build caching for faster local development
- Optimize task dependencies

```json
// nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "@nrwl/nx-cloud",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"],
        "accessToken": "your-nx-cloud-token"
      }
    }
  }
}
```

### Bundle Optimization
- Use buildable libraries for better tree-shaking
- Implement lazy loading for features
- Optimize chunk splitting
- Monitor bundle sizes

```json
// project.json
{
  "targets": {
    "build": {
      "executor": "@nx/angular:webpack-browser",
      "options": {
        "buildOptimizer": true,
        "optimization": true,
        "vendorChunk": true,
        "extractLicenses": false,
        "sourceMap": false,
        "namedChunks": false
      }
    }
  }
}
```

## CI/CD Integration

### Continuous Integration
- Use affected commands in CI pipelines
- Implement proper caching strategies
- Run parallel builds and tests
- Configure proper deployment workflows

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - uses: nrwl/nx-set-shas@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      
      - run: npx nx affected --target=lint --parallel=3
      - run: npx nx affected --target=test --parallel=3 --ci --code-coverage
      - run: npx nx affected --target=build --parallel=3
```

### Deployment Strategy
- Configure environment-specific builds
- Use Nx tags for deployment targeting
- Implement proper versioning
- Set up automated deployment pipelines

## Code Generation

### Custom Generators
- Create workspace-specific generators
- Standardize project creation
- Automate boilerplate code generation
- Ensure consistent code patterns

```typescript
// tools/workspace-plugin/src/generators/feature/generator.ts
export default async function (tree: Tree, options: FeatureGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: '@nx/angular:ng-packagr-lite',
        outputs: [`{workspaceRoot}/dist/${normalizedOptions.projectRoot}`],
        options: {
          project: `${normalizedOptions.projectRoot}/ng-package.json`
        }
      }
    },
    tags: normalizedOptions.parsedTags
  });

  generateFiles(tree, path.join(__dirname, 'files'), normalizedOptions.projectRoot, normalizedOptions);
  
  await formatFiles(tree);
}
```

## Migration and Maintenance

### Nx Updates
- Regularly update Nx version and plugins
- Use Nx migrate for automated updates
- Test migrations in feature branches
- Document breaking changes

```bash
# Update Nx to latest version
nx migrate latest

# Apply migrations
nx migrate --run-migrations

# Clean up after migration
rm migrations.json
```

### Workspace Maintenance
- Regularly audit dependencies
- Clean up unused libraries
- Update project configurations
- Monitor build performance

## Common Anti-Patterns to Avoid

- Creating monolithic libraries that mix concerns
- Circular dependencies between libraries
- Importing from library internals instead of public API
- Not using tags for dependency constraints
- Ignoring build optimization opportunities
- Creating too many small libraries without clear purpose
- Not leveraging Nx caching capabilities
- Inconsistent naming conventions across projects
- Mixing application and library concerns
- Not using workspace generators for consistency

## Validation Checklist

- [ ] Project structure follows domain-driven organization
- [ ] Libraries have clear, single responsibilities
- [ ] Dependency rules are enforced with ESLint
- [ ] Import paths use TypeScript path mapping
- [ ] Build caching is properly configured
- [ ] Tests are organized and comprehensive
- [ ] CI/CD pipeline uses affected commands
- [ ] Custom generators maintain consistency
- [ ] Performance optimizations are in place
- [ ] Documentation is up to date
- [ ] Nx version is current and migrations applied
- [ ] Bundle sizes are monitored and optimized
