import { Link } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';

const weeklyReports = [
  {
    week: 1,
    title: 'FIRST WEEK',
    activities: [
      'Project ideation and requirements analysis for the ScholarGuide platform.',
      'Identified key scholarship sources: JNTUA CEA endowments, Buddy4Study, National Scholarship Portal (NSP), and RDT scholarships.',
      'Defined project scope, core features, and technology stack (React, Tailwind CSS, Base44 BaaS).',
      'Created initial wireframes and design mockups for the landing page and dashboard.',
    ],
  },
  {
    week: 2,
    title: 'SECOND WEEK',
    activities: [
      'Designed the visual identity — navy and gold colour palette with Playfair Display and Inter typography.',
      'Developed the public Landing page with hero section, feature highlights, and call-to-action.',
      'Built the PublicNavbar component for unauthenticated navigation.',
      'Set up the project structure, routing, and layout components.',
    ],
  },
  {
    week: 3,
    title: 'THIRD WEEK',
    activities: [
      'Implemented the authentication system: Login, Register with OTP verification, Forgot Password, and Reset Password flows.',
      'Designed the user profile schema with academic details (branch, year, gender, college).',
      'Built the Profile page with editable fields and scholarship eligibility indicators.',
      'Integrated Google OAuth for single-click sign-in.',
    ],
  },
  {
    week: 4,
    title: 'FOURTH WEEK',
    activities: [
      'Collected and structured JNTUA CEA endowment scholarship data (alumni and other endowments).',
      'Built the JNTUA CEA page with multi-dimensional filtering (branch, gender, year) and summary dashboard.',
      'Created the ScholarshipDetailModal component for viewing full endowment details.',
      'Implemented the bookmark/save functionality for endowment scholarships.',
    ],
  },
  {
    week: 5,
    title: 'FIFTH WEEK',
    activities: [
      'Developed the Explore page with tabbed navigation for Buddy4Study, NSP, RDT, and custom scholarships.',
      'Aggregated external scholarship data from Buddy4Study and National Scholarship Portal.',
      'Implemented search, gender filter, and JSON export functionality.',
      'Built the ExternalScholarshipCard component with source badges and apply links.',
    ],
  },
  {
    week: 6,
    title: 'SIXTH WEEK',
    activities: [
      'Built the user Dashboard with personalized greeting and saved scholarship overview.',
      'Developed the Saved Scholarships page with status indicators and scholarship management.',
      'Created the AppLayout with responsive sidebar navigation and mobile drawer.',
      'Implemented real-time data syncing for saved scholarship lists.',
    ],
  },
  {
    week: 7,
    title: 'SEVENTH WEEK',
    activities: [
      'Built the Admin Dashboard with full CRUD operations for scholarship records.',
      'Implemented access control restricted to authorized admin emails.',
      'Developed the Calendar Sync feature — Google Calendar URL generation and .ics file download for scholarship deadlines.',
      'Built the Settings page with theme toggle, password management, and data privacy controls.',
    ],
  },
  {
    week: 8,
    title: 'EIGHTH WEEK',
    activities: [
      'Conducted end-to-end testing of all user flows: registration, browsing, saving, and calendar sync.',
      'Fixed bugs related to filtering logic, responsive layouts, and session management.',
      'Prepared the project report documentation and screenshots.',
      'Finalised deployment and reviewed the platform for production readiness.',
    ],
  },
];

function ChapterTitle({ number, title }) {
  return (
    <div className="text-center py-8 page-break-before">
      <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">Chapter {number}</p>
      <h2 className="font-heading text-2xl font-bold text-navy mt-2 uppercase tracking-wide">{title}</h2>
      <div className="w-20 h-0.5 bg-gold mx-auto mt-4" />
    </div>
  );
}

