// Import data
let portfolioData = {};

// Load portfolio data
async function loadData() {
    try {
        console.log('Loading data from data/data.json...');
        const response = await fetch('data/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        portfolioData = await response.json();
        console.log('Data loaded successfully:', portfolioData);
        renderPortfolio();
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to default data
        loadDefaultData();
        renderPortfolio();
    }
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = () => handleProjectClick(project);
    
    const imageDiv = document.createElement('div');
    imageDiv.className = `project-image project-${project.type}`;
    
    // Add actual image if imageUrl exists
    if (project.imageUrl) {
        const img = document.createElement('img');
        img.src = project.imageUrl;
        img.alt = project.title;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        imageDiv.appendChild(img);
    }
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'project-info';
    
    const title = document.createElement('h3');
    title.textContent = project.title;
    
    const yearSpan = document.createElement('span');
    yearSpan.textContent = project.year;
    yearSpan.className = 'project-year';
    title.appendChild(document.createTextNode('  '));
    title.appendChild(yearSpan);
    
    const meta = document.createElement('div');
    meta.className = 'project-meta';
    
    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = project.description;
    meta.appendChild(descriptionSpan);
    
    if (project.details) {
        const detailsSpan = document.createElement('span');
        detailsSpan.textContent = project.details;
        meta.appendChild(detailsSpan);
    }
    
    // Create tools and technologies section
    let techDiv = null;
    if (project.toolsAndTechnologies && project.toolsAndTechnologies.length > 0) {
        techDiv = document.createElement('div');
        techDiv.className = 'project-tech';
        techDiv.textContent = project.toolsAndTechnologies.join(', ');
    }
    
    // Create links container
    const linksDiv = document.createElement('div');
    linksDiv.className = 'project-links';
    
    // GitHub link
    if (project.githubLink) {
        const githubLink = document.createElement('a');
        githubLink.href = project.githubLink;
        githubLink.target = '_blank';
        githubLink.className = 'project-link github-link';
        githubLink.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        `;
        githubLink.title = 'View on GitHub';
        githubLink.onclick = (e) => {
            e.stopPropagation();
        };
        linksDiv.appendChild(githubLink);
    }
    
    // Site link
    if (project.siteLink) {
        const siteLink = document.createElement('a');
        siteLink.href = project.siteLink;
        siteLink.target = '_blank';
        siteLink.className = 'project-link site-link';
        siteLink.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
            </svg>
        `;
        siteLink.title = 'View Live Site';
        siteLink.onclick = (e) => {
            e.stopPropagation();
        };
        linksDiv.appendChild(siteLink);
    }
    
    infoDiv.appendChild(title);
    infoDiv.appendChild(meta);
    if (techDiv) {
        infoDiv.appendChild(techDiv);
    }
    infoDiv.appendChild(linksDiv);
    
    card.appendChild(imageDiv);
    card.appendChild(infoDiv);
    
    return card;
}

// Handle project click
function handleProjectClick(project) {
    console.log('Project clicked:', project.title);
    // Add navigation or modal logic here
}

// Render portfolio content
function renderPortfolio() {
    if (!portfolioData) return;
    
    // Update profile information
    if (portfolioData.profile) {
        const nameElement = document.getElementById('name');
        const titleElement = document.getElementById('title');
        const bioElement = document.getElementById('bio');
        
        if (nameElement) nameElement.textContent = portfolioData.profile.name;
        if (titleElement) titleElement.textContent = portfolioData.profile.title;
        if (bioElement) bioElement.textContent = portfolioData.profile.bio;
    }
    
    // Update contact links
    if (portfolioData.contact) {
        const emailLink = document.getElementById('emailLink');
        const linkedinLink = document.getElementById('linkedinLink');
        const githubLink = document.getElementById('githubLink');
        
        if (emailLink) emailLink.href = portfolioData.contact.email;
        if (linkedinLink) linkedinLink.href = portfolioData.contact.linkedin;
        if (githubLink) githubLink.href = portfolioData.contact.github;
    }
    
    // Render projects
    renderProjects();
    
    // Render experience
    renderExperience();
    
    // Render all skills categories
    renderAllSkills();
}

// Render projects grid
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) {
        console.error('Projects grid element not found');
        return;
    }
    
    if (!portfolioData.projects) {
        console.error('No projects data found');
        return;
    }
    
    // Show only first 6 projects for selected work
    const selectedProjects = portfolioData.projects.slice(0, 6);
    console.log(`Rendering ${selectedProjects.length} selected projects...`);
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    // Create project cards
    selectedProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
    
    console.log('Selected projects rendered successfully');
}

