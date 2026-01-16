import { X } from "lucide-react";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin, FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";

export const socials = [
  {
    icon: (
      <RiInstagramFill className="w-7 h-7 text-gray-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:via-red-500 hover:to-purple-600 transition-all duration-300" />
    ),
    href: "https://instagram.com",
    bg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
  },
  {
    icon: (
      <FaLinkedin className="w-7 h-7 text-gray-600 hover:text-[#0A66C2] transition" />
    ),
    href: "https://linkedin.com",
    bg: "bg-[#0A66C2]", // LinkedIn official
  },
  {
    icon: (
      <FaFacebookSquare className="w-7 h-7 text-gray-600 hover:text-[#1877F2] transition" />
    ),
    href: "https://facebook.com",
    bg: "bg-[#1877F2]", // Facebook official
  },
  {
    icon: (
      <FaTwitter className="w-7 h-7 text-gray-600 hover:text-[#1DA1F2] transition" />
    ),
    href: "https://x.com",
    bg: "bg-[#1DA1F2]", // Twitter (X) blue
  },
  {
    icon: (
      <TfiYoutube className="w-7 h-7 text-gray-600 hover:text-[#FF0000] transition" />
    ),
    href: "https://youtube.com",
    bg: "bg-[#FF0000]", // YouTube red
  },
];


export const footerLinks = [
  {
    title: "Explore Spreads",
    links: [
      { name: "Sign Up", href: "/signup" },
      { name: "Help Center", href: "/help" },
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Developers", href: "/developers" },
    ],
  },
  {
    title: "Opportunities",
    links: [
      { name: "Jobs", href: "/jobs" },
      { name: "Microblog Circles", href: "/microblogs" },
      { name: "Salaries", href: "/salaries" },
      { name: "Top Roles", href: "/top-roles" },
      { name: "Remote Work", href: "/remote" },
      { name: "Global Talent Feed", href: "/global-talent" },
    ],
  },
  {
    title: "Opportunities",
    links: [
      { name: "Jobs", href: "/jobs" },
      { name: "Microblog Circles", href: "/microblogs" },
      { name: "Salaries", href: "/salaries" },
      { name: "Top Roles", href: "/top-roles" },
      { name: "Remote Work", href: "/remote" },
      { name: "Global Talent Feed", href: "/global-talent" },
    ],
  },
  {
    title: "For Organizations",
    links: [
      { name: "Talent Solutions", href: "/org/talent" },
      { name: "Hiring Dashboard", href: "/org/dashboard" },
      { name: "Employer Branding", href: "/org/branding" },
      { name: "Community Hiring", href: "/org/hiring" },
    ],
  },
  {
    title: "Directories",
    links: [
      { name: "Members", href: "/directory/members" },
      { name: "Jobs", href: "/directory/jobs" },
      { name: "Startups", href: "/directory/startups" },
      { name: "Universities", href: "/directory/universities" },
      { name: "Articles", href: "/directory/articles" },
      { name: "Circles", href: "/directory/circles" },
      { name: "Creators", href: "/directory/creators" },
      { name: "Fellowships", href: "/directory/fellowships" },
    ],
  },
];


