# CRM Lite – Client & Leads Management System

A lightweight CRM system for managing clients, leads, and sales pipelines. Built using:

- Laravel 12 (Backend)
- InertiaJS (Middleware)
- React + TypeScript (Frontend)
- TailwindCSS (Styling) and ShadCN UI
- MySQL (Database)

## Features

- Client and lead creation, editing, and deletion
- Status-based pipeline view (e.g., New, Contacted, Qualified, etc.)
- Dynamic custom fields per project
- Activity logs (calls, emails, messages)
- Role-based access (admin/recruiter)
- Responsive UI

## Project Structure

- **Frontend**: React + TailwindCSS (inside `/resources/js`)
- **Backend**: Laravel REST APIs and Inertia routes
- **Database**: Managed using Laravel migrations and seeders

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/edmyrbatiancila/crm-lite.git
cd crm-lite
