# Admin Dashboard

A comprehensive admin dashboard for compliance management system with staff oversight, compliance monitoring, and organizational analytics.

## Features

### 🏠 Dashboard Overview (`/admin`)
- **Key Metrics**: Total staff, compliance rates, pending documents, expiring certificates
- **Department Compliance**: Visual breakdown by department with progress bars
- **Recent Alerts**: Critical compliance issues requiring attention
- **Activity Feed**: Real-time staff document submissions and approvals
- **Trend Analysis**: Month-over-month compliance changes

### 👥 Staff Management (`/admin/staff`)
- **Staff Directory**: Searchable and filterable staff list
- **Compliance Status**: Individual staff compliance percentages
- **Document Tracking**: DBS, Right to Work, Professional Registration, Training status
- **Quick Actions**: View profiles, edit staff details
- **Export Functionality**: Staff list export capabilities

### 🛡️ Compliance Monitoring (`/admin/compliance`)
- **Overall Compliance**: Organization-wide compliance metrics
- **Department Analysis**: Detailed compliance breakdown by department
- **Document Types**: Status tracking for all document categories
- **Issue Management**: Critical, high, and warning level compliance issues
- **Audit Tools**: Compliance audit and reporting features

## Navigation Structure

```
/admin
├── / (Dashboard Overview)
├── /staff (Staff Management)
├── /compliance (Compliance Monitoring)
├── /documents (Document Management) [Planned]
├── /training (Training Programs) [Planned]
├── /alerts (Alerts & Issues) [Planned]
├── /reports (Reports) [Planned]
└── /settings (System Settings) [Planned]
```

## Components

### Layout Components
- **AdminSidebar**: Navigation sidebar with admin menu items
- **AdminHeader**: Top header with breadcrumbs, search, and user menu
- **AdminGuard**: Authentication guard for admin-only access

### Dashboard Components
- **StatCard**: Metric display cards with trend indicators
- **AlertCard**: Compliance alert notifications
- **DepartmentComplianceCard**: Department-specific compliance overview
- **DocumentTypeCard**: Document category compliance status
- **IssueCard**: Individual compliance issue display

### Staff Management Components
- **StaffCard**: Individual staff member overview with compliance status
- **Document Status Icons**: Visual indicators for document states

## Authentication & Access Control

- **Role-based Access**: Only users with `role: 1` (admin) can access
- **Auth Guard**: Automatic redirect to `/app` for non-admin users
- **Session Management**: Integrated with existing auth context

## Data Structure

### Mock Data
Currently using mock data for demonstration. Replace with actual API calls:

- **Staff Data**: Individual staff compliance and document status
- **Compliance Metrics**: Department and organization-wide statistics
- **Alert Data**: Critical compliance issues and notifications
- **Activity Data**: Recent staff actions and document submissions

## Styling & Design

- **Design System**: Uses existing Mercury design system
- **Color Scheme**: sand color palette with status-specific colors
- **Responsive**: Mobile-first responsive design
- **Icons**: Lucide React icons throughout
- **Components**: Reuses existing UI component library

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live compliance updates
2. **Advanced Analytics**: Charts and graphs for compliance trends
3. **Bulk Actions**: Mass staff operations and document management
4. **Notification System**: Email/SMS alerts for compliance issues
5. **Audit Trails**: Detailed logging of all admin actions
6. **Custom Reports**: Configurable compliance reporting
7. **Integration APIs**: Connect with external HR and compliance systems

## Getting Started

1. Ensure user has admin role (`role: 1`)
2. Navigate to `/admin` to access the dashboard
3. Use sidebar navigation to explore different sections
4. Replace mock data with actual API endpoints
5. Configure compliance thresholds and alert rules

## API Integration Points

Replace mock data with actual API calls:

```typescript
// Staff data
GET /api/admin/staff
GET /api/admin/staff/:id
PUT /api/admin/staff/:id

// Compliance data
GET /api/admin/compliance/overview
GET /api/admin/compliance/departments
GET /api/admin/compliance/documents

// Alerts and issues
GET /api/admin/alerts
PUT /api/admin/alerts/:id/resolve

// Activity feed
GET /api/admin/activity
``` 