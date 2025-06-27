---
applyTo: "**/*.component.ts,**/*.component.html,**/*.component.scss,**/*.module.ts"
---

# Kendo UI for Angular Instructions

## Purpose

This instruction provides comprehensive guidelines for developing Angular applications with Kendo UI for Angular components, covering component usage, theming, data binding, localization, and performance optimization for enterprise-grade applications.

## Component Integration

### Module Setup
- Import only the required Kendo UI modules to optimize bundle size
- Configure modules at the appropriate level (feature or shared modules)
- Use barrel exports for clean module organization
- Set up proper tree-shaking for unused components

```typescript
// shared/kendo-ui.module.ts
import { NgModule } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  exports: [
    GridModule,
    DropDownsModule,
    DateInputsModule,
    ButtonsModule,
    InputsModule,
    DialogsModule,
    NotificationModule,
    LayoutModule
  ]
})
export class KendoUiModule {}
```

### Component Usage Best Practices
- Use reactive forms with Kendo UI form controls
- Implement proper data binding patterns
- Handle component events appropriately
- Configure accessibility features

```typescript
@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <kendo-formfield>
        <kendo-label text="First Name" [for]="firstName"></kendo-label>
        <kendo-textbox
          #firstName
          formControlName="firstName"
          [clearButton]="true"
          placeholder="Enter first name">
        </kendo-textbox>
        <kendo-formerror>
          First name is required
        </kendo-formerror>
      </kendo-formfield>

      <kendo-formfield>
        <kendo-label text="Email" [for]="email"></kendo-label>
        <kendo-textbox
          #email
          formControlName="email"
          type="email"
          placeholder="Enter email address">
        </kendo-textbox>
        <kendo-formerror>
          Please enter a valid email address
        </kendo-formerror>
      </kendo-formfield>

      <kendo-formfield>
        <kendo-label text="Department" [for]="department"></kendo-label>
        <kendo-dropdownlist
          #department
          formControlName="department"
          [data]="departments"
          textField="name"
          valueField="id"
          [valuePrimitive]="true"
          placeholder="Select department">
        </kendo-dropdownlist>
      </kendo-formfield>

      <kendo-formfield>
        <kendo-label text="Start Date" [for]="startDate"></kendo-label>
        <kendo-datepicker
          #startDate
          formControlName="startDate"
          [format]="'MM/dd/yyyy'"
          [min]="minDate"
          [max]="maxDate">
        </kendo-datepicker>
      </kendo-formfield>

      <div class="form-actions">
        <kendo-button
          type="submit"
          [primary]="true"
          [disabled]="userForm.invalid">
          Save User
        </kendo-button>
        <kendo-button
          type="button"
          (click)="onCancel()">
          Cancel
        </kendo-button>
      </div>
    </form>
  `
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  departments: Department[] = [];
  minDate = new Date(2020, 0, 1);
  maxDate = new Date();

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly departmentService: DepartmentService
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  private loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.userService.createUser(userData).subscribe({
        next: () => this.onSuccess(),
        error: (error) => this.onError(error)
      });
    }
  }

  onCancel(): void {
    this.userForm.reset();
  }

  private onSuccess(): void {
    // Handle success
  }

  private onError(error: any): void {
    // Handle error
  }
}
```

## Grid Component Implementation

### Grid Configuration
- Use server-side operations for large datasets
- Implement proper sorting, filtering, and paging
- Configure column templates and formatting
- Handle grid events appropriately

```typescript
@Component({
  selector: 'app-user-grid',
  template: `
    <kendo-grid
      [data]="gridView"
      [pageSize]="pageSize"
      [skip]="skip"
      [pageable]="true"
      [sortable]="true"
      [filterable]="true"
      [groupable]="true"
      [resizable]="true"
      [reorderable]="true"
      [selectable]="{ enabled: true, mode: 'single' }"
      [loading]="loading"
      (dataStateChange)="onDataStateChange($event)"
      (selectionChange)="onSelectionChange($event)">
      
      <kendo-grid-column
        field="id"
        title="ID"
        width="80"
        [sortable]="false"
        [filterable]="false">
      </kendo-grid-column>

      <kendo-grid-column
        field="firstName"
        title="First Name"
        width="150">
        <ng-template kendoGridCellTemplate let-dataItem>
          <strong>{{ dataItem.firstName }}</strong>
        </ng-template>
      </kendo-grid-column>

      <kendo-grid-column
        field="lastName"
        title="Last Name"
        width="150">
      </kendo-grid-column>

      <kendo-grid-column
        field="email"
        title="Email"
        width="200">
        <ng-template kendoGridCellTemplate let-dataItem>
          <a [href]="'mailto:' + dataItem.email">{{ dataItem.email }}</a>
        </ng-template>
      </kendo-grid-column>

      <kendo-grid-column
        field="department.name"
        title="Department"
        width="150">
      </kendo-grid-column>

      <kendo-grid-column
        field="startDate"
        title="Start Date"
        width="120"
        format="{0:MM/dd/yyyy}">
      </kendo-grid-column>

      <kendo-grid-column
        field="isActive"
        title="Status"
        width="100">
        <ng-template kendoGridCellTemplate let-dataItem>
          <kendo-chip
            [selected]="dataItem.isActive"
            [removable]="false">
            {{ dataItem.isActive ? 'Active' : 'Inactive' }}
          </kendo-chip>
        </ng-template>
      </kendo-grid-column>

      <kendo-grid-column title="Actions" width="120" [sortable]="false" [filterable]="false">
        <ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex">
          <kendo-button-group>
            <kendo-button
              icon="edit"
              [fillMode]="'flat'"
              (click)="editUser(dataItem)">
            </kendo-button>
            <kendo-button
              icon="delete"
              [fillMode]="'flat'"
              (click)="deleteUser(dataItem)">
            </kendo-button>
          </kendo-button-group>
        </ng-template>
      </kendo-grid-column>
    </kendo-grid>
  `
})
export class UserGridComponent implements OnInit {
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  public loading = false;
  
