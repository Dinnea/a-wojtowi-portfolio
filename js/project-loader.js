let tagsMap = {};

function documentReady()
{
    console.log("JSON loader ready.");
    fetchJSON();
}

function fetchJSON()
{
     fetch("src/projects.json")
        .then(response => response.json())
        .then(data => {

            console.log("Projects JSON loaded:", data);
            tagsMap = data.tags;

            data.projects.forEach(element => addProject(element, false));
        })
        .catch(err => console.error(err));
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

function addProject(element, subpage) // tags are empty for now.
{
    let id = element.id;
    let thumbnail = element.thumbnail;
    let title = element.title; 
    let description = element.description;
    let tags = element.tags;

    let url = subpage ? "project.html?id=" + encodeURI(id) : element.url;
    let target = subpage ? "_self" : "_blank";

    let item = jQuery.parseHTML(
        ` <li class="projectParent">
                <a href= "`+ url + `" target="`+ target +`">
                    <div class="project">
                        <img src="`+ thumbnail+`">
                        <div class ="text"> 
                            <h2>`+ title +`</h2>
                            <p>`+ description+ `</p>
                        </div>
                    </div>
                </a>
                <ul class ="tags">
                </ul>
            </li>
        `);

    let $item = $(item);
    let tagsContainer = $item.find(".tags");

    tags.forEach(tagKey => {
    const tag = tagsMap[tagKey];

    addTag(tagsContainer, tag);
    });

    $(".projectContainer").append(item);
}

$(document).ready(documentReady);