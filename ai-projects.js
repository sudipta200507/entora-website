// ai-projects.js

// 🧠 All AI projects data here
// Just edit this array when you add new projects.
const projects = [
  {
    name: "Project GreenGrow",
    description: "GreenGrow – An AI-Powered Farming Assistant Platform. ",
    github: "https://github.com/sudipta200507/GreenGrow.git",
    team: [
      { name: "Sudipta Roy", linkedin: "https://www.linkedin.com/in/sudipta-roy-a031bb251" },
      { name: "Rimanshu Patel", linkedin: "https://www.linkedin.com/in/rimanshu-patel-246a79245" },
      { name: "Somenath Gorai", linkedin: "https://www.linkedin.com/in/sov-ereign?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BOfFk%2FtEYTPavdr0kFW6YCw%3D%3D" },
      { name: "Monish Mondal", linkedin: "https://www.linkedin.com/in/monish-mondal-web?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIQ%2FK4EZJQNyOhS0yFJQBUQ%3D%3D" }
      
    ]
  },
  {
    name: "Upcoming",
    description: "Coming soon",
    github: "https://github.com/entora/upcoming",
    team: [
      { name: "Member 1", linkedin: "#" },
      { name: "Member 2", linkedin: "#" },
      { name: "Member 3", linkedin: "#" },
      { name: "Member 4", linkedin: "#" }
    ]
  },
  {
    name: "Upcoming",
    description: "Coming soon",
    github: "https://github.com/entora/upcoming",
    team: [
      { name: "Member 1", linkedin: "#" },
      { name: "Member 2", linkedin: "#" },
      { name: "Member 3", linkedin: "#" },
      { name: "Member 4", linkedin: "#" }
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