  private state: State = {
    skip: 0,
    take: 10,
    sort: [{ field: 'lastName', dir: 'asc' }]
  };

  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onDataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.skip = state.skip;
    this.loadData();
  }

  onSelectionChange(event: SelectionEvent): void {
    const selectedUser = event.selectedRows[0]?.dataItem;
    if (selectedUser) {
      // Handle user selection
    }
  }

  private loadData(): void {
    this.loading = true;
    
    this.userService.getUsers(this.state).subscribe({
      next: (result) => {
        this.gridView = result;
        this.loading = false;
      },
      error: (error) => {
        this.handleError(error);
        this.loading = false;
      }
    });
  }

  editUser(user: User): void {
    // Open edit dialog or navigate to edit page
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialogService.open({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      actions: [
        { text: 'Cancel' },
        { text: 'Delete', primary: true }
      ]
    });

    dialogRef.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        return;
      }

      if (result.text === 'Delete') {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.notificationService.show({
              content: 'User deleted successfully',
              type: { style: 'success', icon: true }
            });
            this.loadData();
          },
          error: (error) => this.handleError(error)
        });
      }
    });
  }

  private handleError(error: any): void {
    this.notificationService.show({
      content: 'An error occurred while loading data',
      type: { style: 'error', icon: true }
    });
  }
}
```

## Charts and Data Visualization

### Chart Component Setup
- Configure chart types appropriately
- Implement responsive chart behavior
- Handle chart interactions and events
- Use proper data binding for dynamic updates

```typescript
@Component({
  selector: 'app-sales-dashboard',
  template: `
    <div class="dashboard-container">
      <kendo-card>
        <kendo-card-header>
          <kendo-card-title>Sales Performance</kendo-card-title>
        </kendo-card-header>
        <kendo-card-body>
          <kendo-chart
            [seriesColors]="seriesColors"
            [tooltip]="{ visible: true }"
            [legend]="{ visible: true, position: 'bottom' }"
            (seriesClick)="onSeriesClick($event)">
            
            <kendo-chart-title text="Monthly Sales"></kendo-chart-title>
            
            <kendo-chart-category-axis>
              <kendo-chart-category-axis-item
                [categories]="categories"
                [majorGridLines]="{ visible: true }">
              </kendo-chart-category-axis-item>
            </kendo-chart-category-axis>

            <kendo-chart-value-axis>
              <kendo-chart-value-axis-item
                [labels]="{ format: '${0:N0}' }"
                [majorGridLines]="{ visible: true }">
              </kendo-chart-value-axis-item>
            </kendo-chart-value-axis>

            <kendo-chart-series>
              <kendo-chart-series-item
                type="column"
                [data]="salesData"
                field="value"
                categoryField="month"
                name="Sales">
              </kendo-chart-series-item>
              
              <kendo-chart-series-item
                type="line"
                [data]="targetData"
                field="value"
                categoryField="month"
                name="Target"
                [markers]="{ visible: true, size: 6 }">
              </kendo-chart-series-item>
            </kendo-chart-series>
          </kendo-chart>
        </kendo-card-body>
      </kendo-card>

      <kendo-card>
        <kendo-card-header>
          <kendo-card-title>Sales by Region</kendo-card-title>
        </kendo-card-header>
        <kendo-card-body>
          <kendo-chart>
            <kendo-chart-legend [visible]="true" position="right"></kendo-chart-legend>
            <kendo-chart-series>
              <kendo-chart-series-item
                type="pie"
                [data]="regionData"
                field="value"
                categoryField="region"
                [labels]="{ visible: true, format: '{0}%' }">
              </kendo-chart-series-item>
            </kendo-chart-series>
          </kendo-chart>
        </kendo-card-body>
      </kendo-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1rem;
      padding: 1rem;
    }
  `]
})
export class SalesDashboardComponent implements OnInit {
  public salesData: any[] = [];
  public targetData: any[] = [];
  public regionData: any[] = [];
  public categories: string[] = [];
  public seriesColors = ['#ff6358', '#28b4c8'];

