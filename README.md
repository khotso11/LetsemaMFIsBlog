# LetsemaMFIsBlog
# Letsema - Distributed Microfinance System
![brave_screenshot_kkfinance localhost](https://github.com/user-attachments/assets/1d5cafa6-532e-4910-a77e-5dfc7a8b0c02)

## Introduction

Letsema is a distributed microfinance management system designed to help Microfinance Institutions (MFIs) efficiently manage loans, users, and financial operations. The system supports three primary roles with distinct functionalities:
- **Borrowers**: Self-register, apply for loans, view loans, make repayments
- **MFI Admins**: Approve/reject loans, manage repayments, view MFI users
- **Letsema Admins**: Register new MFIs, manage all users and system-wide operations

## System Architecture

### Database Design
- **PostgreSQL**: Primary relational database with multi-tenancy (schema-per-tenant)
- **MongoDB**: Stores non-relational borrower credit histories
- **Distributed Architecture**: Master-Master replication across PostgreSQL nodes

### Core Tables
| Table           | Key Fields                          |
|-----------------|-------------------------------------|
| Loan            | loan_id, user_id, mfi_id, amount    |
| User            | user_id, role, personal details    |
| MFI             | mfi_id, name, location, contact    |
| Loan Repayment  | repayment_id, loan_id, amount_paid |

## Key Features

### Role-Based Functionalities
- **Borrowers**:
  - Self-registration and profile management
  - Loan application and status tracking
  - Repayment dashboard

- **MFI Admins**:
  - Loan approval/rejection workflows
  - User management within their MFI
  - Financial reporting

- **Letsema Admins**:
  - System-wide user management
  - New MFI onboarding (automated schema creation)
  - Global analytics and monitoring

### Technical Highlights
- Multi-tenant architecture with subdomain routing (`[tenant].localhost:8000`)
- Automated tenant provisioning via API
- Distributed PostgreSQL with master-master replication
- Django-based backend with React frontend

## Development Progress

| Component           | Status | Remaining Tasks                |
|---------------------|--------|---------------------------------|
| Backend Database    | 90%    | Replication optimization       |
| User Authentication | 100%   | None                           |
| Loan Management     | 90%    | Admin workflow improvements    |
| Frontend (React)    | 30%    | Complete borrower interfaces   |
| Testing             | 50%    | Expand automated test coverage |

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL 12+
- MongoDB 4.4+

### Installation
```bash
# Backend setup
https://github.com/khotso11/LetsemaMFIsBlog.git
cd letsema-backend
pip install -r requirements.txt
python manage.py migrate

#Jira page
https://hohobe.atlassian.ne/jira/software/projects/LETSEMA/boards/2
# Frontend setup
cd ../letsema-frontend
npm install
npm start

