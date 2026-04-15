export const caseStudies = [
  // Software Solutions
  {
    slug: "synergy-hrm",
    title: "Synergy HRM",
    subtitle: "Intelligent HR & Project Management Solution",
    client: "Enterprise Client",
    category: "software",
    techStack: ["Laravel", "Bootstrap", "JavaScript"],
    problem:
      "The organization needed a centralized system to manage complex HR operations and project lifecycles across departments, reducing manual effort and improving coordination.",
    solution:
      "We built a fully integrated Human Resource and Project Management solution that centralizes core HR functions including attendance tracking, leave management, payroll processing, recruitment, and loan management. Synergy HRM also delivers end-to-end project lifecycle oversight, covering task assignment, progress tracking, and procurement monitoring. With dynamic dashboards, automated workflows, and real-time operational insights, the system enhances internal coordination, reduces manual effort, and supports faster, data-driven decision-making across the organization.",
  },
  {
    slug: "workpulse",
    title: "WorkPulse",
    subtitle: "Employee Activity & HRM Platform",
    client: "Enterprise Client",
    category: "software",
    techStack: ["Laravel", "MySQL", "Activity Monitoring SDK"],
    problem:
      "The organization lacked visibility into employee productivity and needed automated attendance tracking with comprehensive leave management integrated into a single platform.",
    solution:
      "Built a unified workforce management and HRM platform combining real-time computer activity monitoring with automated attendance tracking and comprehensive leave management. WorkPulse features automatic capture of application usage and visited URLs, manual time adjustments with approval workflows, and seamless ZKTeco device integration for remote and on-site check-ins. A dedicated employee self-service portal empowers staff to manage attendance and leave requests, while built-in productivity analytics provide hourly, daily, and monthly reports with CSV export support.",
  },
  {
    slug: "educore",
    title: "EduCore",
    subtitle: "Complete School Management System",
    client: "Educational Institution",
    category: "software",
    techStack: ["Laravel", "React.js", "MySQL", "Real-time Notification System"],
    problem:
      "The school needed to digitize and streamline academic and administrative operations spanning student records, attendance, exams, fees, library, transport, and parent communication.",
    solution:
      "Developed an end-to-end school management platform encompassing student enrollment and records management, attendance tracking, examination and grading systems, timetable scheduling, fee collection and accounting, library management, transport tracking, and parent-teacher communication portals. Advanced features include automated report card generation, student performance analytics, homework management, online class integration, event management, and secure multi-role access for administrators, teachers, students, and parents.",
  },
  {
    slug: "skybook",
    title: "SkyBook",
    subtitle: "Aviation Ticket Booking Platform",
    client: "IATA-accredited Travel Agency",
    category: "software",
    techStack: ["Laravel", "Third-Party API Integration", "Secure Payment Gateway Integration"],
    problem:
      "The travel agency needed a streamlined platform to handle flight search, reservation, and ticket issuance processes with real-time airline data and secure payment processing.",
    solution:
      "Developed a comprehensive aviation ticket booking platform integrating real-time airline ticket booking APIs for accurate availability, dynamic pricing, and seamless booking experiences for both agents and customers. The platform incorporates secure and reliable payment gateway integrations, enabling safe online transactions and faster booking confirmation. Built with scalability and performance in mind, SkyBook improves operational efficiency and reduces manual processing.",
  },
  {
    slug: "shopflex",
    title: "ShopFlex",
    subtitle: "Multi-Branch E-Commerce with POS",
    client: "Multi-branch Retail Business",
    category: "software",
    techStack: ["Laravel", "React.js"],
    problem:
      "The retail business needed a unified platform to manage both online and in-store sales across multiple branches with centralized control and performance reporting.",
    solution:
      "Developed a secure, SEO-friendly platform combining e-commerce and point-of-sale (POS) capabilities for multi-branch retail operations. The system enables centralized management of online and in-store sales with advanced sales and performance reporting, integrated payment and shipping modules, and role-based access control. Automated SMS and email notifications enhance order tracking, customer communication, and internal workflow efficiency.",
  },
  {
    slug: "garagepro",
    title: "GaragePro",
    subtitle: "Multi-Warehouse Garage POS",
    client: "Automotive Service Center",
    category: "software",
    techStack: ["Laravel", "MySQL", "Tailwind CSS"],
    problem:
      "The automotive service center needed an advanced POS system supporting barcode-based identification, receipt printing, and centralized stock management across multiple warehouse locations.",
    solution:
      "Engineered an advanced point-of-sale system tailored for automotive service centers and multi-warehouse garage operations. The platform supports barcode-based product identification, receipt printing, and efficient transaction processing. GaragePro includes multilingual support, real-time sales and inventory tracking, and centralized warehouse management with built-in reporting and analytics.",
  },
  {
    slug: "dentalcare-pro",
    title: "DentalCare Pro",
    subtitle: "Dental Clinic Management System",
    client: "Dental Clinic",
    category: "software",
    techStack: ["Laravel", "MySQL", "Tailwind CSS"],
    problem:
      "The dental clinic needed to simplify daily clinical and administrative operations including appointment scheduling, doctor availability management, and payment tracking.",
    solution:
      "Designed a specialized dental clinic management system streamlining patient appointment scheduling, doctor availability management, and payment tracking. DentalCare Pro features comprehensive patient record management, automated appointment reminders, and detailed operational reporting to enhance patient experience and minimize missed appointments.",
  },
  {
    slug: "suitesync",
    title: "SuiteSync",
    subtitle: "Hotel Operations Management System",
    client: "Hotel & Hospitality Business",
    category: "software",
    techStack: ["Laravel", "Bootstrap", "JavaScript"],
    problem:
      "The hotel needed to streamline and automate day-to-day hospitality workflows including room booking, guest management, and financial tracking.",
    solution:
      "Created a comprehensive hotel operations management system optimizing room booking management, guest profile handling, and automated invoicing. SuiteSync integrates SMS notifications for booking updates and reminders, secure payment gateway processing, and detailed financial tracking through account ledgers, providing complete operational visibility and efficient coordination.",
  },

  // IT Solutions
  {
    slug: "bof-adds",
    title: "Bangladesh Ordnance Factories (BOF)",
    subtitle: "Active Directory Domain Services Implementation",
    client: "Bangladesh Ordnance Factories",
    category: "it",
    techStack: ["Linux-based ADDS", "Group Policy Management"],
    problem:
      "Nearly 1,000 workstations lacked centralized management. Unrestricted software installations caused performance issues, security risks, and operational challenges.",
    solution:
      "We deployed a Linux-based Active Directory Domain Services (ADDS) solution to centralize management, prevent unauthorized software installations, block USB device usage, and ensure a secure environment.",
  },
  {
    slug: "afip-wifi",
    title: "Armed Forces Institute of Pathology (AFIP)",
    subtitle: "Enterprise Wi-Fi Network Deployment",
    client: "Armed Forces Institute of Pathology",
    category: "it",
    techStack: ["163 Indio Access Points", "Wireless LAN Controller", "Mesh Technology"],
    problem:
      "The organization required a reliable wireless network for a new site. Coverage limitations and signal issues demanded a solution with stable connectivity across all floors.",
    solution:
      "Deployed 163 Indio Access Points (APs) under a Wireless LAN Controller (WLC). Created multiple SSIDs for departmental needs, utilized Mesh technology, and designed a unified architecture for seamless, uninterrupted connectivity across all floors.",
  },
  {
    slug: "dtca-fiber",
    title: "Dhaka Transport Co-ordination Authority (DTCA)",
    subtitle: "Fiber Network & Core Configuration",
    client: "Dhaka Transport Co-ordination Authority",
    category: "it",
    techStack: ["Fiber Optic Network", "IP Planning", "Core Network Configuration"],
    problem:
      "The client required a robust and scalable fiber network with proper IP planning and optimized core configuration across multiple strategic locations to support critical operations.",
    solution:
      "We implemented a fiber network with comprehensive IP planning and core network configuration at key sites, including DMP Headquarters, FulBaria, Purana Paltan, Mohakhali, and Gulshan-1, in collaboration with our ISP partner, ensuring seamless connectivity and optimized performance.",
  },
  {
    slug: "bifcl-zimbra",
    title: "Bangladesh Industrial Finance Company Limited",
    subtitle: "Zimbra Mail Server Implementation",
    client: "Bangladesh Industrial Finance Company Limited",
    category: "it",
    techStack: ["Zimbra Mail Server", "Email Administration"],
    problem:
      "The existing Postfix email system was complex to manage and lacked a user-friendly interface, causing difficulties for the IT team. Additionally, the organization experienced a high volume of spam emails.",
    solution:
      "We installed and configured a Zimbra mail server for 200 users, simplifying server management with a user-friendly graphical interface. The transition to Zimbra significantly reduced spam mail, providing a more secure and reliable email environment.",
  },
];
