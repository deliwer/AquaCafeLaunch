# DeliWer - Dubai Planet Heroes Trade Service

## Overview

DeliWer is a gamified iPhone-to-water filtration trade service that transforms device trade-ins into a global environmental impact game. The platform allows users worldwide to trade their iPhones for AquaCafe water filtration systems while participating in a "Planet Heroes" gamification system with achievements, leaderboards, and real-time environmental impact tracking. 

**Key Features:**
- 🚀 iPhone 17 Launch Campaign with First 100 Heroes exclusive rewards
- Professional gamification system designed for Dubai's business community  
- Climate contribution tracking with #SayNoToPlastic lunch credit system
- Kangen K8 water filtration upgrades for premium trade-ins
- Real-time leaderboard competition with carbon/plastic impact metrics
- Social media integration with LinkedIn/Instagram bonus multipliers
- Restaurant partnership network for lunch credits and agent commissions
- Global deployment with drought region prioritization (Chennai, Cape Town, Perth)
- Database-backed global scaling with PostgreSQL infrastructure
- Mobile-optimized for worldwide accessibility and instant gratification rewards

**Current Status: iPhone 17 Launch Campaign Active - Production-Ready for Global Deployment**

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
- **Point System**: Environmental impact translated to game points with iPhone 17 bonuses
- **Leaderboard**: Real-time community rankings with climate contribution tracking
- **Instant Gratification**: Immediate feedback and rewards upon actions
- **Community Challenges**: Collective goals with progress tracking
- **iPhone 17 Campaign**: First 100 Heroes program with exclusive VIP rewards
- **Climate Tracking**: Personal carbon/plastic impact dashboard with professional metrics
- **Social Rewards**: LinkedIn sharing bonuses and restaurant lunch credit system
- **Professional Appeal**: Mature gamification targeting Dubai business professionals

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