export const footerPolicies = [
  { name: "About", href: "/about" },
  { name: "Accessibility", href: "/accessibility" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Brand Policy", href: "/brand" },
  { name: "Guest Controls", href: "/guest-controls" },
  { name: "Community Guidelines", href: "/community-guidelines" },
];


export const FIELD_LIMITS = {
  name: 25,
  headline: 150,
  location: 30,
  youmaynowabout:50,
  email: 30,
  joined: 15,
  company: 25,
};



export const companies = [
  {
    id: "c1",
    name: "Google",
    logo: "/google.svg",
    field: "Software Development",
    location: "Mountain View, CA",
    followers: ["user123", "user456"],
    following: ["company999"],
    employees: ["u12346", "u12347"],
    topRank: true,
    tags: ["AI", "Cloud", "Frontend", "Search", "MERN"],
    about: "Leading global tech company focused on AI, cloud, and web innovation."
  },
  {
    id: "c2",
    name: "Tata Consultancy Services",
    logo: "/tcs.png",
    field: "IT Services & Consulting",
    location: "Mumbai, India",
    followers: ["user123", "user456", "u12348"],
    following: [],
    employees: ["u12345"],
    topRank: false,
    tags: ["Software", "Consulting", "Cloud", "AI"],
    about: "Global IT services, consulting, and business solutions company."
  },
  {
    id: "c3",
    name: "Microsoft",
    logo: "/microsoft.svg",
    field: "Software & Cloud Services",
    location: "Seattle, USA",
    followers: ["u12346", "u12347"],
    employees: ["u12345", "u12348"],
    tags: ["Azure", "AI", "Frontend", "Backend", "Office365"],
    about: "Empowering every person and organization to achieve more."
  },
  {
    id: "c4",
    name: "Amazon Web Services",
    logo: "/aws.svg",
    field: "Cloud Infrastructure & AI",
    location: "Bangalore, India",
    followers: ["u12345", "u12346"],
    employees: ["u12348"],
    tags: ["Cloud", "AI", "DevOps", "Serverless", "MERN"],
    about: "World leader in scalable cloud computing and AI infrastructure."
  },
  {
    id: "c5",
    name: "OpenAI",
    logo: "/openai.svg",
    field: "Artificial Intelligence Research",
    location: "San Francisco, USA",
    followers: ["u12345"],
    employees: ["u12346"],
    tags: ["AI", "LLM", "LangChain", "Machine Learning"],
    about: "Pioneering artificial general intelligence and open collaboration."
  },
  {
    id: "c6",
    name: "Infosys",
    logo: "/infosys.svg",
    field: "IT & Business Consulting",
    location: "Pune, India",
    followers: ["u12346"],
    employees: ["u12348"],
    tags: ["Consulting", "Cloud", "AI", "Automation"],
    about: "Enabling global enterprises to navigate their digital transformation."
  },
  {
    id: "c7",
    name: "Netflix",
    logo: "/netflix.svg",
    field: "Media & Entertainment Tech",
    location: "Los Angeles, USA",
    followers: ["u12347"],
    employees: ["u12348"],
    tags: ["Streaming", "Frontend", "AI", "Microservices"],
    about: "Leading streaming entertainment service with global scale."
  },
  {
    id: "c8",
    name: "Accenture",
    logo: "/accenture.svg",
    field: "Consulting & Digital Transformation",
    location: "Hyderabad, India",
    followers: ["u12346", "u12345"],
    employees: ["u12347"],
    tags: ["Cloud", "AI", "Consulting", "Digital"],
    about: "Helping companies become high-performance businesses through innovation."
  },
];



// utils/dummyUsers.js
export const users = [
  {
    id: "u12345",
    username: "rupendra",
    name: "Rupendra Vishwakarma",
    headline:
      "Enthusiast Full Stack Developer | AI + Frontend Enthusiast",
    location: "India",
    email: "rupendravishwarkam@gmail.com",
    phone: ["9876543210"],
    joined: "21 June 2025",
    about:
      "Passionate about building AI-powered frontend experiences. MERN + Next.js + LangChain.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    cover:
      "https://images.unsplash.com/photo-1503264116251-35a269479413",
    socialLinks: {
      linkedin: "https://linkedin.com/in/rupendra",
      github: "https://github.com/rupendra",
      twitter: "https://twitter.com/rupendra",
      website: "https://rupendra.dev",
    },

    // keep both counts and id lists
    followersCount: 0,
    followingCount: 0,
    followers: [], // actual ids
    following: [], // actual ids

    collabsCount: 0,
    connections: [],
    certifications:[],
    educations: [
      
    ],
    // saved items - modular by type
    saved: {
  posts: [],
  courses: [],
  mentors: [],
  collabs: [],
  jobs: [],
  articles: [],
  services: []
    },
    activities: [],
    
    experiences: [  

      {
        id:1,
        name:"compnay"
      }
    ],
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "LangChain",
      "OpenAI API",
      "MERN",
      "System Design",
    ],
    projects: [

    ],
    posts: [
      {
        id: "post1",
        type: "poll",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "1h" },
        content:
          "When designing frontend systems at scale, which approach do you prefer for state management?",
        poll: {
          question: "Best State Management?",
          options: ["Redux", "Zustand", "React Query", "MobX"],
          votes: [5, 2, 4, 3],
          timeLeft: "12h left",
        },
        tags: ["React", "State", "SystemDesign"],
        likes: 75,
        liked: true,
        saved: false,
        reposts: 6,
        comments: [],
        pollVoted: false,
        pollSelection: null,
        activity: "Posts",
      },
      {
        id: "post2",
        type: "text",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "2h" },
        content: "Exploring Zustand vs Redux Toolkit for large-scale projects.",
        tags: ["React", "State"],
        likes: 90,
        liked: false,
        saved: false,
        reposts: 4,
        comments: [],
        activity: "Posts",
      },
      {
        id: "post3",
        type: "image",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "3h" },
        content: "New architecture diagram for microfrontend setup 🚀",
        // image: "/AboutDumImg.jpeg",
        image: ["/AboutDumImg.jpeg", "/AboutDumImg.jpeg","/AboutDumImg.jpeg"],

        tags: ["Microfrontend", "Architecture"],
        likes: 40,
        liked: false,
        saved: true,
        reposts: 8,
        comments: [],
        activity: "Posts",
      },
      {
        id: "post4",
        type: "image",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "3h" },
        content: "Sneak peek of my AI + frontend dashboard redesign 🚀",
        image: "/AboutDumImg.jpeg",
        tags: ["AI", "UI/UX", "Frontend"],
        likes: 180,
        liked: false,
        saved: true,
        reposts: 12,
        comments: [],
        activity: "Repost",
      },
      {
        id: "post5",
        type: "text",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "5h" },
        content:
          "Just wrapped up a GenAI + React POC where AI suggests code fixes in real-time 🔥.",
        tags: ["AI", "React", "DevTools"],
        likes: 300,
        liked: false,
        saved: false,
        reposts: 20,
        comments: [
          {
            id: "c3",
            user: { name: "Jay Vishwakarma", username: "jay", avatar: "" },
            content: "That sounds game-changing 👏",
          },
        ],
        activity: "Comments",
      },
      {
        id: "post6",
        type: "text",
        user: { name: "Priya Sharma", username: "priya", avatar: "", time: "6h" },
        content: "Excited to share my new blog on MLOps best practices 🚀",
        tags: ["MLOps", "AWS", "BestPractices"],
        likes: 220,
        liked: true,
        saved: false,
        reposts: 15,
        comments: [],
        activity: "Likes",
      },
      {
        id: "post7",
        type: "text",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "7h" },
        content: "Another liked post for testing View All button.",
        tags: ["Testing", "Likes"],
        likes: 30,
        liked: true,
        saved: false,
        reposts: 2,
        comments: [],
        activity: "Likes",
      },
    ],
  },
  {
    id: "u12346",
    username: "aman2",
    name: "Amana Vishwakarma",
    headline: "Full Stack Developer | AI + Frontend Enthusiast",
    location: "India",
    email: "amana.vishwakarma@gmail.com",
    phone: ["9876543211"],
    joined: "21 June 2025",
    about:
      "Passionate about building AI-powered frontend experiences. MERN + Next.js + LangChain.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    cover:
      "https://images.unsplash.com/photo-1503264116251-35a269479413",

    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: [],
    collabsCount: 0,
    connections: [],
  saved: {
  posts: [],
  courses: [],
  mentors: [],
  collabs: [],
  jobs: [],
  articles: [],
  services: []
    },
    activities: [],
    experience: [],
    education: [],
    certifications:[],
    skills: ["React", "Next.js", "MERN", "AI"],
    projects: [],
    posts: [
      {
        id: "post1",
        type: "poll",
        user: { name: "Amana Vishwakarma", username: "amana", avatar: "", time: "1h" },
        content: "Which frontend framework do you prefer in 2025?",
        poll: {
          question: "Frontend Choice?",
          options: ["React", "Next.js", "Vue", "Svelte"],
          votes: [120, 80, 40, 10],
          timeLeft: "10h left",
        },
        tags: ["Frontend", "React", "Next.js"],
        likes: 50,
        liked: false,
        saved: false,
        reposts: 3,
        comments: [],
        pollVoted: false,
        pollSelection: null,
        activity: "Posts",
      },
      {
        id: "post2",
        type: "text",
        user: { name: "Amana Vishwakarma", username: "amana", avatar: "", time: "2h" },
        content: "Exploring SvelteKit for modern web apps.",
        tags: ["SvelteKit", "Frontend"],
        likes: 30,
        liked: false,
        saved: false,
        reposts: 1,
        comments: [],
        activity: "Posts",
      },
    ],

  },
    {
    id: "u12347",
    username: "javed23",
    name: "Javed Akhtar",
    headline: "Full Stack Developer | AI + Frontend Enthusiast",
    location: "India",
    email: "javed.akhtar@gmail.com",
    phone: ["9876543212"],
    joined: "21 June 2025",
    about: "",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    cover:
      "https://images.unsplash.com/photo-1503264116251-35a269479413",

    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: [],
  saved: {
  posts: [],
  courses: [],
  mentors: [],
  collabs: [],
  jobs: [],
  articles: [],
  services: []
    },
    activities: [],
    collabsCount: 0,
    connections: [],

    experience: [],
    education: [],
    certifications:[],
    skills: ["React", "Node.js", "Next.js", "AI"],
    projects: [],
    posts: [
      {
        id: "post1",
        type: "poll",
        user: { name: "Javed Akhtar", username: "javed", avatar: "", time: "1h" },
        content: "Which backend framework do you prefer for production apps?",
        poll: {
          question: "Backend Choice?",
          options: ["Express", "NestJS", "Fastify", "Koa"],
          votes: [70, 50, 30, 20],
          timeLeft: "8h left",
        },
        tags: ["Backend", "Node.js", "API"],
        likes: 40,
        liked: false,
        saved: false,
        reposts: 2,
        comments: [],
        pollVoted: false,
        pollSelection: null,
        activity: "Posts",
      },
      {
        id: "post2",
        type: "text",
        user: { name: "Javed Akhtar", username: "javed", avatar: "", time: "2h" },
        content: "Trying out NestJS with GraphQL integration.",
        tags: ["NestJS", "GraphQL"],
        likes: 25,
        liked: false,
        saved: false,
        reposts: 1,
        comments: [],
        activity: "Posts",
      },
    ],
    
  },
    {
    id: "u12348",
    username: "Shiva",
    name: "Shivanshu ",
    headline: "Python Full Stack Develoops ",
    location: "India",
    email: "javed.akhtar@gmail.com",
    phone: ["9876543212"],
    joined: "21 June 2025",
    about: "",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    cover:
      "https://images.unsplash.com/photo-1503264116251-35a269479413",

    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: [],
  saved: {
  posts: [],
  courses: [],
  mentors: [],
  collabs: [],
  jobs: [],
  articles: [],
  services: []
    },
    activities: [],
    collabsCount: 0,
    connections: [],

    experience: [],
    education: [],
     certifications:[],
    skills: ["React", "Node.js", "Next.js", "AI"],
    projects: [],
    posts: [
      {
        id: "post1",
        type: "poll",
        user: { name: "Javed Akhtar", username: "javed", avatar: "", time: "1h" },
        content: "Which backend framework do you prefer for production apps?",
        poll: {
          question: "Backend Choice?",
          options: ["Express", "NestJS", "Fastify", "Koa"],
          votes: [70, 50, 30, 20],
          timeLeft: "8h left",
        },
        tags: ["Backend", "Node.js", "API"],
        likes: 40,
        liked: false,
        saved: false,
        reposts: 2,
        comments: [],
        pollVoted: false,
        pollSelection: null,
        activity: "Posts",
      },
      {
        id: "post2",
        type: "text",
        user: { name: "Javed Akhtar", username: "javed", avatar: "", time: "2h" },
        content: "Trying out NestJS with GraphQL integration.",
        tags: ["NestJS", "GraphQL"],
        likes: 25,
        liked: false,
        saved: false,
        reposts: 1,
        comments: [],
        activity: "Posts",
      },
    ],
  },
    {
    id: "u12349",
    username: "anita_dev",
    name: "Anita Singh",
    headline: "Frontend Engineer | UI/UX Lover",
    location: "India",
    email: "anita.singh@gmail.com",
    phone: ["9876543213"],
    joined: "12 July 2025",
    about: "Frontend developer with passion for pixel-perfect UIs using React & Tailwind.",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    cover: "https://images.unsplash.com/photo-1503264116251-35a269479413",
    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: [],
    collabsCount: 0,
      saved: {
  posts: [],
  courses: [],
  mentors: [],
  collabs: [],
  jobs: [],
  articles: [],
  services: []
    },
    activities: [],
    connections: [],
    skills: ["React", "Tailwind", "Figma", "TypeScript"],
    projects: [],
    posts: [
      {
        id: "post1",
        type: "text",
        user: { name: "Anita Singh", username: "anita_dev", avatar: "", time: "4h" },
        content: "Just redesigned a dashboard using Framer Motion ✨",
        tags: ["UI/UX", "Frontend"],
        likes: 55,
        liked: false,
        saved: false,
        reposts: 2,
        comments: [],
        activity: "Posts",
      },
    ],
  },
  {
    id: "u12350",
    username: "rohit_backend",
    name: "Rohit Sharma",
    headline: "Backend Developer | Node.js + MongoDB",
    location: "India",
    email: "rohit.backend@gmail.com",
    phone: ["9876543214"],
    joined: "1 July 2025",
    about: "Designing scalable backend systems using Node.js, MongoDB, and microservices.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    cover: "https://images.unsplash.com/photo-1503264116251-35a269479413",
    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: [],
      saved: {
  posts: [],
  courses: [],
  mentors: [],
  collabs: [],
  jobs: [],
  articles: [],
  services: []
    },
    activities: [],
    collabsCount: 0,
    connections: [],
    skills: ["Node.js", "Express", "MongoDB", "Redis"],
    projects: [],
    posts: [],
  },
  {
    id: "u12351",
    username: "meena_ai",
    name: "Meena Patel",
    headline: "AI Engineer | ML + LangChain",
    location: "India",
    email: "meena.ai@gmail.com",
    phone: ["9876543215"],
    joined: "5 August 2025",
    about: "Working on AI-driven chatbots and GenAI-based products using Python & LangChain.",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    cover: "https://images.unsplash.com/photo-1503264116251-35a269479413",
    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: [],
    collabsCount: 0,
      saved: {
  posts: [],
  courses: [],
  mentors: [],
  collabs: [],
  jobs: [],
  articles: [],
  services: []
    },
    activities: [],
    connections: [],
    skills: ["Python", "LangChain", "AI", "NLP"],
    projects: [],
    posts: [],
  },
  {
    id: "u12352",
    username: "vivek_devops",
    name: "Vivek Kumar",
    headline: "DevOps Engineer | AWS + Docker + CI/CD",
    location: "India",
    email: "vivek.devops@gmail.com",
    phone: ["9876543216"],
    joined: "9 July 2025",
    about: "Automating pipelines and deployments using AWS, Docker, and GitHub Actions.",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    cover: "https://images.unsplash.com/photo-1503264116251-35a269479413",
    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: [],
    collabsCount: 0,
      saved: {
  posts: [],
  courses: [],
  mentors: [],
  collabs: [],
  jobs: [],
  articles: [],
  services: []
    },
    activities: [],
    connections: [],
    skills: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    projects: [],
    posts: [],
  },
  {
    id: "u12353",
    username: "nisha_ui",
    name: "Nisha Verma",
    headline: "UI Designer | Product Designer",
    location: "India",
    email: "nisha.ui@gmail.com",
    phone: ["9876543217"],
    joined: "2 August 2025",
    about: "Designing clean and intuitive product experiences with Figma & Framer.",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    cover: "https://images.unsplash.com/photo-1503264116251-35a269479413",
    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: [],
    collabsCount: 0,
      saved: {
  posts: [],
  courses: [],
  mentors: [],
  collabs: [],
  jobs: [],
  articles: [],
  services: []
    },
    activities: [],
    connections: [],
    skills: ["Figma", "Framer", "Design Systems", "UI/UX"],
    projects: [],
    posts: [],
  },

];

