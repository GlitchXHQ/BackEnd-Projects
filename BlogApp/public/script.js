const projects = {
  studynotion: {
    title: "StudyNotion - Ed Tech Platform",
    description:
      "A complete e-learning solution with Razorpay integration, role-based authentication, and separate user/admin dashboards. The platform supports course creation, progress tracking, and secure payments.",
    link: "https://example.com/studynotion"
  },
  talentra: {
    title: "Talentra - AI Enabled Tech Platform",
    description:
      "An AI-powered productivity platform featuring intelligent quiz creation, industry insights, resume building support, and a smart chatbot to assist users in career growth and technical preparation.",
    link: "https://example.com/talentra"
  },
  "ai-chatbot": {
    title: "AI Chatbot",
    description:
      "A conversational chatbot built with modern NLP workflows to answer domain-specific queries, support context-aware responses, and improve user interaction through continuous prompt optimization.",
    link: "https://example.com/ai-chatbot"
  },
  "auth-system": {
    title: "Authentication System",
    description:
      "A secure authentication module with signup/login, hashed passwords, token-based authorization, protected routes, and role-access controls designed for scalable web apps.",
    link: "https://example.com/auth-system"
  },
  "employee-system": {
    title: "Employee Management System",
    description:
      "A full-stack management application for handling employee records, attendance and role workflows with clean dashboards and CRUD features for smooth organizational operations.",
    link: "https://example.com/employee-system"
  },
  "react-folder": {
    title: "React Project Folder",
    description:
      "A curated set of React mini-projects and reusable components covering hooks, state management, routing, API integration, and responsive UI patterns for rapid development.",
    link: "https://example.com/react-projects"
  },
  "backend-folder": {
    title: "Backend Project Folder",
    description:
      "A collection of backend service implementations using Node, Express, and MongoDB, including REST APIs, authentication workflows, file handling, and modular architecture patterns.",
    link: "https://example.com/backend-projects"
  }
};

const sidebar = document.getElementById("projectSidebar");
const overlay = document.getElementById("overlay");
const closeSidebarButton = document.getElementById("closeSidebar");
const sidebarTitle = document.getElementById("sidebarTitle");
const sidebarDescription = document.getElementById("sidebarDescription");
const sidebarLink = document.getElementById("sidebarLink");
const projectCards = document.querySelectorAll(".project-card");

function openSidebar(projectKey) {
  const project = projects[projectKey];
  if (!project) {
    return;
  }

  sidebarTitle.textContent = project.title;
  sidebarDescription.textContent = project.description;
  sidebarLink.href = project.link;
  sidebar.classList.add("open");
  overlay.classList.add("show");
  sidebar.setAttribute("aria-hidden", "false");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
  sidebar.setAttribute("aria-hidden", "true");
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const projectKey = card.dataset.project;
    openSidebar(projectKey);
  });
});

closeSidebarButton.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSidebar();
  }
});

const subscribeForm = document.getElementById("subscribeForm");
const subscribeMessage = document.getElementById("subscribeMessage");

subscribeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = document.getElementById("email");
  subscribeMessage.textContent = `Thanks for subscribing, ${emailInput.value}!`;
  emailInput.value = "";
});

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-content > *", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power2.out"
  });

  gsap.utils.toArray(".timeline-item, .skill-card, .project-card, .subscribe").forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 40,
      opacity: 0,
      duration: 0.75,
      ease: "power2.out"
    });
  });
}
