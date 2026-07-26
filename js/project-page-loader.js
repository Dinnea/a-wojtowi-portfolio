let tagsMap = {};

function projectPageReady()
{
    console.log("JSON loader ready.");

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");

    if (!projectId)
    {
        console.error("No project id found in URL.");
        $("#projectTitle").text("Project not found");
        return;
    }
    else console.log("Project ID from URL:", projectId);

    fetchProject(projectId);
    
    
}


function fetchProject(projectId)
{
    fetch("src/projects.json")
        .then(response => response.json())
        .then(data => {
            console.log("Projects JSON loaded:", data);
            tagsMap = data.tags;

            const project = data.projects.find(p => p.id === projectId);

            if (!project)
            {
                console.error(`Project with id "${projectId}" not found.`);
                $("#projectTitle").text("Project not found");
                return;
            }
            else console.log("Project data found:", project);

            displayProject(project);

        }).catch(err => console.error(err));
}


function displayProject(project)
{
 
    $("#projectIntro h1").text(project.title);
    $("#projectIntro h2").text(project.description);
    
    let aboutContainer = $("#textBox");
    aboutContainer.empty();

    if(project.about)
    {
        project.about.forEach(paragraph => {
            aboutContainer.append(`<p>${paragraph}</p>`);
        });
    }

     $("#projectIntro .projectImage")
        .attr("src", project.thumbnail)
        .attr("alt", project.title);
    
    let tagsContainer = $(document).find(".tags");

    if(project.tags)
    {
        project.tags.forEach(tagId => {
            const tag = tagsMap[tagId];
            addTag(tagsContainer, tag);
        });

        if(project.tags.includes("solo"))
        {
            $("#roleInfo").hide();
        }
    }

    if(project.url)
    {
        $("#githubLink").attr("href", project.url).attr("target", "_blank");;
    }

    if(!project.media)
    {
        $("#media").hide();
    }
}

function addTag(container, tag)
{
    let tagItem = jQuery.parseHTML(
        `<li class ="`+ tag.id +`">
            `+tag.label+`
        </li>   `
    )

    container.append(tagItem);
}

$(document).ready(projectPageReady);