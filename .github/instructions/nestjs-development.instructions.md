---
applyTo: "**/*.controller.ts,**/*.service.ts,**/*.module.ts,**/*.guard.ts,**/*.interceptor.ts,**/*.decorator.ts,**/*.dto.ts,**/*.entity.ts,**/*.filter.ts,**/*.pipe.ts,**/*.strategy.ts"
---

# NestJS Development Instructions

## Purpose

This instruction provides comprehensive NestJS development guidelines for building scalable, maintainable Node.js server-side applications. It covers controller design, service architecture, module organization, dependency injection, and NestJS-specific best practices.

## Module Architecture

### Module Design Principles
- Organize code into feature modules with clear boundaries
- Use shared modules for common functionality
- Implement proper module encapsulation and exports
- Follow domain-driven design principles

```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
    SharedModule,
    AuthModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: 'USER_CONFIG',
      useValue: userConfig
    }
  ],
  exports: [UserService]
})
export class UserModule {}
```

### Module Organization
- Keep modules focused on specific business domains
- Use barrel exports for clean module interfaces
- Implement proper dependency graphs between modules
- Avoid circular dependencies

## Controller Design

### Controller Structure
- Keep controllers thin and focused on HTTP concerns
- Delegate business logic to services
- Use proper HTTP status codes and response formatting
- Implement comprehensive error handling

```typescript
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully', type: [UserResponseDto] })
  async findAll(
    @Query() query: GetUsersQueryDto
  ): Promise<UserResponseDto[]> {
    this.logger.log('Fetching all users with query', { query });
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'User found', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: 'number' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
```

### Request/Response Handling
- Use DTOs for request validation and response serialization
- Implement proper validation with class-validator
- Use transformation pipes for data conversion
- Handle file uploads and multipart data correctly

## Service Design

### Service Architecture
- Implement single responsibility principle
- Use dependency injection for all dependencies
- Handle business logic and data access coordination
- Implement proper error handling and logging

```typescript
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: Logger
  ) {}

  async findAll(query: GetUsersQueryDto): Promise<UserResponseDto[]> {
    try {
      const { page = 1, limit = 10, search, sortBy = 'id', sortOrder = 'ASC' } = query;
      
      const queryBuilder = this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.profile', 'profile');

      if (search) {
        queryBuilder.andWhere(
          '(user.email ILIKE :search OR user.firstName ILIKE :search OR user.lastName ILIKE :search)',
          { search: `%${search}%` }
        );
      }

      queryBuilder
        .orderBy(`user.${sortBy}`, sortOrder)
        .skip((page - 1) * limit)
        .take(limit);

      const users = await queryBuilder.getMany();
      return users.map(user => this.mapToResponseDto(user));
    } catch (error) {
      this.logger.error('Failed to fetch users', error);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findById(id: number): Promise<UserResponseDto | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['profile']
      });

      return user ? this.mapToResponseDto(user) : null;
    } catch (error) {
      this.logger.error(`Failed to fetch user with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email }
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const user = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(user);

      this.eventEmitter.emit('user.created', { userId: savedUser.id });
      this.logger.log(`User created with ID ${savedUser.id}`);

      return this.mapToResponseDto(savedUser);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error('Failed to create user', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile ? {
        id: user.profile.id,
        bio: user.profile.bio,
        avatar: user.profile.avatar
      } : null
    };
  }
}
```

## Data Transfer Objects (DTOs)

### DTO Design
- Create separate DTOs for requests and responses
- Use class-validator for input validation
- Implement proper transformation with class-transformer
- Keep DTOs focused and minimal

```typescript
export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString()
  @Length(2, 50)
  @ApiProperty({ example: 'John' })
  firstName: string;

  @IsString()
  @Length(2, 50)
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]/, {
    message: 'Password must contain uppercase, lowercase, and number'
  })
  @ApiProperty({ example: 'SecurePass123' })
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, required: false })
  isActive?: boolean = true;
}

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  updatedAt: Date;

  @ApiProperty({ type: UserProfileResponseDto, required: false })
  profile?: UserProfileResponseDto;
}
```

### Query DTOs
- Use DTOs for query parameters
- Implement proper pagination and filtering
- Validate query parameters with appropriate decorators

```typescript
export class GetUsersQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1, required: false })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @ApiProperty({ example: 10, required: false })
  limit?: number;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  @ApiProperty({ example: 'john', required: false })
  search?: string;

  @IsOptional()
  @IsIn(['id', 'email', 'firstName', 'lastName', 'createdAt'])
  @ApiProperty({ example: 'id', required: false })
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @ApiProperty({ example: 'ASC', required: false })
  sortOrder?: 'ASC' | 'DESC';
}
```

## Authentication and Authorization

### JWT Authentication
- Implement secure JWT token handling
- Use proper token expiration and refresh strategies
- Validate tokens in guards and strategies

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findById(payload.sub);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid or inactive user');
    }
    return user;
  }
}
```

### Role-Based Access Control
- Implement role-based guards
- Use decorators for role checking
- Handle permission validation properly

