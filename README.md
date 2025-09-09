# 🚀 CRM-lite: Modern Customer Relationship Management System

<div align="center">

![CRM-lite Logo](public/img/crml_lite_transparent_logo.png)

**A powerful, lightweight CRM system built with modern web technologies**

[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-1.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

</div>

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📖 User Guide](#-user-guide)
- [🔐 Authentication & Roles](#-authentication--roles)
- [🎨 UI/UX Features](#-uiux-features)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Project Overview

CRM-lite is a modern, feature-rich Customer Relationship Management system designed for small to medium businesses. Built with cutting-edge web technologies, it provides an intuitive interface for managing clients, leads, projects, and tasks while maintaining high performance and user experience standards.

### 🌟 Key Highlights

- **Role-based Dashboards**: Separate interfaces for admins and regular users
- **Real-time Analytics**: Interactive charts and statistics
- **Modern UI**: Clean, responsive design with dark/light theme support
- **Comprehensive Management**: Clients, leads, projects, tasks, and activity logging
- **User-friendly**: Intuitive navigation and welcome modals for new users

## ✨ Features

### 📊 Dashboard & Analytics
- **Admin Dashboard**: Comprehensive overview with system-wide statistics
- **User Dashboard**: Personalized view with user-specific data
- **Interactive Charts**: Bar charts, pie charts with real-time data
- **Trend Analysis**: Monthly data visualization for business insights

### 👥 User Management
- **Multi-role Support**: Admin and user roles with different permissions
- **User Profiles**: Complete user information management
- **Activity Tracking**: First login detection and user activity logs
- **Welcome System**: Automated onboarding for new users

### 🏢 Client & Lead Management
- **Client Directory**: Comprehensive client information storage
- **Lead Pipeline**: Status-based lead tracking (New, Contacted, Qualified, etc.)
- **Custom Fields**: Dynamic custom fields per client/lead
- **Contact Management**: Multiple contacts per client organization

### 📋 Project & Task Management
- **Project Tracking**: Full project lifecycle management
- **Task Assignment**: User-specific task assignment and tracking
- **Status Management**: Configurable status workflows
- **Progress Monitoring**: Real-time project and task progress

### 📝 Activity & Communication Logs
- **Activity Timeline**: Comprehensive activity logging system
- **Communication History**: Track calls, emails, meetings
- **Audit Trail**: Complete audit trail for compliance
- **Filterable Logs**: Advanced filtering and search capabilities

### 🎨 UI/UX Excellence
- **Theme Support**: Light and dark mode with automatic detection
- **Responsive Design**: Mobile-first, works on all devices
- **Modern Components**: shadcn/ui component library
- **Interactive Elements**: Smooth animations and transitions
- **Accessibility**: WCAG compliant design principles

## 🛠️ Tech Stack

### Backend
- **[Laravel 12.x](https://laravel.com)**: Robust PHP framework
- **[MySQL](https://mysql.com)**: Reliable database management
- **[Laravel Sanctum](https://laravel.com/docs/sanctum)**: API authentication
- **[Spatie Permissions](https://spatie.be/docs/laravel-permission)**: Role and permission management

### Frontend
- **[React 18.x](https://reactjs.org)**: Modern JavaScript library
- **[TypeScript](https://typescriptlang.org)**: Type-safe development
- **[Inertia.js](https://inertiajs.com)**: Seamless SPA experience
- **[Tailwind CSS](https://tailwindcss.com)**: Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)**: Beautiful component library
- **[Recharts](https://recharts.org)**: Powerful charting library

### Development Tools
- **[Vite](https://vitejs.dev)**: Fast build tool
- **[Pest PHP](https://pestphp.com)**: Elegant testing framework
- **[ESLint](https://eslint.org)**: Code linting and formatting
- **[Prettier](https://prettier.io)**: Code formatting

## 📁 Project Structure

```
crm-lite/
├── app/                          # Laravel application logic
│   ├── Http/Controllers/         # Request handlers
│   ├── Models/                   # Database models
│   ├── Middleware/               # Custom middleware
│   └── Providers/                # Service providers
├── resources/
│   ├── js/                       # React TypeScript frontend
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Application pages
│   │   ├── layouts/              # Page layouts
│   │   ├── hooks/                # Custom React hooks
│   │   └── types/                # TypeScript type definitions
│   ├── css/                      # Styling files
│   └── views/                    # Blade templates
├── database/
│   ├── migrations/               # Database schema
│   └── seeders/                  # Sample data
├── routes/                       # Application routes
├── tests/                        # Test files
└── public/                       # Public assets
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **PHP 8.2+**
- **Composer**
- **Node.js 18+**
- **npm or yarn**
- **MySQL** (or SQLite for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/edmyrbatiancila/crm-lite.git
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure your database**
   Edit `.env` file with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=crm_lite
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   
   # For SQLite (development)
   # DB_CONNECTION=sqlite
   # DB_DATABASE=/absolute/path/to/database.sqlite
   ```

6. **Run database migrations and seeders**
   ```bash
   php artisan migrate --seed
   ```

7. **Build frontend assets**
   ```bash
   npm run build
   # For development with hot reload:
   npm run dev
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   ```

9. **Access the application**
   Open your browser and navigate to `http://localhost:8000`

### Default Login Credentials

After running the seeders, you can log in with:

**Admin User:**
- Email: `admin@gmail.com`
- Password: `admin123`

**Regular User:**

- Simply create new user.

## 📖 User Guide

### 🏠 Dashboard

#### Admin Dashboard
- **System Overview**: Total counts of clients, projects, tasks, and users
- **Analytics Charts**: Visual representation of project and task statuses
- **Monthly Trends**: 6-month trend analysis
- **Recent Activities**: Latest system activities and updates
- **Quick Actions**: Direct access to create new records

#### User Dashboard
- **Personal Overview**: User-specific statistics
- **My Tasks**: Tasks assigned to the logged-in user
- **My Projects**: Projects where user is involved
- **Progress Charts**: Visual progress of user's work

### 👥 User Management
- **User List**: View all system users with roles and status
- **User Creation**: Add new users with role assignment
- **User Profiles**: Edit user information and change roles
- **Activity Tracking**: Monitor user login and activity patterns

### 🏢 Client Management
- **Client Directory**: Comprehensive list of all clients
- **Client Profiles**: Detailed client information and contact details
- **Client Creation**: Add new clients with custom fields
- **Contact Management**: Multiple contacts per client
- **Client Assignment**: Assign clients to specific users

### 🎯 Lead Management
- **Lead Pipeline**: Visual pipeline with status-based columns
- **Lead Creation**: Capture new leads with source tracking
- **Lead Conversion**: Convert qualified leads to clients
- **Status Management**: Track lead progress through sales funnel
- **Lead Sources**: Track where leads are coming from

### 📋 Project Management
- **Project List**: Overview of all projects with status filters
- **Project Creation**: Create projects linked to clients
- **Project Tracking**: Monitor project progress and milestones
- **Task Assignment**: Assign tasks within projects
- **Status Workflows**: Customizable project status workflows

### ✅ Task Management
- **Task List**: View and filter tasks by status, assignee, or project
- **Task Creation**: Create tasks with priorities and due dates
- **Task Assignment**: Assign tasks to team members
- **Progress Tracking**: Monitor task completion and time tracking
- **Task Dependencies**: Set up task relationships

### 📊 Activity Logs
- **Activity Timeline**: Chronological view of all system activities
- **Filtering**: Filter by date, user, type, or entity
- **Detailed Logs**: View complete activity details
- **Export Options**: Export activity reports

### ⚙️ Settings & Configuration
- **User Preferences**: Theme selection, notification settings
- **System Settings**: Configure system-wide preferences
- **Custom Fields**: Add custom fields to clients, leads, or projects
- **Status Management**: Customize status options for different entities

## 🔐 Authentication & Roles

### Role-Based Access Control

**Admin Role:**
- Full system access
- User management capabilities
- System configuration access
- Comprehensive analytics dashboard
- All CRUD operations

**User Role:**
- Limited to assigned data
- Personal dashboard
- Cannot manage other users
- Task and project participation
- Activity logging for assigned items

### Security Features
- **Session Management**: Secure session handling
- **Password Security**: Hashed passwords with Laravel's bcrypt
- **CSRF Protection**: Built-in CSRF token validation
- **Authentication Middleware**: Route-level authentication
- **First Login Tracking**: Welcome modals for new users

## 🎨 UI/UX Features

### Theme System
- **Dark/Light Mode**: Automatic theme detection and manual toggle
- **Theme Persistence**: User preference saved in localStorage
- **System Integration**: Respects OS theme preferences
- **Seamless Transitions**: Smooth theme switching animations

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect tablet experience
- **Desktop Enhancement**: Full desktop feature set
- **Cross-Browser**: Compatible with all modern browsers

### Component Library
- **shadcn/ui**: Modern, accessible components
- **Custom Components**: Project-specific UI components
- **Consistent Design**: Unified design system
- **Interactive Elements**: Hover states, animations, and transitions

### Navigation
- **Sidebar Navigation**: Collapsible sidebar with route highlighting
- **Breadcrumbs**: Clear navigation path indication
- **Quick Actions**: Floating action buttons for common tasks
- **Search**: Global search functionality

## 🧪 Testing

### Running Tests

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/UserTest.php

# Run tests with coverage
php artisan test --coverage
```

### Test Structure
- **Feature Tests**: End-to-end application testing
- **Unit Tests**: Individual component testing
- **Database Tests**: Database interaction testing
- **API Tests**: API endpoint testing

## 🤝 Contributing

I welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **🐛 Bug Reports**: Report bugs via [GitHub Issues](https://github.com/edmyrbatiancila/crm-lite/issues)
2. **💡 Feature Requests**: Suggest new features or improvements
3. **📖 Documentation**: Improve documentation and guides
4. **🔧 Code Contributions**: Submit pull requests with bug fixes or features
5. **🧪 Testing**: Help test new features and report issues

### Development Workflow

1. **Fork the repository**
   ```bash
   git fork https://github.com/edmyrbatiancila/crm-lite.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow coding standards
   - Add tests for new features
   - Update documentation

4. **Test your changes**
   ```bash
   php artisan test
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide clear description
   - Reference any related issues
   - Include screenshots for UI changes

### Coding Standards

- **PHP**: Follow PSR-12 coding standards
- **JavaScript/TypeScript**: Use ESLint and Prettier configurations
- **Commit Messages**: Use conventional commit format
- **Documentation**: Update relevant documentation

### Development Environment

```bash
# Install development dependencies
composer install --dev
npm install

# Set up pre-commit hooks
composer run post-create-project-cmd

# Run development server with hot reload
npm run dev
php artisan serve
```

## 🔧 Customization

### Adding Custom Fields
1. Create migration for new fields
2. Update model fillable attributes
3. Add form fields in React components
4. Update TypeScript interfaces

### Creating New Pages
1. Add route in `routes/web.php`
2. Create controller method
3. Create React component in `resources/js/pages/`
4. Add navigation link if needed

### Styling Customization
- Edit `tailwind.config.js` for theme customization
- Modify component styles in respective files
- Use CSS custom properties for consistent theming

## 📚 Additional Resources

- **[Laravel Documentation](https://laravel.com/docs)**
- **[React Documentation](https://reactjs.org/docs)**
- **[Inertia.js Documentation](https://inertiajs.com)**
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**
- **[shadcn/ui Documentation](https://ui.shadcn.com)**

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
```bash
# Check database configuration
php artisan config:cache
php artisan migrate:status
```

**Frontend Build Issues:**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules
npm install
```

**Permission Issues:**
```bash
# Fix storage permissions
chmod -R 755 storage bootstrap/cache
```

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Laravel Team** - For the amazing PHP framework
- **React Team** - For the powerful frontend library
- **Inertia.js Team** - For bridging backend and frontend seamlessly
- **shadcn** - For the beautiful UI components
- **Tailwind CSS Team** - For the utility-first CSS framework

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/edmyrbatiancila/crm-lite/issues)
- **Discussions**: [Join community discussions](https://github.com/edmyrbatiancila/crm-lite/discussions)
- **Email**: [edmyrbatiancila@gmail.com](mailto:edmyrbatiancila@example.com)

---

**Made with ❤️ by [Edmyr Batiancila](https://github.com/edmyrbatiancila)**

If you find this project helpful, please consider giving it a ⭐ on GitHub!

[⬆ Back to Top](#-crm-lite-modern-customer-relationship-management-system)
# Railway deployment trigger
