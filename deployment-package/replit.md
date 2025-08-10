# DeliWer - Dubai Planet Heroes Trade Service

## Overview

DeliWer is a gamified iPhone-to-water filtration trade service that transforms device trade-ins into a global environmental impact game. The platform allows users worldwide to trade their iPhones for AquaCafe water filtration systems while participating in a "Planet Heroes" gamification system with achievements, leaderboards, and real-time environmental impact tracking. 

**Key Features:**
- Global deployment with drought region prioritization (Chennai, Cape Town, Perth)
- 30% commission partnership program with NFT rewards for agents and restaurants
- Real-time global impact tracking with crisis region monitoring
- Shopify Dawn theme integration with copy-paste Liquid templates
- Database-backed global scaling with PostgreSQL infrastructure
- Mobile-optimized for worldwide accessibility and instant gratification rewards

**Current Status: Production-Ready for Global Deployment**

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
- **Database**: PostgreSQL with Drizzle ORM for production deployment
- **Connection**: Neon Database serverless PostgreSQL with global scaling
- **Schema Design**: 
  - Users table with location tracking (country, city) and NFT wallet support
  - Leaderboard table with country-filtered competitive rankings
  - Trade-ins table for device submissions with impact point calculations
  - AquaCafe orders table with instant reward system
  - Affiliates table with NFT rewards and global commission tracking
  - DroughtRegions table for crisis monitoring and priority support
  - CommunityChallenge table with regional targeting and urgency levels
- **Global Features**: Multi-country support, drought region prioritization, NFT-based rewards
- **Migrations**: Drizzle Kit with production schema deployed

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