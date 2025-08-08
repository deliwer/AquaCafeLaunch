# DeliWer - Dubai Planet Heroes Trade Service

## Overview

DeliWer is a gamified iPhone-to-water filtration trade service that transforms device trade-ins into an environmental impact game. The platform allows users to trade their iPhones for AquaCafe water filtration systems while participating in a "Planet Heroes" gamification system complete with achievements, leaderboards, and environmental impact tracking. The application emphasizes instant gratification through real-time rewards and builds community engagement around sustainability goals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management and data fetching
- **UI Components**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming and gamification colors
- **Design System**: Custom fonts (Inter, Poppins) with extensive use of CSS custom properties for consistent theming

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful APIs for trade-ins, orders, leaderboards, and community challenges
- **Middleware**: Request logging, JSON parsing, and error handling
- **Development**: Custom Vite integration for development mode with HMR support

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon Database serverless PostgreSQL
- **Schema Design**: 
  - Users table with gamification fields (hero levels, points, achievements)
  - Leaderboard table for competitive rankings
  - Trade-ins table for device submissions
  - AquaCafe orders table for filtration system orders
  - Affiliates table for partnership program
- **Migrations**: Drizzle Kit for database schema management

### Gamification System
- **Achievement System**: Level-based progression with instant rewards
- **Point System**: Environmental impact translated to game points
- **Leaderboard**: Real-time community rankings
- **Instant Gratification**: Immediate feedback and rewards upon actions
- **Community Challenges**: Collective goals with progress tracking

### Form Handling & Validation
- **Forms**: React Hook Form with Zod schema validation
- **Type Safety**: Drizzle-Zod integration for runtime type checking
- **User Input**: Comprehensive form components for trade-ins and orders

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form handling with validation
- **@hookform/resolvers**: Form validation resolvers

### UI & Styling
- **@radix-ui/***: Complete set of unstyled, accessible UI components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional CSS class handling
- **lucide-react**: Icon library

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution environment
- **esbuild**: Fast JavaScript bundler for production

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development environment integration

### Additional Libraries
- **wouter**: Lightweight client-side routing
- **date-fns**: Date manipulation utilities
- **embla-carousel-react**: Carousel components
- **cmdk**: Command palette interface