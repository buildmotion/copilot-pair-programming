---
applyTo: "**/*.component.ts,**/*.service.ts,**/*.module.ts,**/*.directive.ts,**/*.pipe.ts,**/*.guard.ts,**/*.interceptor.ts,**/*.resolver.ts"
---

# Angular Development Instructions

## Purpose

This instruction provides comprehensive Angular development guidelines for modern Angular applications (v18+), covering component architecture, service design, module organization, and Angular-specific best practices for scalable, maintainable applications.

## Component Architecture

### Component Design Principles
- Design components to be reusable and single-purpose
- Follow container/presentation component pattern
- Keep components focused on presentation logic
- Delegate business logic to services

### Component Structure
- Use OnPush change detection strategy for better performance
- Implement OnDestroy for cleanup and memory management
- Follow Angular lifecycle hook order and best practices
- Keep templates lean and extract complex logic to methods

```typescript
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  user$ = this.userService.currentUser$.pipe(
    takeUntil(this.destroy$)
  );

  constructor(
    private readonly userService: UserService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserProfile(): void {
    // Component initialization logic
  }
}
```

### Template Best Practices
- Use trackBy functions for ngFor loops
- Prefer async pipe over manual subscription management
- Use safe navigation operator for nullable properties
- Keep template expressions simple and pure

```html
<div *ngFor="let item of items$ | async; trackBy: trackByItemId">
  <user-card 
    [user]="item.user"
    [isSelected]="item.user?.id === selectedUserId"
    (userSelect)="onUserSelect($event)">
  </user-card>
</div>
```

## Service Design

### Service Architecture
- Create focused services with single responsibilities
- Use dependency injection for all dependencies
- Implement proper error handling and recovery
- Follow reactive programming patterns with RxJS

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  private readonly userSubject = new BehaviorSubject<User | null>(null);

  readonly currentUser$ = this.userSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlingService
  ) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(this.errorHandler.handleError<User>('getUserById')),
      tap(user => this.userSubject.next(user))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user).pipe(
      catchError(this.errorHandler.handleError<User>('updateUser')),
      tap(updatedUser => this.userSubject.next(updatedUser))
    );
  }
}
```

### HTTP Client Usage
- Use typed HTTP client with interfaces
- Implement proper error handling for HTTP operations
- Use interceptors for cross-cutting concerns (auth, logging, error handling)
- Cache responses when appropriate

## State Management

### Component State
- Use reactive forms for complex form handling
- Manage local component state with RxJS when appropriate
- Avoid direct DOM manipulation

### Application State
- Use signals for simple reactive state (Angular 16+)
- Consider NgRx for complex application state
- Implement proper state immutability patterns

```typescript
// Using Angular Signals (v16+)
@Component({
  template: `
    <div>Count: {{ count() }}</div>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  count = signal(0);

  increment(): void {
    this.count.update(value => value + 1);
  }
}
```

## Forms and Validation

### Reactive Forms
- Use reactive forms for complex form scenarios
- Implement custom validators for business rules
- Handle form state and validation errors properly

```typescript
@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input 
        formControlName="email" 
        type="email"
        [class.error]="emailControl?.invalid && emailControl?.touched">
      <div *ngIf="emailControl?.errors?.['required']" class="error-message">
        Email is required
      </div>
      <div *ngIf="emailControl?.errors?.['email']" class="error-message">
        Please enter a valid email
      </div>
    </form>
  `
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  get emailControl(): AbstractControl | null {
    return this.userForm.get('email');
  }

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      // Handle form submission
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsTouched();
    });
  }
}
```

## Routing and Navigation

### Route Configuration
- Use lazy loading for feature modules
- Implement route guards for security and navigation control
- Use resolvers for data pre-loading

```typescript
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    resolve: { user: UserResolver },
    canDeactivate: [UnsavedChangesGuard]
  }
];
```

### Guards and Resolvers
- Implement proper guard logic for route protection
- Use resolvers to ensure data is available before navigation
- Handle guard failures gracefully

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
```

## Module Organization

### Feature Modules
- Organize code into feature modules
- Use shared modules for common functionality
- Implement proper module boundaries

```typescript
@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    UserResolver
  ]
})
export class UsersModule {}
```

### Shared Modules
- Create shared modules for reusable components
- Export only what's needed by other modules
- Keep shared modules focused and cohesive

## Testing Angular Components

### Component Testing
- Test component behavior, not implementation details
- Use Angular Testing Utilities effectively
- Mock dependencies properly

```typescript
describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById', 'updateUser']);

    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should display user information when data is loaded', () => {
    // Arrange
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    userService.getUserById.and.returnValue(of(mockUser));

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="user-name"]')?.textContent).toContain('John Doe');
  });
});
```

### Service Testing
- Test service methods independently
- Mock HTTP calls and external dependencies
- Verify service interactions and side effects

## Performance Optimization

### Change Detection
- Use OnPush change detection strategy
- Implement proper trackBy functions
- Avoid expensive operations in templates

### Bundle Optimization
- Use lazy loading for routes and modules
- Implement code splitting strategies
- Optimize imports and dependencies

### Memory Management
- Unsubscribe from observables properly
- Use takeUntil pattern for subscription management
- Avoid memory leaks in event listeners

```typescript
export class BaseComponent implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected subscribeUntilDestroy<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(takeUntil(this.destroy$));
  }
}
```

## Error Handling

### Global Error Handling
- Implement global error handler
- Handle HTTP errors consistently
- Provide user-friendly error messages

```typescript
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly logger: LoggerService
  ) {}

  handleError(error: any): void {
    this.logger.error('Global error:', error);
    
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else {
      this.notificationService.showError('An unexpected error occurred');
    }
  }

  private handleHttpError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 401:
        this.notificationService.showError('Please log in to continue');
        break;
      case 403:
        this.notificationService.showError('You do not have permission for this action');
        break;
      case 500:
        this.notificationService.showError('Server error. Please try again later');
        break;
      default:
        this.notificationService.showError('An error occurred. Please try again');
    }
  }
}
```

## Accessibility

### ARIA and Semantic HTML
- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation works correctly

### Screen Reader Support
- Provide meaningful labels and descriptions
- Use Angular CDK a11y module for accessibility features
- Test with screen readers

## Security Best Practices

### XSS Prevention
- Sanitize user inputs properly
- Use Angular's built-in sanitization
- Avoid innerHTML with untrusted content

### Authentication and Authorization
- Implement proper JWT handling
- Use HTTP interceptors for authentication
- Protect sensitive routes with guards

## Common Anti-Patterns to Avoid

- Using any type instead of proper typing
- Manual DOM manipulation instead of Angular patterns
- Not unsubscribing from observables
- Mixing template-driven and reactive forms
- Deep component hierarchies without proper communication
- Not using change detection strategy OnPush for performance
- Subscribing to observables in templates
- Using deprecated Angular features
- Not following Angular style guide conventions
- Tight coupling between components

## Validation Checklist

- [ ] Components use OnPush change detection strategy
- [ ] All observables are properly unsubscribed
- [ ] Services are injected as readonly dependencies
- [ ] Forms use reactive forms with proper validation
- [ ] Routes are properly guarded and resolved
- [ ] Error handling is implemented consistently
- [ ] Components follow single responsibility principle
- [ ] Templates use async pipe for observables
- [ ] TypeScript types are properly defined
- [ ] Accessibility requirements are met
- [ ] Tests cover component behavior and service logic
- [ ] Performance optimizations are in place