  constructor(private readonly salesService: SalesService) {}

  ngOnInit(): void {
    this.loadSalesData();
    this.loadRegionData();
  }

  onSeriesClick(event: any): void {
    const { category, value } = event.dataItem;
    console.log(`Clicked on ${category}: ${value}`);
  }

  private loadSalesData(): void {
    this.salesService.getMonthlySales().subscribe(data => {
      this.salesData = data.sales;
      this.targetData = data.targets;
      this.categories = data.sales.map(item => item.month);
    });
  }

  private loadRegionData(): void {
    this.salesService.getSalesByRegion().subscribe(data => {
      this.regionData = data;
    });
  }
}
```

## Theming and Styling

### Theme Configuration
- Use Kendo UI theme variables for consistency
- Implement custom theme modifications
- Configure responsive design patterns
- Maintain accessibility standards

```scss
// styles/kendo-theme.scss
@import "~@progress/kendo-theme-default/scss/all";

// Custom theme variables
$kendo-primary: #2d3e4f;
$kendo-secondary: #3498db;
$kendo-success: #27ae60;
$kendo-warning: #f39c12;
$kendo-error: #e74c3c;

// Custom component styling
.k-grid {
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .k-grid-header {
    background-color: $kendo-primary;
    color: white;
    
    .k-header {
      border-color: lighten($kendo-primary, 10%);
    }
  }
  
  .k-grid-content {
    .k-table-row:hover {
      background-color: lighten($kendo-primary, 45%);
    }
  }
}

.k-button {
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &.k-button-primary {
    background-color: $kendo-primary;
    border-color: $kendo-primary;
    
    &:hover {
      background-color: darken($kendo-primary, 10%);
      border-color: darken($kendo-primary, 10%);
    }
  }
}

.k-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  .k-card-header {
    border-bottom: 1px solid #e0e0e0;
  }
}
```

### Responsive Design
- Implement responsive grid columns
- Use Kendo UI responsive utilities
- Configure mobile-friendly layouts
- Handle touch interactions properly

```typescript
@Component({
  selector: 'app-responsive-grid',
  template: `
    <kendo-grid
      [data]="gridData"
      [height]="gridHeight"
      [pageable]="true"
      [sortable]="true"
      [resizable]="true">
      
      <kendo-grid-column
        field="name"
        title="Name"
        [minResizableWidth]="100"
        [width]="isMobile ? 150 : 200">
      </kendo-grid-column>

      <kendo-grid-column
        field="email"
        title="Email"
        [hidden]="isMobile"
        width="200">
      </kendo-grid-column>

      <kendo-grid-column
        field="phone"
        title="Phone"
        [hidden]="isMobile"
        width="150">
      </kendo-grid-column>

      <kendo-grid-column
        title="Actions"
        width="120"
        [sortable]="false">
        <ng-template kendoGridCellTemplate let-dataItem>
          <kendo-button-group>
            <kendo-button
              [icon]="isMobile ? 'more-horizontal' : 'edit'"
              (click)="editItem(dataItem)">
              {{ isMobile ? '' : 'Edit' }}
            </kendo-button>
          </kendo-button-group>
        </ng-template>
      </kendo-grid-column>
    </kendo-grid>
  `
})
export class ResponsiveGridComponent implements OnInit, OnDestroy {
  public gridData: any[] = [];
  public gridHeight = 400;
  public isMobile = false;

