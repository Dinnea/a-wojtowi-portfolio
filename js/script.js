let tagsMap = {};

function documentReady()
{
    console.log("Loaded.");
    fetchJSON();

    

    // addProject("https://github.com/Mightylight/Project_ShowOff", 
    //     "./src/img/gator-escape.png",
    //     "Escape the Gator",
    //     "A local multiplayer VR and PC game."
    // );
}

function fetchJSON()
{
     fetch("src/projects.json")
        .then(response => response.json())
        .then(data => {

            console.log("Projects JSON loaded:", data);
            tagsMap = data.tags;

            data.projects.forEach(element => addProject(
                                    element.url, 
                                    element.thumbnail, 
                                    element.title, 
                                    element.description,
                                    element.tags));
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

function addProject(url, thumbnail, title, description, tags) // tags are empty for now.
{
    let item = jQuery.parseHTML(
        ` <li class="projectParent">
                <a href= "`+ url + `" target="_blank">
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