```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some(role => user.roles?.includes(role));
  }
}

// Custom decorator
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

// Usage in controller
@Post()
@Roles(Role.ADMIN, Role.MODERATOR)
@UseGuards(JwtAuthGuard, RolesGuard)
async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
  return this.userService.create(dto);
}
```

## Database Integration

### Entity Design
- Use TypeORM entities with proper relationships
- Implement database constraints and indexes
- Handle database migrations properly

```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  @Index()
  email: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserProfile, profile => profile.user, { cascade: true })
  profile: UserProfile;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' }
  })
  roles: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
```

### Repository Pattern
- Use custom repositories for complex queries
- Implement proper transaction handling
- Use query builders for complex operations

```typescript
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly dataSource: DataSource
  ) {}

  async findActiveUsersWithProfiles(): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.isActive = :isActive', { isActive: true })
      .orderBy('user.createdAt', 'DESC')
      .getMany();
  }

  async createUserWithProfile(userData: CreateUserDto, profileData: CreateUserProfileDto): Promise<User> {
    return this.dataSource.transaction(async manager => {
      const user = manager.create(User, userData);
      const savedUser = await manager.save(user);

      const profile = manager.create(UserProfile, {
        ...profileData,
        user: savedUser
      });
      await manager.save(profile);

      return manager.findOne(User, {
        where: { id: savedUser.id },
        relations: ['profile']
      });
    });
  }
}
```

## Error Handling

### Exception Filters
- Implement global exception filters
- Handle different types of exceptions appropriately
- Provide consistent error response format

```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exception.message;
        errors = (exceptionResponse as any).errors || null;
      } else {
        message = exceptionResponse;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(errors && { errors })
    };

    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : exception
    );

    response.status(status).json(errorResponse);
  }
}
```

### Custom Exceptions
- Create domain-specific exceptions
- Provide meaningful error messages
- Include proper error codes and details

```typescript
export class UserNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super({
      message: `User with ID ${userId} not found`,
      errorCode: 'USER_NOT_FOUND',
      statusCode: 404
    });
  }
}

export class EmailAlreadyExistsException extends ConflictException {
  constructor(email: string) {
    super({
      message: `User with email ${email} already exists`,
      errorCode: 'EMAIL_ALREADY_EXISTS',
      statusCode: 409
    });
  }
}
```

## Testing NestJS Applications

### Unit Testing
- Test services, controllers, and other providers independently
- Mock dependencies using Jest
- Test business logic thoroughly

```typescript
describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn()
          }
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      // Arrange
      const userId = 1;
      const mockUser = {
        id: userId,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe'
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser as User);

      // Act
      const result = await service.findById(userId);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['profile']
      });
      expect(result).toBeDefined();
      expect(result.id).toBe(userId);
    });

    it('should return null when user not found', async () => {
      // Arrange
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      // Act
      const result = await service.findById(999);

      // Assert
      expect(result).toBeNull();
    });
  });
});
```

### Integration Testing
- Test complete request/response cycles
- Use test database for integration tests
- Test middleware, guards, and interceptors

```typescript
describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    await app.init();
  });

  describe('/users (GET)', () => {
    it('should return users array', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should require authentication', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(401);
    });
  });
});
```

## Performance and Optimization

### Caching
- Implement Redis caching for frequently accessed data
- Use cache interceptors for response caching
- Cache database queries appropriately

```typescript
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private reflector: Reflector
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const cacheKey = this.reflector.get<string>('cacheKey', context.getHandler());
    const cacheTtl = this.reflector.get<number>('cacheTtl', context.getHandler()) || 300;

    if (!cacheKey) {
      return next.handle();
    }

    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    return next.handle().pipe(
      tap(response => {
        this.cacheManager.set(cacheKey, response, { ttl: cacheTtl });
      })
    );
  }
}
```

### Database Optimization
- Use database indexes effectively
- Implement proper pagination
- Optimize query performance with query builders

## Security Best Practices

### Input Validation
- Validate all input data with DTOs
- Sanitize user inputs to prevent injection attacks
- Use proper rate limiting

### API Security
- Implement CORS properly
- Use HTTPS in production
- Validate API keys and tokens
- Implement request size limits

## Common Anti-Patterns to Avoid

- Fat controllers with business logic
- Direct database access from controllers
- Missing error handling and logging
- Circular dependencies between modules
- Not using DTOs for input validation
- Exposing sensitive data in responses
- Not implementing proper transaction handling
- Missing authentication and authorization
- Inefficient database queries
- Not following NestJS architectural patterns

## Validation Checklist

- [ ] Modules are properly organized with clear boundaries
- [ ] Controllers are thin and delegate to services
- [ ] Services contain business logic and handle errors
- [ ] DTOs are used for input validation and response serialization
- [ ] Database entities have proper relationships and constraints
- [ ] Authentication and authorization are implemented
- [ ] Error handling is comprehensive and consistent
- [ ] Tests cover both unit and integration scenarios
- [ ] Performance optimizations are in place
- [ ] Security best practices are followed
- [ ] API documentation is complete with Swagger
- [ ] Logging and monitoring are implemented
