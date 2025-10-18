function handleMenuClick() {
  const menuBtn = document.querySelector('[data-testid="menu-button"]');
  const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";

  menuBtn.setAttribute("aria-expanded", !isExpanded);
  console.log("Menu clicked, expanded:", !isExpanded);

  announceToScreenReader(isExpanded ? "Menu closed" : "Menu opened");

  alert("Menu options:\n- Edit Profile\n- Settings\n- Share Profile\n- Report");
}

function handleSocialClick(platform) {
  console.log(`${platform} link clicked`);
  announceToScreenReader(`Opening ${platform} profile`);
  return true;
}

function handleViewProfile() {
  console.log("View Profile button clicked");
  announceToScreenReader("Loading full profile");

  const profileData = {
    name: document.querySelector('[data-testid="profile-name"]').textContent,
    title: document.querySelector('[data-testid="profile-title"]').textContent,
    projects: document.querySelector('[data-testid="stat-projects-value"]')
      .textContent,
    following: document.querySelector('[data-testid="stat-following-value"]')
      .textContent,
    followers: document.querySelector('[data-testid="stat-followers-value"]')
      .textContent,
  };

  console.log("Profile data:", profileData);
  alert(
    `Viewing full profile for ${profileData.name}\n\nRole: ${profileData.title}\nProjects: ${profileData.projects}\nFollowing: ${profileData.following}\nFollowers: ${profileData.followers}`
  );
}

function announceToScreenReader(message) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", "polite");
  announcement.className = "sr-only";
  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

document.querySelectorAll(".stat-item").forEach((stat) => {
  stat.setAttribute("tabindex", "0");
  stat.setAttribute("role", "button");

  stat.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const label = stat.querySelector(".stat-label").textContent;
      const value = stat.querySelector(".stat-value").textContent;
      console.log(`${label}: ${value} clicked`);
      alert(
        `${label}: ${value}\n\nClick to view detailed ${label.toLowerCase()} list`
      );
    }
  });

  stat.addEventListener("click", () => {
    const label = stat.querySelector(".stat-label").textContent;
    const value = stat.querySelector(".stat-value").textContent;
    console.log(`${label}: ${value} clicked`);
  });
});

console.log("Profile card component initialized");

window.profileCard = {
  handleMenuClick,
  handleSocialClick,
  handleViewProfile,
  getProfileData: () => ({
    name: document.querySelector('[data-testid="profile-name"]').textContent,
    title: document.querySelector('[data-testid="profile-title"]').textContent,
    bio: document.querySelector('[data-testid="bio-text"]').textContent,
    stats: {
      projects: document.querySelector('[data-testid="stat-projects-value"]')
        .textContent,
      following: document.querySelector('[data-testid="stat-following-value"]')
        .textContent,
      followers: document.querySelector('[data-testid="stat-followers-value"]')
        .textContent,
    },
  }),
  updateStat: (statName, value) => {
    const element = document.querySelector(
      `[data-testid="stat-${statName}-value"]`
    );
    if (element) {
      element.textContent = value;
      console.log(`Updated ${statName} to ${value}`);
    }
  },
};