// Render all skills categories
function renderAllSkills() {
    if (!portfolioData.skills) {
        console.error('No skills data found');
        return;
    }
    
    console.log('Rendering all skills categories...');
    
    // Render each category
    renderSkillsCategory('programmingLanguages', 'programmingLanguagesList');
    renderSkillsCategory('frameworksAndLibraries', 'frameworksAndLibrariesList');
    renderSkillsCategory('cloudAndDevOps', 'cloudAndDevOpsList');
    renderSkillsCategory('toolsAndTechnologies', 'toolsAndTechnologiesList');
    
    console.log('All skills rendered successfully');
}

// Render individual skills category
function renderSkillsCategory(categoryKey, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Skills container not found: ${containerId}`);
        return;
    }
    
    if (!portfolioData.skills[categoryKey]) {
        console.error(`No skills data found for category: ${categoryKey}`);
        return;
    }
    
    // Create a simple comma-separated list
    const skillsText = portfolioData.skills[categoryKey].join(', ');
    container.textContent = skillsText;
}

// Render experience section
function renderExperience() {
    const experienceContainer = document.getElementById('experienceContent');
    if (!experienceContainer) {
        console.error('Experience container not found');
        return;
    }
    
    if (!portfolioData.experience || portfolioData.experience.length === 0) {
        console.error('No experience data found');
        return;
    }
    
    console.log('Rendering experience...');
    
    // Clear existing content
    experienceContainer.innerHTML = '';
    
    // Create experience items
    portfolioData.experience.forEach(exp => {
        const experienceItem = createExperienceItem(exp);
        experienceContainer.appendChild(experienceItem);
    });
    
    console.log('Experience rendered successfully');
}

// Create individual experience item
function createExperienceItem(experience) {
    const item = document.createElement('div');
    item.className = 'experience-item';
    
    const company = document.createElement('div');
    company.className = 'experience-company';
    
    // If link exists, make the company name clickable
    if (experience.link) {
        const companyLink = document.createElement('a');
        companyLink.href = experience.link;
        companyLink.target = '_blank';
        companyLink.className = 'company-name-link';
        companyLink.textContent = experience.company;
        company.appendChild(companyLink);
        
        const linkIcon = document.createElement('a');
        linkIcon.href = experience.link;
        linkIcon.target = '_blank';
        linkIcon.className = 'experience-link';
        linkIcon.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
            </svg>
        `;
        linkIcon.title = `Visit ${experience.company}`;
        company.appendChild(linkIcon);
    } else {
        company.textContent = experience.company;
    }
    
    const role = document.createElement('div');
    role.className = 'experience-role';
    role.textContent = experience.role;
    
    const period = document.createElement('div');
    period.className = 'experience-period';
    period.textContent = experience.period;
    
    const description = document.createElement('div');
    description.className = 'experience-description';
    description.textContent = experience.description;
    
    item.appendChild(company);
    item.appendChild(role);
    item.appendChild(period);
    item.appendChild(description);
    
    return item;
}

// Load default data as fallback
function loadDefaultData() {
    portfolioData = {
        profile: {
            name: "Praveen",
            title: "Software Engineer",
            bio: "A passionate Software Engineer with a focus on building impactful digital solutions."
        },
        contact: {
            email: "mailto:praveenkumard.dev@gmail.com",
            linkedin: "https://linkedin.com/in/praveen"
        },
        projects: [
            {
                id: 1,
                title: "Sample Project",
                category: "Web Development",
                year: "2024",
                type: "web",
                description: "A sample project"
            }
        ],
        skills: {
            programmingLanguages: ["JavaScript", "Python", "HTML5", "CSS3"],
            frameworksAndLibraries: ["React", "Node.js", "Express.js"],
            cloudAndDevOps: ["AWS", "Docker", "Git"],
            toolsAndTechnologies: ["VS Code", "Figma", "MongoDB"]
        },
        experience: [
            {
                company: "Sample Company",
                role: "Software Engineer",
                period: "2023 - Present",
                description: "Sample experience description"
            }
        ]
    };
}

// Handle navigation
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    // Navigation handlers
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Skip external page links (projects.html)
        const href = link.getAttribute('href');
        if (href === 'projects.html') {
            return;
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Handle different sections
            const tabId = this.id;
            handleTabChange(tabId);
        });
    });
});

// Handle tab changes
function handleTabChange(tabId) {
    switch(tabId) {
        case 'informationTab':
            // Show information content (default view) - scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'skillsTab':
            // Scroll to skills section
            const skillsSection = document.querySelector('.skills-section');
            if (skillsSection) {
                skillsSection.scrollIntoView({ behavior: 'smooth' });
            }
            break;
        case 'experienceTab':
            // Scroll to experience section
            const experienceSection = document.querySelector('.experience-section');
            if (experienceSection) {
                experienceSection.scrollIntoView({ behavior: 'smooth' });
            }
            break;
        case 'socialsTab':
            // Scroll to contact section
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            break;
    }
}

// Handle sitemap click
document.addEventListener('DOMContentLoaded', function() {
    const sitemapLink = document.querySelector('.sitemap-link');
    if (sitemapLink) {
        sitemapLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});