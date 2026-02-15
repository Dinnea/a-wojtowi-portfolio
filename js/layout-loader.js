async function loadPartial(selector, url) 
{
    const element = document.querySelector(selector);

    if (!element) 
    {
        console.error(`Element with selector "${selector}" not found.`);
        return;
    }

    const response = await fetch(url);
    if (!response.ok) 
    {
        console.error(`Failed to load partial from "${url}": ${response.statusText}`);
        return;
    }

    element.innerHTML = await response.text();  
}

(async function initializeLayout() 
{
    await loadPartial("#header", "partials/header.html");
    await loadPartial("#footer", "partials/footer.html");
})();