export const colleges = [
    {
      id: "clg1",
      name: "Awadhesh Pratap Singh University",
      avatar: "/college icon.svg",
      desc: "Higher Education",
      headline: "Where innovation meets excellence.",
      type: "college",
    },
    {
      id: "clg2",
      name: "IIT Delhi",
      avatar: "/college icon.svg",
      desc: "Top Technical Institute",
      headline: "Crafting world-class engineers.",
      type: "college",
    },
  ];

// constents/communityTypes.js
export const COMMUNITY_TYPES = {
  STUDY_GROUP: "study_group",
  PROJECT_TEAM: "project_team", 
  PLACEMENT_PREP: "placement_prep",
  SKILL_DEV: "skill_development",
  COLLEGE_SPECIFIC: "college_specific",
  INDUSTRY_SPECIFIC: "industry_specific"
};

export const COMMUNITY_VISIBILITY = {
  PUBLIC: "public",
  PRIVATE: "private", 
  COLLEGE_RESTRICTED: "college_restricted"
};


export const COMMUNITY_CATEGORIES = [
  {
    value: "study_group",
    label: "Study Group",
    description: "Subject-wise study groups",
    icon: "📚"
  },
  {
    value: "project_team",
    label: "Project Team", 
    description: "Collaborative project groups",
    icon: "👥"
  },
  {
    value: "placement_prep",
    label: "Placement Preparation",
    description: "Interview and placement preparation",
    icon: "💼"
  },
  {
    value: "skill_development",
    label: "Skill Development",
    description: "Learn and practice new skills",
    icon: "🚀"
  },
  {
    value: "college_specific",
    label: "College Specific",
    description: "For specific college students",
    icon: "🏫"
  },
  {
    value: "industry_specific",
    label: "Industry Specific", 
    description: "IT, Finance, Marketing, etc.",
    icon: "🏢"
  }
];

export const FIELD_LIMITS_Communti = {
  COMMUNITY_NAME: 50,
  COMMUNITY_DESCRIPTION: 500,
};

export const COMMUNITY_STATUS = {
  PENDING: "pending",
  ACTIVE: "active",
  INACTIVE: "inactive"
};