# Portfolio Enquiry Management System - Project Showcase

## 🎯 Project Overview

The **Portfolio Enquiry Management System** is a full-stack web application designed to help creative professionals manage project inquiries efficiently. It combines a beautiful, responsive portfolio landing page with a comprehensive enquiry management dashboard.

### Key Features

#### 1. **Landing Page (Portfolio)**
- Self-introduction section with professional bio
- Bold, black sans-serif typography for strong visual hierarchy
- Pale cool gray background with soft pastel blue and pink geometric accents
- Responsive design optimized for mobile and desktop
- Call-to-action "Hire Me" button
- Statistics showcase (50+ projects, 30+ clients, 5+ years experience)

#### 2. **Contact/Enquiry Form**
- Comprehensive form with 6 required fields:
  - Client Name
  - Project Name
  - Phone Number
  - Project Description (minimum 10 characters)
  - Budget
  - Relevant Links (GitHub, Figma, Drive, etc.)
- Real-time form validation with error messages
- Success/error toast notifications
- Clean, minimalist design matching Scandinavian aesthetic

#### 3. **Enquiry Management Dashboard**
- Tabular display of all submitted enquiries
- Search functionality (by name, project, or phone)
- Status tracking (New, Reviewed, In Progress, Completed)
- Quick action buttons (View Details, Delete)
- Real-time statistics cards showing:
  - Total enquiries count
  - New enquiries count
  - In-progress enquiries count
  - Completed enquiries count

#### 4. **Enquiry Details Modal**
- Full enquiry information display
- Clickable links for GitHub, Figma, Drive, etc.
- Status badge with color coding
- Submission and update timestamps
- Scrollable content for detailed descriptions

#### 5. **Common Layout**
- Sticky header with navigation (Home, Contact, Enquiries)
- Logo and branding
- Authentication buttons (Login/Logout)
- Footer with quick links and contact information
- Consistent styling across all pages

---

## 🏗️ Technical Architecture

### Frontend Stack
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Pre-built component library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **tRPC** - End-to-end type-safe API communication
- **Wouter** - Lightweight client-side routing
- **date-fns** - Date formatting and manipulation
- **Recharts** - Data visualization (for future analytics)

### Backend Stack
- **Node.js + Express** - Server runtime and framework
- **tRPC** - Type-safe RPC framework
- **Drizzle ORM** - Type-safe database access
- **MySQL/TiDB** - Database
- **Zod** - Input validation
- **Vitest** - Unit testing framework

### Database Schema
```
Enquiries Table:
- id (Primary Key)
- clientName (varchar 255)
- projectName (varchar 255)
- phoneNumber (varchar 20)
- projectDescription (text)
- budget (varchar 100)
- relevantLinks (text - JSON array)
- status (enum: new, reviewed, in-progress, completed)
- createdAt (timestamp)
- updatedAt (timestamp)
```

---

## 🎨 Design System

### Color Palette (Scandinavian Aesthetic)
- **Background**: Pale cool gray (`oklch(0.96 0.002 286)`)
- **Foreground**: Bold black (`oklch(0.15 0.01 65)`)
- **Primary**: Soft pastel blue (`oklch(0.45 0.12 260)`)
- **Accent**: Soft blush pink (`oklch(0.85 0.12 15)`)
- **Secondary**: Light pastel blue (`oklch(0.88 0.08 260)`)

### Typography
- **Primary Font**: Sora (Bold, 400-800 weights)
  - Headlines: Bold, black weight for strong visual hierarchy
  - Body: Regular weight for readability
- **Accent Font**: Poppins (Thin, 300-600 weights)
  - Subtitles and captions for delicate contrast

### Spacing & Layout
- Generous negative space for minimalist feel
- Responsive padding: 16px (mobile), 24px (tablet), 32px (desktop)
- Rounded corners: 0.65rem standard radius
- Smooth transitions and hover effects

---

## 📊 API Endpoints (tRPC Procedures)

### Enquiry CRUD Operations

