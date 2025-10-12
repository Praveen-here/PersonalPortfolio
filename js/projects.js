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
        renderProjectsTable();
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to default data
        loadDefaultData();
        renderProjectsTable();
    }
}

// Render projects table
function renderProjectsTable() {
    const tableBody = document.getElementById('projectsTableBody');
    if (!tableBody) {
        console.error('Projects table body not found');
        return;
    }
    
    if (!portfolioData.projects) {
        console.error('No projects data found');
        return;
    }
    
    console.log(`Rendering ${portfolioData.projects.length} projects in table...`);
    
    // Clear existing content
    tableBody.innerHTML = '';
    
    // Create table rows
    portfolioData.projects.forEach(project => {
        const row = createProjectRow(project);
        tableBody.appendChild(row);
    });
    
    console.log('Projects table rendered successfully');
}

// Create project table row
function createProjectRow(project) {
    const row = document.createElement('tr');
    
    // Name column
    const nameCell = document.createElement('td');
    nameCell.innerHTML = `
        <div class="project-name">${project.title}</div>
        <div class="project-year">${project.year}</div>
    `;
    row.appendChild(nameCell);
    
    // Description column (hidden on mobile)
    const descCell = document.createElement('td');
    descCell.className = 'hide-mobile';
    descCell.innerHTML = `<div class="project-description">${project.description}</div>`;
    row.appendChild(descCell);
    
    // Tools & Technologies column (hidden on mobile)
    const techCell = document.createElement('td');
    techCell.className = 'hide-mobile';
    if (project.toolsAndTechnologies && project.toolsAndTechnologies.length > 0) {
        techCell.innerHTML = `<div class="project-tech">${project.toolsAndTechnologies.join(', ')}</div>`;
    } else {
        techCell.innerHTML = `<div class="project-tech">—</div>`;
    }
    row.appendChild(techCell);
    
    // Links column
    const linksCell = document.createElement('td');
    const linksDiv = document.createElement('div');
    linksDiv.className = 'project-links';
    
    if (project.githubLink) {
        const githubLink = document.createElement('a');
        githubLink.href = project.githubLink;
        githubLink.target = '_blank';
        githubLink.className = 'project-link github-link';
        githubLink.textContent = 'GitHub';
        linksDiv.appendChild(githubLink);
    }
    
    if (project.siteLink) {
        const siteLink = document.createElement('a');
        siteLink.href = project.siteLink;
        siteLink.target = '_blank';
        siteLink.className = 'project-link site-link';
        siteLink.textContent = 'Site';
        linksDiv.appendChild(siteLink);
    }
    
    linksCell.appendChild(linksDiv);
    row.appendChild(linksCell);
    
    return row;
}

// Load default data as fallback
function loadDefaultData() {
    portfolioData = {
        projects: [
            {
                id: 1,
                title: "Sample Project",
                category: "Web Development",
                year: "2024",
                description: "A sample project",
                toolsAndTechnologies: ["HTML", "CSS", "JavaScript"],
                githubLink: "https://github.com/sample",
                siteLink: "https://sample.com"
            }
        ]
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    // Handle sitemap click
    const sitemapLink = document.querySelector('.sitemap-link');
    if (sitemapLink) {
        sitemapLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});