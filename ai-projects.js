// ai-projects.js

// 🧠 All AI projects data here
// Just edit this array when you add new projects.
const projects = [
  {
    name: "Project Nebula",
    description: "An AI model that generates deep-space inspired visuals and textures for research and creativity.",
    github: "https://github.com/entora/project-nebula",
    team: [
      { name: "Sudipta Roy", linkedin: "https://linkedin.com/in/your-link" },
      { name: "Member 2", linkedin: "#" }
    ]
  },
  {
    name: "Quantum Chat",
    description: "A lightweight experimental chatbot to assist in coding, note making, and research workflows.",
    github: "https://github.com/entora/quantum-chat",
    team: [
      { name: "Member 3", linkedin: "#" }
    ]
  },
  {
    name: "BlackHole Insights",
    description: "A data analysis pipeline that visualises and summarizes logs, metrics, and AI experiments.",
    github: "https://github.com/entora/blackhole-insights",
    team: [
      { name: "Member 4", linkedin: "#" },
      { name: "Member 5", linkedin: "#" }
    ]
  }
];

// 🔧 Render project cards
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    card.innerHTML = `
      <div class="project-header">
        <h3>${project.name}</h3>
      </div>
      <p class="project-desc">${project.description}</p>
      <a class="project-github" href="${project.github}" target="_blank" rel="noreferrer">
        View on GitHub
      </a>
      <div class="project-team">
        <h4>Team Members</h4>
        <ul>
          ${project.team
            .map(
              (member) =>
                `<li><a href="${member.linkedin}" target="_blank" rel="noreferrer">${member.name}</a></li>`
            )
            .join("")}
        </ul>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderProjects);