  private resizeSubscription = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.checkScreenSize();
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(250),
        takeUntil(this.resizeSubscription)
      )
      .subscribe(() => this.checkScreenSize());
  }

  ngOnDestroy(): void {
    this.resizeSubscription.next();
    this.resizeSubscription.complete();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    this.gridHeight = this.isMobile ? 300 : 400;
  }

  editItem(item: any): void {
    // Handle edit action
  }
}
```

## Localization and Internationalization

### Localization Setup
- Configure Kendo UI localization
- Implement date and number formatting
- Handle RTL language support
- Use Angular i18n integration

```typescript
// app.module.ts
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CldrIntlService, IntlService } from '@progress/kendo-angular-intl';

registerLocaleData(localeEs);

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: IntlService, useClass: CldrIntlService }
  ]
})
export class AppModule {}
```

```typescript
// localization.service.ts
@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  constructor(private intlService: IntlService) {}

  setLocale(locale: string): void {
    this.intlService.localeId = locale;
  }

  formatDate(date: Date, format: string = 'short'): string {
    return this.intlService.formatDate(date, format);
  }

  formatNumber(value: number, format: string = 'n2'): string {
    return this.intlService.formatNumber(value, format);
  }

  formatCurrency(value: number, currency: string = 'USD'): string {
    return this.intlService.formatNumber(value, { style: 'currency', currency });
  }
}
```

## Performance Optimization

### Virtual Scrolling
- Use virtual scrolling for large datasets
- Configure proper item sizes
- Implement efficient data loading
- Handle scroll events appropriately

```typescript
@Component({
  selector: 'app-virtual-grid',
  template: `
    <kendo-grid
      [data]="gridData"
      [scrollable]="'virtual'"
      [rowHeight]="36"
      [height]="400"
      [pageSize]="100">
      
      <kendo-grid-column field="id" title="ID" width="80"></kendo-grid-column>
      <kendo-grid-column field="name" title="Name" width="200"></kendo-grid-column>
      <kendo-grid-column field="email" title="Email" width="250"></kendo-grid-column>
    </kendo-grid>
  `
})
export class VirtualGridComponent implements OnInit {
  public gridData: any[] = [];

  ngOnInit(): void {
    // Generate large dataset for virtual scrolling
    this.gridData = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`
    }));
  }
}
```

### Bundle Optimization
- Import only required Kendo UI modules
- Use tree-shaking effectively
- Lazy load feature modules
- Optimize component usage

```typescript
// Specific module imports instead of full package
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

// Instead of
// import { KendoAngularModule } from '@progress/kendo-angular-ui';
```

## Accessibility Implementation

### ARIA Support
- Configure proper ARIA attributes
- Implement keyboard navigation
- Ensure screen reader compatibility
- Follow WCAG guidelines

```typescript
@Component({
  template: `
    <kendo-grid
      [navigable]="true"
      role="grid"
      [attr.aria-label]="'User data grid'"
      [attr.aria-rowcount]="totalItems"
      [attr.aria-colcount]="columnCount">
      
      <kendo-grid-column
        field="name"
        title="Name"
        [attr.aria-sort]="getSortDirection('name')">
      </kendo-grid-column>
    </kendo-grid>
  `
})
export class AccessibleGridComponent {
  public totalItems = 0;
  public columnCount = 5;

  getSortDirection(field: string): string {
    // Return 'ascending', 'descending', or 'none'
    return 'none';
  }
}
```

## Common Anti-Patterns to Avoid

- Importing entire Kendo UI package instead of specific modules
- Not implementing proper error handling for async operations
- Mixing Kendo UI components with incompatible third-party components
- Not optimizing grid performance for large datasets
- Ignoring accessibility requirements
- Not following Kendo UI theming conventions
- Over-customizing components that break functionality
- Not handling responsive design properly
- Missing proper form validation with Kendo UI controls
- Not leveraging Kendo UI's built-in localization features

## Validation Checklist

- [ ] Only required Kendo UI modules are imported
- [ ] Components use proper data binding patterns
- [ ] Forms integrate correctly with Angular reactive forms
- [ ] Grid components handle large datasets efficiently
- [ ] Charts are configured with proper data visualization
- [ ] Theming follows Kendo UI conventions
- [ ] Responsive design is implemented correctly
- [ ] Localization is properly configured
- [ ] Accessibility requirements are met
- [ ] Performance optimizations are in place
- [ ] Error handling is comprehensive
- [ ] Components follow Angular best practices