#### List All Enquiries
```
trpc.enquiry.list.useQuery()
```
Returns array of all enquiries sorted by creation date (newest first)

#### Get Enquiry by ID
```
trpc.enquiry.getById.useQuery({ id: number })
```
Returns single enquiry or throws NOT_FOUND error

#### Create Enquiry
```
trpc.enquiry.create.useMutation()
```
Input validation:
- clientName: required, max 255 chars
- projectName: required, max 255 chars
- phoneNumber: required, max 20 chars
- projectDescription: required, min 10 chars
- budget: required, max 100 chars
- relevantLinks: optional

#### Update Enquiry
```
trpc.enquiry.update.useMutation()
```
All fields optional, updates only provided fields

#### Delete Enquiry
```
trpc.enquiry.delete.useMutation()
```
Permanently removes enquiry from database

---

## ✅ Testing Coverage

### Backend Tests (Vitest)
- ✅ Enquiry list retrieval
- ✅ Enquiry by ID lookup
- ✅ Enquiry creation with validation
- ✅ Enquiry updates
- ✅ Enquiry deletion
- ✅ Error handling for missing enquiries
- ✅ Input validation for all fields

### Frontend Features
- ✅ Landing page responsive design
- ✅ Contact form validation
- ✅ Enquiry submission flow
- ✅ Dashboard table display
- ✅ Search and filter functionality
- ✅ Modal popup interactions
- ✅ Delete confirmation dialogs
- ✅ Success/error notifications

---

## 📈 Project Statistics & Metrics

### Code Quality
- **Backend**: 9 passing tests
- **Database**: 2 tables (users, enquiries)
- **API Procedures**: 5 CRUD operations
- **Frontend Pages**: 3 main pages (Home, Contact, Enquiries)
- **Components**: 5 reusable components (Header, Footer, EnquiryModal, etc.)

### Performance Considerations
- Lazy loading of enquiry data
- Optimized database queries with proper indexing
- Client-side search filtering for better UX
- Efficient form validation with React Hook Form
- Minimal re-renders with proper state management

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px (sm), 1024px (lg)
- Touch-friendly button sizes
- Readable font sizes across devices
- Flexible grid layouts

---

## 🚀 Deployment & Usage

### Getting Started
1. Navigate to the home page to view the portfolio
2. Click "Hire Me" or go to Contact page to submit an enquiry
3. Fill out the form with project details
4. View all submissions in the Enquiries dashboard
5. Click on any enquiry to view full details
6. Delete enquiries as needed

### Features Walkthrough

**Landing Page**
- Professional introduction with specialization highlights
- Statistics showing experience and portfolio size
- Clear CTA buttons for engagement

**Contact Form**
- Intuitive form layout with helpful placeholders
- Real-time validation feedback
- Optional links section for sharing resources
- Success confirmation after submission

**Enquiries Dashboard**
- Comprehensive table view of all submissions
- Quick search by client name, project, or phone
- Status indicators with color coding
- Inline actions for viewing details or deleting
- Summary statistics at bottom

---

## 🎯 Future Enhancements

- Email notifications for new enquiries
- Enquiry status update notifications
- Advanced filtering and sorting options
- Export enquiries to CSV/PDF
- Client communication history
- Project timeline tracking
- Budget tracking and analytics
- Team collaboration features
- Mobile app version

---

## 📝 Implementation Notes

### Scandinavian Design Philosophy
The application embraces minimalist Scandinavian design principles:
- **Simplicity**: Clean, uncluttered interface
- **Functionality**: Every element serves a purpose
- **Minimalism**: Generous whitespace and negative space
- **Subtlety**: Soft colors and delicate typography contrasts
- **Authenticity**: Honest, straightforward user experience

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Responsive text sizing

### Security
- Input validation on both client and server
- Type-safe API communication with tRPC
- Protected database operations
- Secure session management with cookies

---

## 📞 Support & Contact

For questions or feature requests regarding the Portfolio Enquiry Management System, please use the contact form on the application itself or reach out through the provided contact information.

---

**Project Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production Ready ✅