function ScreenshotPlaceholder({ label }) {
  return (
    <div className="my-6 border-2 border-dashed border-border rounded-xl bg-secondary/50 py-16 text-center">
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

function SignatureLine() {
  return (
    <div className="flex justify-between mt-12 pt-6 border-t border-border">
      <div className="text-sm text-muted-foreground">Signature of the Student</div>
      <div className="text-sm text-muted-foreground">Signature of the Mentor</div>
    </div>
  );
}

export default function ProjectReport() {
  return (
    <div className="min-h-screen bg-white">
      {/* Toolbar */}
      <div className="no-print sticky top-0 z-50 bg-navy text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to App
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-gold text-navy text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gold/90 transition-colors"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
      </div>

      {/* Report Content */}
      <div className="max-w-4xl mx-auto px-8 py-12 space-y-6 text-foreground">

        {/* ===== TITLE PAGE ===== */}
        <section className="text-center py-20 space-y-6">
          <p className="text-lg font-heading text-muted-foreground">Project Report on</p>
          <h1 className="font-heading text-4xl font-bold text-navy">ScholarGuide</h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Submitted in fulfilment of requirement for the B.Tech Community Service Project
          </p>
          <p className="text-base font-medium text-foreground">Bachelor of Technology</p>
          <p className="text-sm text-muted-foreground">Of</p>
          <p className="text-base font-medium text-foreground">
            Jawaharlal Nehru Technological University (JNTUCEA), Anantapur
          </p>
          <p className="text-sm text-muted-foreground">By</p>
          <p className="text-base font-medium text-foreground">
            K. Mothish Raghavendra (24005A0512)<br />
            S. Sahil Khan (23001A0559)<br />
            S. Hari Krishna (24005A0502)
          </p>
          <p className="text-sm text-muted-foreground">Under the guidance of</p>
          <p className="text-base font-medium text-foreground">Dr R Rajasekhar</p>
          <p className="text-sm text-muted-foreground">Professor of JNTUCEA</p>

          <div className="pt-12 space-y-2">
            <p className="text-sm font-medium text-foreground uppercase tracking-wide">
              Department of Computer Science Engineering
            </p>
            <p className="text-sm text-muted-foreground">
              Jawaharlal Nehru Technological University Anantapur
            </p>
            <p className="text-sm text-muted-foreground">
              Sir Mokshagundam Vishveshwariah Road, Ananthapuramu, 515002
            </p>
          </div>

          <div className="pt-12 space-y-2">
            <p className="text-base font-bold text-foreground uppercase tracking-wide">
              Jawaharlal Nehru Technological University
            </p>
            <p className="text-sm font-medium text-foreground">
              Anantapur College of Engineering (Autonomous)
            </p>
            <p className="text-sm text-muted-foreground">
              Ananthapuramu – 515002 Andhra Pradesh
            </p>
            <p className="text-sm font-medium text-navy">2025–2026</p>
          </div>
        </section>

        {/* ===== CERTIFICATE ===== */}
        <section className="page-break-before py-10 space-y-6">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Department of Computer Science and Engineering
          </p>
          <h2 className="font-heading text-3xl font-bold text-navy text-center">Certificate</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
          <p className="text-justify text-sm leading-relaxed text-foreground mt-8">
            This is to certify that the community service project report titled &ldquo;ScholarGuide&rdquo; is a
            Bonafide record of work done by K. Mothish Raghavendra, S. Sahil Khan, S. Hari Krishna bearing
            Admission No 24005A0512, 23001A0559, 24005A0502 is submitted to &ldquo;Department of Computer Science
            and Engineering, Jawaharlal Nehru Technological University Anantapur, College of Engineering
            (Autonomous), Anantapur&rdquo;.
          </p>
          <div className="flex justify-between mt-16">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Place: Anantapur</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Signature of the Guide</p>
              <p className="mt-8">Dr R Rajasekhar</p>
            </div>
          </div>
        </section>

        {/* ===== DECLARATION ===== */}
        <section className="page-break-before py-10 space-y-6">
          <h2 className="font-heading text-2xl font-bold text-navy text-center uppercase">Declaration</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
          <p className="text-justify text-sm leading-relaxed text-foreground mt-8">
            We hereby declare that this community service project report titled &ldquo;SCHOLARGUIDE&rdquo; has been
            written by us. The work carried out is original and has not been submitted to any other university or
            institution for the award of any credits.
          </p>
          <div className="flex justify-between mt-16">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Place: Anantapur</p>
              <p className="mt-1">Date:</p>
            </div>
            <div className="text-sm text-foreground text-right space-y-6">
              <p>S. Sahil Khan (23001A0559)</p>
              <p>S. Hari Krishna (24005A0502)</p>
              <p>K. Mothish Raghavendra (24005A0512)</p>
            </div>
          </div>
        </section>

        {/* ===== ACKNOWLEDGEMENT ===== */}
        <section className="page-break-before py-10 space-y-4">
          <h2 className="font-heading text-2xl font-bold text-navy text-center uppercase">Acknowledgement</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
          <div className="text-justify text-sm leading-relaxed text-foreground space-y-4 mt-8">
            <p>
              It is a great pleasure to express a deep sense of gratitude and veneration to our guide
              Dr. R. Rajasekhar, Professor of Computer Science and Engineering.
            </p>
            <p>
              We are greatly indebted to Dr. K.F. Bharati, Head of Department, for her valuable guidance. Her
              advice, assistance and patience are greatly appreciated by the Computer Science and Engineering
              Department for providing outstanding information and assistance for completion of projects.
            </p>
            <p>
              We also express our sincere thanks to the principal of JNTUA College of Engineering Anantapur,
              Dr. P. Chenna Reddy, for his encouragement and for providing the required facilities throughout the
              project.
            </p>
            <p>
              We would like to thank all the staff of the Computer Science and Engineering department for their
              excellent monitoring and their suggestions that helped in successful completion of our community
              service project.
            </p>
            <p>
              We also thank all the students who supported and encouraged us with their valuable feedback during
              the development of our community service platform.
            </p>
            <p>
              Above all, we thank our parents, whose encouragement has provided us with the opportunity to do our
              project work according to our wish.
            </p>
          </div>
          <div className="text-right text-sm text-foreground space-y-6 mt-10">
            <p>S. Sahil Khan (23001A0559)</p>
            <p>S. Hari Krishna (24005A0502)</p>
            <p>K. Mothish Raghavendra (24005A0512)</p>
          </div>
        </section>

        {/* ===== TABLE OF CONTENTS ===== */}
        <section className="page-break-before py-10 space-y-4">
          <h2 className="font-heading text-2xl font-bold text-navy text-center uppercase">Table of Contents</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
          <div className="mt-8 space-y-3 text-sm">
            <p className="font-semibold text-navy">Chapter 1 — Introduction</p>
            <p className="pl-6 text-muted-foreground">1.1 Abstract</p>
            <p className="pl-6 text-muted-foreground">1.2 Introduction</p>
            <p className="font-semibold text-navy mt-4">Chapter 2 — Technologies Used</p>
            <p className="pl-6 text-muted-foreground">2.1 Frontend Technologies</p>
            <p className="pl-6 text-muted-foreground">2.2 Backend Technologies</p>
            <p className="pl-6 text-muted-foreground">2.3 Other Software / Technologies Used</p>
            <p className="font-semibold text-navy mt-4">Chapter 3 — Design</p>
            <p className="pl-6 text-muted-foreground">3.1 Landing Page — 3.2 Login &amp; Register — 3.3 Dashboard</p>
            <p className="pl-6 text-muted-foreground">3.4 Explore — 3.5 JNTUA CEA — 3.6 Saved Scholarships</p>
            <p className="pl-6 text-muted-foreground">3.7 Profile — 3.8 Settings — 3.9 Admin Dashboard</p>
            <p className="pl-6 text-muted-foreground">3.10 Database Schema</p>
            <p className="font-semibold text-navy mt-4">Chapter 4 — Implementation</p>
            <p className="pl-6 text-muted-foreground">4.1 Implementation — 4.2 Project Files</p>
            <p className="font-semibold text-navy mt-4">Chapter 5 — Weekly Report</p>
            <p className="font-semibold text-navy mt-4">Chapter 6 — Future Work &amp; Conclusion</p>
            <p className="font-semibold text-navy mt-4">Appendix</p>
            <p className="font-semibold text-navy mt-4">References</p>
          </div>
        </section>

        {/* ===== CHAPTER 1: INTRODUCTION ===== */}
        <section className="page-break-before">
          <ChapterTitle number={1} title="Introduction" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">1.1 Abstract</h3>
          <div className="text-justify text-sm leading-relaxed text-foreground space-y-4 mt-3">
            <p>
              In academic institutions, students often miss out on valuable scholarship opportunities due to lack
              of awareness, scattered information across multiple portals, and difficulty in tracking application
              deadlines. Scholarships from government portals like the National Scholarship Portal (NSP), private
              platforms like Buddy4Study, and institutional endowments such as JNTUA CEA scholarships are spread
              across different sources, making it challenging for students to discover opportunities relevant to
              their branch, gender, and year of study. To address this issue, we developed SCHOLARGUIDE — a
              comprehensive scholarship discovery and management platform that centralizes scholarship information
              from multiple sources and provides personalised filtering, saving, and deadline tracking
              capabilities.
            </p>
            <p>
              SCHOLARGUIDE provides a streamlined web-based platform where students can browse scholarships from
              JNTUA CEA endowments, Buddy4Study, NSP, and RDT, filtered by branch, gender, year of study, and
              category. A key feature of the platform is the ability to save scholarships to a personal profile and
              sync application deadlines directly to the user&rsquo;s personal calendar (Google Calendar, Apple
              Calendar, Outlook), ensuring they never miss an application date. The platform also includes an admin
              dashboard for managing custom scholarship entries and a profile system that stores academic details
              for personalised recommendations.
            </p>
            <p>
              By centralising scholarship information and providing deadline management tools, SCHOLARGUIDE not
              only increases scholarship awareness but also ensures timely applications. The platform fosters
              accessibility, transparency, and equal opportunity by making scholarship discovery effortless for all
              students. Its intuitive interface, multi-source aggregation, and calendar integration ensure a smooth
              and efficient experience. Ultimately, SCHOLARGUIDE aims to make scholarship discovery more
              accessible, organised, and effective for the entire student community.
            </p>
          </div>

          <h3 className="font-heading text-lg font-bold text-navy mt-8">1.2 Introduction</h3>
          <div className="text-justify text-sm leading-relaxed text-foreground space-y-4 mt-3">
            <p>
              The SCHOLARGUIDE platform project report outlines the conception, design, and implementation of a
              comprehensive and student-centric web application that facilitates the discovery and management of
              scholarship opportunities in educational institutions. Aimed at addressing the recurring issue of
              students missing scholarship deadlines and being unaware of available opportunities, this project
              introduces a digital solution that aggregates scholarships from multiple sources into a single,
              searchable platform.
            </p>
            <p>
              By leveraging modern web development technologies, the platform empowers students to browse, filter,
              and save scholarships tailored to their academic profile — branch, gender, year of study — without
              needing to visit multiple portals individually. The system promotes direct access to application
              portals through external links, thereby removing the friction of searching for scholarships across
              scattered websites. This approach not only saves time for students but also ensures that no
              opportunity is missed due to lack of awareness, supporting equal access to financial aid.
            </p>
            <p>
              The development process involves modern web technologies such as React for the front-end, Tailwind
              CSS for styling, and Vite as the build tool. The backend is powered by Base44, a backend-as-a-service
              platform that provides authentication, database management, and integration capabilities out of the
              box. The report highlights how intuitive design, source-based navigation, and calendar integration
              tools enhance user experience, encouraging broader participation and fostering a spirit of equal
              opportunity within academic communities.
            </p>
            <p>
              Through a detailed examination of the platform&rsquo;s design choices, development challenges, and
              implemented solutions, this report demonstrates how SCHOLARGUIDE contributes to building a more
              informed, organised, and empowered student community.
            </p>
          </div>
        </section>

        {/* ===== CHAPTER 2: TECHNOLOGIES USED ===== */}
        <section className="page-break-before">
          <ChapterTitle number={2} title="Technologies Used" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">2.1 Frontend Technologies</h3>
          <div className="space-y-4 mt-4">
            <div>
              <p className="font-semibold text-sm text-foreground">React</p>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
                React is a popular JavaScript library for building user interfaces, developed by Meta. It uses a
                component-based architecture and a virtual DOM for efficient rendering. In this project, React is
                used to build the entire front-end, including the landing page, dashboard, scholarship browsing
                interface, and admin panel. React Hooks such as useState and useEffect are used for state
                management and side-effect handling.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">Tailwind CSS</p>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
                Tailwind CSS is a utility-first CSS framework that enables rapid UI development with pre-defined
                utility classes. It ensures a consistent and responsive design system. In this project, Tailwind CSS
                is used to style all pages, implement the navy-and-gold theme, and create a mobile-first responsive
                layout that works seamlessly across desktop, tablet, and mobile devices.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">JavaScript (ES6+)</p>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
                JavaScript is a powerful scripting language used to add interactivity and dynamic behaviour to web
                pages. In this project, JavaScript is used for form validation, real-time filtering of scholarships,
                calendar sync URL generation, .ics file creation, and dynamic content rendering using the Fetch API
                to communicate with the Base44 backend.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">Vite</p>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
                Vite is a modern build tool and development server that offers fast hot-module replacement and
                optimised bundling. In this project, Vite is used as the build tool, providing a fast development
                experience and producing optimised production builds for deployment.
              </p>
            </div>
          </div>

          <h3 className="font-heading text-lg font-bold text-navy mt-8">2.2 Backend Technologies</h3>
          <div className="space-y-4 mt-4">
            <div>
              <p className="font-semibold text-sm text-foreground">Base44 (Backend-as-a-Service)</p>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
                Base44 is a backend-as-a-service platform that provides authentication, database management,
                integrations, and hosting out of the box. In this project, Base44 is used for user authentication
                (email/password, Google OAuth, OTP verification), database operations for the Scholarship entity
                (CRUD), and integration with the InvokeLLM service for AI-powered features. It also handles
                real-time data subscriptions for live updates.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">Base44 Entity System</p>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
                The Base44 entity system provides a JSON-schema-based data model for storing and retrieving
                structured data. In this project, the Scholarship entity stores scholarship details including name,
                amount, eligibility, branch, gender eligibility, source, deadline, and application URL. The User
                entity stores profile information such as branch, year, gender, and saved scholarship IDs.
              </p>
            </div>
          </div>

          <h3 className="font-heading text-lg font-bold text-navy mt-8">2.3 Other Software / Technologies Used</h3>
          <div className="space-y-4 mt-4">
            <div>
              <p className="font-semibold text-sm text-foreground">shadcn/ui</p>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
                shadcn/ui is a collection of reusable, accessible UI components built on Radix UI primitives. In
                this project, shadcn/ui components such as Button, Input, Label, Dialog, and Toast are used to
                ensure a consistent, accessible, and professional user interface.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">lucide-react</p>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
                lucide-react is an open-source icon library that provides a wide range of clean, customisable SVG
                icons. In this project, lucide-react icons are used throughout the interface for navigation,
                scholarship cards, filters, and action buttons, ensuring a consistent visual language.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">Visual Studio Code</p>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
                Visual Studio Code is a lightweight but powerful source code editor developed by Microsoft. It
                supports multiple programming languages and comes with features like syntax highlighting,
                IntelliSense, debugging tools, and Git integration. In this project, VS Code was used as the primary
                development environment.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">GitHub</p>
              <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
                GitHub is a web-based platform used for version control and collaborative development. In this
                project, GitHub was used to manage code versions, back up source files, and enable team
                collaboration throughout the development process.
              </p>
            </div>
          </div>
        </section>

        {/* ===== CHAPTER 3: DESIGN ===== */}
        <section className="page-break-before">
          <ChapterTitle number={3} title="Design" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">3.1 Landing Page</h3>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The Landing page serves as the public entry point for the ScholarGuide platform. It features a hero
            section with the platform name, a value proposition, and key statistics (number of scholarships, sources
            covered). A prominent call-to-action encourages visitors to register. Below the hero, a features
            section highlights core capabilities: scholarship discovery across multiple sources, deadline tracking
            with calendar sync, and personalised profile-based recommendations. An informational section showcases
            the JNTUA CEA endowment portal, and a footer provides branding and copyright. The design uses a navy
            and gold colour palette with Playfair Display headings for a professional, academic aesthetic.
          </p>
          <ScreenshotPlaceholder label="Screenshot — Landing page" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">3.2 Login &amp; Register</h3>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The Login page provides secure access for registered users with email and password fields, password
            visibility toggling, a &ldquo;Remember Me&rdquo; option, and a Google OAuth sign-in button. Links to
            forgot-password and registration pages are provided. The Register page enables new users to create an
            account with email, password, and confirm-password fields, followed by a multi-step OTP verification
            flow. After verification, users complete their profile with academic details including college, branch,
            year of study, and gender. Both pages use a split-screen layout with a decorative branding panel.
          </p>
          <ScreenshotPlaceholder label="Screenshot — Login &amp; Register pages" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">3.3 Dashboard</h3>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The Dashboard serves as the central hub for authenticated users. It displays a personalised greeting
            with the user&rsquo;s name, profile details (branch, year, gender, college), and quick-access shortcuts
            to saved scholarships and the explore page. The dashboard embeds the Explore component, allowing users
              to browse scholarship opportunities directly from their home screen. The AppLayout wraps the dashboard
            with a responsive sidebar containing navigation links to Dashboard, Explore, JNTUA CEA, Saved,
            Profile, Settings, and Admin (for authorised users).
          </p>
          <ScreenshotPlaceholder label="Screenshot — Dashboard" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">3.4 Explore</h3>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The Explore page is the core scholarship browsing interface. It features tabbed navigation for
            different sources: All External, Buddy4Study, NSP Gov.in, RDT, and Custom (database-managed)
            scholarships. A search bar allows text-based searching across scholarship names, providers, and
            eligibility criteria. Gender filters (Any, Girls Only, Boys Only) enable further refinement. Each
            scholarship is displayed in a card with source badge, category badge, amount, eligibility summary,
            gender and year tags, deadline indicator, and an &ldquo;Apply Now&rdquo; button linking to the external
            application portal. A JSON export feature allows users to download filtered results.
          </p>
          <ScreenshotPlaceholder label="Screenshot — Explore page" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">3.5 JNTUA CEA</h3>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The JNTUA CEA page is dedicated to browsing endowment scholarships instituted by JNTUA College of
            Engineering Anantapur. It merges static endowment data with dynamic database entries and provides
            multi-dimensional filtering by branch (CSE, ECE, EEE, ME, CE, Any), gender, and academic year. A summary
            dashboard at the top displays total scholarships and filtered counts. Each scholarship card shows the
            name, amount, beneficiary details, and eligibility. Clicking a card opens the ScholarshipDetailModal
            with full endowment information including the person in whose memory it was instituted.
          </p>
          <ScreenshotPlaceholder label="Screenshot — JNTUA CEA page" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">3.6 Saved Scholarships</h3>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The Saved Scholarships page displays all scholarships a user has bookmarked. Each saved item shows the
            scholarship name, status badge (Open / Closing Soon), amount, branch, gender eligibility, year, and a
            brief eligibility summary. Action buttons include Apply (external link), Details (opens modal), Calendar
            Sync (adds deadline to Google Calendar or downloads .ics file), and Remove. A &ldquo;Sync All
            Deadlines&rdquo; button at the top downloads a single .ics file containing all saved scholarship
            deadlines with one-day reminders.
          </p>
          <ScreenshotPlaceholder label="Screenshot — Saved Scholarships page" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">3.7 Profile</h3>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The Profile page allows students to view and update personal information including full name, college,
            branch, year of study, and gender. It displays dynamic eligibility status tags that indicate which
            scholarship categories (alumni, government, private) the user qualifies for based on their profile
            attributes. The page supports a read-only view and an editable form mode, with visual feedback on
            update status. Profile data is persisted via the Base44 auth updateMe API.
          </p>
          <ScreenshotPlaceholder label="Screenshot — Profile page" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">3.8 Settings</h3>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The Settings page provides account management options including password updates, appearance toggling
            (light/dark mode), and data privacy controls. Users can export their saved scholarship data and manage
            notification preferences. A logout button and a account deletion confirmation modal are also included.
            The page uses a sectional card design with clear icons and consistent spacing for a modern, professional
            feel.
          </p>
          <ScreenshotPlaceholder label="Screenshot — Settings page" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">3.9 Admin Dashboard</h3>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The Admin Dashboard is restricted to authorised admin users and provides full CRUD operations for
            scholarship records. It features a searchable, paginated table displaying existing scholarships with
            status indicators and quick-action buttons. A modal form allows admins to add or edit scholarship
            metadata including name, amount, category, source, eligibility, deadline, branch, gender eligibility,
            and application URL. Access control is enforced through an admin email whitelist and role-based checks.
          </p>
          <ScreenshotPlaceholder label="Screenshot — Admin Dashboard" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">3.10 Database Schema</h3>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The platform uses the Base44 entity system for data persistence. The primary entity is the Scholarship,
            which stores all scholarship details. The User entity stores authentication and profile data including
            saved scholarship IDs. Built-in attributes on every record include id, created_date, updated_date, and
            created_by_id.
          </p>
          <div className="my-6 bg-secondary rounded-xl p-6 font-mono text-xs text-foreground overflow-x-auto">
            <p className="font-semibold text-navy mb-3">Scholarship Entity Schema:</p>
            <pre className="whitespace-pre-wrap">{`{
  "name": "string (required)",
  "institutedBy": "string",
  "inMemoryOf": "string",
  "amount": "string (required)",
  "beneficiaries": "string",
  "beneficiaryCount": "number",
  "eligibility": "string",
  "branch": "CSE | ECE | EEE | ME | CE | Any",
  "genderEligibility": "Girls Only | Boys Only | Any",
  "yearEligibility": "string",
  "category": "alumni | other | government | private (required)",
  "source": "JNTUA CEA | Buddy4Study | NSP | Other",
  "applyUrl": "string",
  "deadline": "string",
  "tags": "string[]"
}`}</pre>
          </div>
          <ScreenshotPlaceholder label="Figure 3.10 — Database entity diagram" />
        </section>

        {/* ===== CHAPTER 4: IMPLEMENTATION ===== */}
        <section className="page-break-before">
          <ChapterTitle number={4} title="Implementation" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">4.1 Implementation</h3>

          <p className="font-semibold text-sm text-foreground mt-6">1. Frontend Layer</p>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-2">
            The frontend delivers an intuitive and responsive interface for students to discover, filter, and save
            scholarships. It is implemented using React with Tailwind CSS for styling and Vite as the build tool.
          </p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Core Frontend Pages:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Landing.jsx — Public landing page with platform overview and feature highlights</li>
              <li>Login.jsx / Register.jsx — Secure authentication with OTP and Google OAuth</li>
              <li>Dashboard.jsx — Personalised hub with saved scholarship overview and Explore embed</li>
              <li>Explore.jsx — Multi-source scholarship browsing with tabs, search, and filters</li>
              <li>JntuaCea.jsx — JNTUA CEA endowment scholarships with multi-dimensional filtering</li>
              <li>Saved.jsx — Saved scholarships with calendar sync and management tools</li>
              <li>Profile.jsx — User profile with editable academic details and eligibility tags</li>
              <li>Settings.jsx — Account settings, theme toggle, and data privacy</li>
              <li>Admin.jsx — Admin dashboard with CRUD operations for scholarship records</li>
            </ul>
          </div>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Frontend Features:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Responsive Design — Mobile-first approach ensuring compatibility across all devices</li>
              <li>Real-time Filtering — Instant search and filter updates without page reloads</li>
              <li>Calendar Sync — Google Calendar URL generation and .ics file download for deadlines</li>
              <li>Session Management — Automatic authentication checks and protected routes</li>
              <li>Interactive UI — Smooth transitions, hover effects, and loading states</li>
            </ul>
          </div>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-3">
            The frontend communicates with the backend through the Base44 SDK, enabling dynamic content rendering
            and real-time user interactions.
          </p>

          <p className="font-semibold text-sm text-foreground mt-6">2. Backend Layer</p>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-2">
            The backend is powered by Base44, a backend-as-a-service platform that provides authentication,
            database management, and integrations.
          </p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Core Backend Functionalities:</p>
            <p className="font-medium text-navy mt-2">Authentication &amp; Security:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Secure user registration with email/password and Google OAuth</li>
              <li>OTP-based email verification for new accounts</li>
              <li>Password reset flow with token-based authentication</li>
              <li>Protected routes with automatic session handling</li>
              <li>Role-based access control for admin features</li>
            </ul>
            <p className="font-medium text-navy mt-2">Scholarship Management:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>CRUD operations for scholarship records via Base44 entity SDK</li>
              <li>Real-time data subscriptions for live updates</li>
              <li>Admin-only create, update, and delete operations</li>
              <li>Category, branch, and source-based filtering at the database level</li>
            </ul>
            <p className="font-medium text-navy mt-2">User Profile &amp; Saved Scholarships:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Persistent user profile with academic details</li>
              <li>Saved scholarship IDs stored on the user entity</li>
              <li>Real-time sync of saved lists across devices</li>
              <li>Profile-based eligibility indicators</li>
            </ul>
          </div>

          <p className="font-semibold text-sm text-foreground mt-6">3. Database Layer</p>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-2">
            Data persistence and integrity are managed using the Base44 entity system, which provides a JSON-schema-
            based data model with built-in attributes (id, created_date, updated_date, created_by_id).
          </p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Database Entities:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Scholarship — Stores all scholarship details (name, amount, eligibility, source, deadline, etc.)</li>
              <li>User — Stores authentication data, profile info, and saved scholarship IDs</li>
            </ul>
            <p className="font-medium text-foreground mt-2">Database Features:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Schema Validation — JSON-schema-based field validation</li>
              <li>Built-in Audit Fields — Automatic created_date, updated_date, created_by_id</li>
              <li>Real-time Subscriptions — Live event-driven updates for entity changes</li>
              <li>SDK Access — Full CRUD via base44.entities.&lt;Entity&gt;.&lt;Operation&gt;</li>
            </ul>
          </div>

          <p className="font-semibold text-sm text-foreground mt-6">4. Integration Features</p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>InvokeLLM — AI-powered features for scholarship recommendations and data enrichment</li>
              <li>Calendar Sync — Google Calendar URL generation and .ics file download with one-day reminders</li>
              <li>SendEmail — Email notifications for registered users</li>
              <li>UploadFile — File upload for scholarship-related documents</li>
            </ul>
          </div>

          <p className="font-semibold text-sm text-foreground mt-6">5. Architecture Benefits</p>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-navy">Modularity:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Clear separation between pages, components, and utility modules</li>
              <li>Reusable shadcn/ui and custom components</li>
              <li>Scalable codebase with maintainable structure</li>
            </ul>
            <p className="font-medium text-navy mt-2">Security:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Multiple layers of authentication and authorisation</li>
              <li>Protected routes with session management</li>
              <li>Role-based admin access control</li>
            </ul>
            <p className="font-medium text-navy mt-2">Performance:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Optimised Vite build with code splitting</li>
              <li>Efficient data fetching with React Query</li>
              <li>Responsive frontend with minimal loading times</li>
            </ul>
          </div>

          <h3 className="font-heading text-lg font-bold text-navy mt-8">4.2 Project Files</h3>

          <p className="font-semibold text-sm text-foreground mt-4">Landing.jsx:</p>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
            The Landing page acts as the primary entry point for visitors. It features a hero section with the
            platform name and value proposition, key statistics, and a call-to-action button for registration. The
            features section highlights scholarship discovery, deadline tracking, and personalised recommendations.
            An informational section showcases the JNTUA CEA portal, and the footer provides branding and copyright.
            The design uses a navy-and-gold theme with Playfair Display typography for a professional academic look.
          </p>

          <p className="font-semibold text-sm text-foreground mt-4">Login.jsx &amp; Register.jsx:</p>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
            The Login page provides secure authentication with email and password fields, password visibility
            toggling, Google OAuth, and links to forgot-password and registration. The Register page enables new
            users to sign up with email and password, followed by a multi-step OTP verification flow. After
            verification, users complete their profile with academic details (college, branch, year, gender). Both
            pages use a split-screen layout with a decorative branding panel.
          </p>

          <p className="font-semibold text-sm text-foreground mt-4">Dashboard.jsx:</p>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
            The Dashboard serves as the main hub for authenticated users, displaying a personalised greeting,
            profile details, and quick-access shortcuts. It embeds the Explore component for browsing scholarships
            directly. The AppLayout wraps the dashboard with a responsive sidebar for navigation, a mobile topbar
            with a drawer toggle, and real-time authentication checks.
          </p>

          <p className="font-semibold text-sm text-foreground mt-4">Explore.jsx:</p>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
            The Explore page is the core scholarship browsing interface with tabbed navigation for Buddy4Study,
            NSP, RDT, and custom scholarships. It features a search bar, gender filters, and a JSON export button.
            Each scholarship card displays source and category badges, amount, eligibility, tags, deadline, and an
            apply button. Users can save scholarships with a bookmark toggle, with a login prompt for
            unauthenticated users.
          </p>

          <p className="font-semibold text-sm text-foreground mt-4">JntuaCea.jsx:</p>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
            The JNTUA CEA page is dedicated to endowment scholarships from JNTUA College of Engineering Anantapur.
            It merges static endowment data with dynamic database entries and provides filtering by branch, gender,
            and year. A summary dashboard shows total and filtered counts. Clicking a scholarship opens the
            ScholarshipDetailModal with full endowment information.
          </p>

          <p className="font-semibold text-sm text-foreground mt-4">Saved.jsx:</p>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
            The Saved Scholarships page displays all bookmarked scholarships with status badges and management
            tools. Each item includes apply, details, calendar sync, and remove buttons. A &ldquo;Sync All
            Deadlines&rdquo; button downloads a single .ics file with all saved deadlines and one-day reminders.
          </p>

          <p className="font-semibold text-sm text-foreground mt-4">Admin.jsx:</p>
          <p className="text-justify text-sm leading-relaxed text-muted-foreground mt-1">
            The Admin Dashboard provides full CRUD operations for scholarship records, restricted to authorised
            admin emails. It features a searchable, paginated table and a modal form for adding or editing
            scholarship metadata. Access control is enforced through an admin email whitelist and role-based checks.
          </p>
        </section>

        {/* ===== CHAPTER 5: WEEKLY REPORT ===== */}
        <section className="page-break-before">
          <ChapterTitle number={5} title="Weekly Report" />

          <div className="text-center mb-8">
            <p className="text-sm font-medium text-foreground">
              Jawaharlal Nehru Technological University Anantapur
            </p>
            <p className="text-xs text-muted-foreground">
              (Established under A.P. Govt. Act No.30 of 2008), Ananthapuramu - 515002, Andhra Pradesh, India
            </p>
            <p className="text-sm font-medium text-navy mt-2">COMMUNITY SERVICE PROJECT</p>
            <p className="text-sm text-muted-foreground mt-1">Name of the Mentor: Prof. R. Rajasekhar</p>
          </div>

          {weeklyReports.map((wr) => (
            <div key={wr.week} className="page-break-before mb-8">
              <p className="text-center text-sm font-semibold text-navy uppercase tracking-wide">
                Activity Log for the {wr.title} Week
              </p>
              <div className="mt-6 space-y-3">
                {wr.activities.map((activity, i) => (
                  <div key={i} className="flex gap-3 text-sm text-foreground">
                    <span className="font-bold text-gold shrink-0">{i + 1}.</span>
                    <p className="text-justify leading-relaxed">{activity}</p>
                  </div>
                ))}
              </div>
              <SignatureLine />
            </div>
          ))}

          <div className="mt-8 page-break-before">
            <h3 className="font-heading text-lg font-bold text-navy text-center">Summary of Progress</h3>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-3" />
            <div className="text-justify text-sm leading-relaxed text-foreground space-y-4 mt-6">
              <p>
                The ScholarGuide project successfully addressed the challenge of scholarship discovery and deadline
                management for students. Over eight weeks, the team developed a comprehensive platform that
                aggregates scholarships from JNTUA CEA endowments, Buddy4Study, the National Scholarship Portal, and
                RDT into a single, searchable interface.
              </p>
              <p>
                Major accomplishments include the multi-source Explore page with advanced filtering, the JNTUA CEA
                endowment portal, the calendar sync feature for deadline tracking, the admin dashboard for
                scholarship management, and a complete authentication system with OTP verification and Google OAuth.
                The team gained hands-on experience in React development, Tailwind CSS styling, and backend-as-a-
                service architecture using Base44.
              </p>
              <p>
                The platform&rsquo;s modular architecture opens doors for future expansion, including AI-powered
                recommendations, mobile app deployment, and additional scholarship sources. The project demonstrated
                that centralising scholarship information and providing deadline management tools can significantly
                improve students&rsquo; access to financial aid opportunities.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-heading text-lg font-bold text-navy text-center">Team Reflections</h3>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-3" />
            <div className="text-justify text-sm leading-relaxed text-foreground space-y-4 mt-6">
              <p>
                The SCHOLARGUIDE project has proven to be a real-world solution for a common challenge among
                students — discovering and tracking scholarship opportunities. Through collaboration, technical
                expertise, and regular communication, the team developed a reliable and efficient platform. The
                project offered a valuable opportunity to gain hands-on experience in modern web development,
                encompassing everything from frontend design to backend integration and deployment.
              </p>
              <p>
                Our success was driven by consistent progress reviews, task delegation, and adherence to current
                development standards. The platform&rsquo;s multi-source aggregation model promotes equal access to
                scholarship opportunities, making it a student-centric solution. The scalable architecture opens
                doors for expansion to more institutions and new features in the future.
              </p>
            </div>
          </div>
        </section>

        {/* ===== CHAPTER 6: FUTURE WORK & CONCLUSION ===== */}
        <section className="page-break-before">
          <ChapterTitle number={6} title="Future Work & Conclusion" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">Future Work</h3>
          <div className="text-justify text-sm leading-relaxed text-foreground space-y-4 mt-3">
            <p>
              In the future, we plan to enhance the ScholarGuide platform by deploying it on a live hosting
              environment to make it accessible to a wider student community. The platform is currently built on
              the Base44 backend-as-a-service, which provides hosting, authentication, and database management. We
              aim to configure a custom domain and optimise the deployment for production use across educational
              institutions.
            </p>
            <p>
              Additionally, we aim to extend the platform&rsquo;s intelligence features. Currently, the platform
              provides manual filtering based on branch, gender, and year. Future versions will include AI-powered
              scholarship recommendations that analyse the user&rsquo;s profile and suggest the most relevant
              opportunities automatically. This personalised approach will save students time and increase their
              chances of finding suitable scholarships.
            </p>
            <p>Beyond deployment and AI recommendations, further improvements may include:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Developing a native mobile app (iOS and Android) for on-the-go scholarship browsing and push notification reminders for approaching deadlines.</li>
              <li>Implementing analytics dashboards to monitor scholarship engagement and application success rates.</li>
              <li>Expanding the platform to support institutional-level authentication and verified student networks for trusted access.</li>
              <li>Adding multi-language support to make the platform accessible to students from diverse linguistic backgrounds.</li>
              <li>Integrating direct application submission features for scholarships that support online application portals.</li>
            </ul>
            <p>
              These enhancements will make ScholarGuide more intelligent, interactive, and scalable, further
              supporting its goal of creating an accessible and student-friendly scholarship discovery ecosystem.
            </p>
          </div>

          <h3 className="font-heading text-lg font-bold text-navy mt-8">Conclusion</h3>
          <div className="text-justify text-sm leading-relaxed text-foreground space-y-4 mt-3">
            <p>
              The SCHOLARGUIDE platform effectively addresses the often-overlooked problem of scholarship awareness
              and deadline management by enabling a centralised and student-driven scholarship discovery system. By
              utilising modern web technologies such as React and Tailwind CSS for the front-end, and the Base44
              backend-as-a-service platform for authentication, database management, and integrations, the platform
              offers a smooth, intuitive, and efficient user experience.
            </p>
            <p>
              With key features like multi-source scholarship aggregation, personalised filtering by branch, gender,
              and year, saved scholarship management, and calendar sync for deadline tracking, SCHOLARGUIDE empowers
              students to take control of their scholarship search while ensuring no opportunity is missed. The
              admin dashboard enables efficient management of scholarship records, while the profile system provides
              personalised eligibility indicators.
            </p>
            <p>
              This project not only increases scholarship awareness but also supports the idea of equal opportunity
              in education. By centralising scholarship information and providing deadline management tools,
              SCHOLARGUIDE contributes to a more informed, organised, and empowered student community. The platform
              stands as a scalable and practical solution that can be implemented across educational institutions
              seeking to promote accessibility and student welfare through digital innovation.
            </p>
          </div>
        </section>

        {/* ===== APPENDIX ===== */}
        <section className="page-break-before">
          <h2 className="font-heading text-2xl font-bold text-navy text-center uppercase">Appendix</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-4" />

          <h3 className="font-heading text-lg font-bold text-navy mt-8">Tools and Technologies Used</h3>

          <p className="font-semibold text-sm text-foreground mt-4">Development Tools:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-muted-foreground mt-2">
            <li>Visual Studio Code (IDE with React and Tailwind extensions)</li>
            <li>GitHub (Version control and collaboration)</li>
            <li>Base44 Console (Backend management and entity configuration)</li>
            <li>Vite (Build tool and development server)</li>
          </ul>

          <p className="font-semibold text-sm text-foreground mt-4">Frontend Technologies:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-muted-foreground mt-2">
            <li>React 18 (Component-based UI library)</li>
            <li>Tailwind CSS (Utility-first styling framework)</li>
            <li>JavaScript ES6+ (Dynamic interactivity and logic)</li>
            <li>shadcn/ui (Accessible UI component library)</li>
            <li>lucide-react (Icon library)</li>
          </ul>

          <p className="font-semibold text-sm text-foreground mt-4">Backend Technologies:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-muted-foreground mt-2">
            <li>Base44 BaaS (Authentication, database, integrations, hosting)</li>
            <li>Base44 Entity System (JSON-schema-based data model)</li>
            <li>Base44 Auth SDK (Email/password, Google OAuth, OTP verification)</li>
          </ul>

          <p className="font-semibold text-sm text-foreground mt-4">Integration Services:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-muted-foreground mt-2">
            <li>InvokeLLM (AI-powered scholarship recommendations)</li>
            <li>Calendar Sync (Google Calendar URL + .ics file generation)</li>
            <li>SendEmail (Email notifications for registered users)</li>
            <li>UploadFile (File upload for documents)</li>
          </ul>

          <p className="font-semibold text-sm text-foreground mt-4">Additional Tools:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-muted-foreground mt-2">
            <li>React Router DOM (Client-side routing)</li>
            <li>TanStack React Query (Data fetching and cache management)</li>
            <li>Chrome DevTools (Debugging and performance)</li>
            <li>Git (Version control)</li>
          </ul>

          <h3 className="font-heading text-lg font-bold text-navy mt-8">Team Members</h3>
          <div className="mt-4 space-y-1 text-sm text-foreground">
            <p>K. Mothish Raghavendra (24005A0512)</p>
            <p>S. Sahil Khan (23001A0559)</p>
            <p>S. Hari Krishna (24005A0502)</p>
          </div>

          <h3 className="font-heading text-lg font-bold text-navy mt-8">Faculty Supervisor</h3>
          <div className="mt-4 text-sm text-foreground">
            <p className="font-medium">Dr. R Rajasekhar M. Tech., Ph.D.,</p>
            <p>Professor,</p>
            <p>Department of CSE,</p>
            <p>JNTUA College of Engineering,</p>
            <p>Ananthapuramu – 515002</p>
          </div>
        </section>

        {/* ===== REFERENCES ===== */}
        <section className="page-break-before">
          <h2 className="font-heading text-2xl font-bold text-navy text-center uppercase">References</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mt-4" />

          <p className="font-semibold text-sm text-foreground mt-8">Platform Documentation:</p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-sm text-muted-foreground mt-2">
            <li>Base44 Documentation — https://docs.base44.com</li>
            <li>React Documentation — https://react.dev</li>
            <li>Tailwind CSS Documentation — https://tailwindcss.com/docs</li>
            <li>Vite Documentation — https://vitejs.dev</li>
            <li>shadcn/ui Components — https://ui.shadcn.com</li>
          </ul>

          <p className="font-semibold text-sm text-foreground mt-6">Scholarship Sources:</p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-sm text-muted-foreground mt-2">
            <li>Buddy4Study — https://www.buddy4study.com/scholarships</li>
            <li>National Scholarship Portal (NSP) — https://scholarships.gov.in</li>
            <li>RDT (Rural Development Trust) — https://www.rdtfvf.org</li>
            <li>JNTUA CEA Endowment Scholarships — https://jntua.ac.in</li>
          </ul>

          <p className="font-semibold text-sm text-foreground mt-6">AI Tools:</p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-sm text-muted-foreground mt-2">
            <li>Base44 AI Agent — https://app.base44.com</li>
            <li>Diagrams.net (draw.io) — https://app.diagrams.net</li>
          </ul>

          <p className="font-semibold text-sm text-foreground mt-6">Curriculum:</p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-sm text-muted-foreground mt-2">
            <li>JNTUA B.Tech CSE Syllabus — https://dap.jntua.ac.in</li>
          </ul>
        </section>

        {/* End spacer */}
        <div className="h-20" />
      </div>
    </div>
  );
}