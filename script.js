let apiKey = `pqiWEDtWRSel2sbZpjoGfGA95tlGZ2aq`
let rootElements = () => {
    let rootElementsInnerHtml = `<div class="container pt-5">
    <h1>New York Times Top Stories</h1>
    <div class="row">
        <div class="col-12 mt-5">
            <div class="accordion" id="nytimesAccordion">
            </div>
            </div>
        </div>
    </div>`
    document.body.innerHTML = rootElementsInnerHtml;
}
rootElements();
let loadElements = () => {
    let loadInnerHTML = '';
    let testArr = [
        'Arts',
        'Automobiles',
        'Books',
        'Business',
        'Fashion',
        'Food',
        'Health',
        'Magazine',
        'Movies',
        'politics',
        'science'
    ];
    testArr.forEach(element => {
        let displayList = ` <div class="card">
        <div class="card-header" id="${element}">
            <h2 class="mb-0">
                <button class="accordion" type="button" data-toggle="collapse" data-target="#${element}Collapse" aria-expanded="true" aria-controls="${element}Collapse" onclick="getData('${element}');">
                ${element}
          </button>
            </h2>
        </div>    
        <div id="${element}Collapse" class="collapse row show" aria-labelledby="${element}" data-parent="#nytimesAccordion">
        </div>
        </div>
        `;
        loadInnerHTML += displayList;
    })
    document.getElementById('nytimesAccordion').innerHTML = loadInnerHTML;
}
loadElements();
let getData = async(sectionName) => {
    try {
        let url = `https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();
        let accordionCollapseContent = '';
        if (data.results.length > 0) {
            let newCardInfo = data.results;
            console.log(newCardInfo);
            for (let i = 0; i < newCardInfo.length; i++) {
                let imgSrc = '';
                let newsUrl = newCardInfo[i].short_url;
                if (newsUrl == "" || newsUrl == undefined || newsUrl == null || newsUrl.length == 0) {
                    newsUrl = newCardInfo[i].url;
                }
                if (newCardInfo[i].hasOwnProperty('multimedia') && newCardInfo[i]['multimedia'] != null) {
                    imgSrc = newCardInfo[i].multimedia[1].url;
                }
                let currentCollapseData = `<div class="col-8 offset-2 offset-lg-0 col-lg-6 mt-4">
                    <div class="card mb-3">
                    ${sectionName} - ${newCardInfo[i].item_type}
                        <div class="row no-gutters">          
                            <div class="col-md-4 order-md-1">
                                <img src="${imgSrc}" class="card-img" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${newCardInfo[i].title}</h5>
                                    <p class="card-text"><small class="text-muted">${new Date(newCardInfo[i].created_date).toDateString()}</small></p>
                                    <p class="card-text">${newCardInfo[i].abstract}</p>
                                    <a href="${newsUrl}" class="card-link">Continue Reading</a>
                                </div>
                                <div class="card-footer">
                                    ${newCardInfo[i].byline}
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>`;
                accordionCollapseContent += currentCollapseData;
            }
            document.getElementById(`${sectionName}Collapse`).innerHTML = accordionCollapseContent;
        }
    } catch (error) {
        let errorElement = document.createElement('div');
        errorElement.className = `alert alert-warning alert-dismissible fade show`;
        errorElement.Role = `alert`;
        errorElement.tabIndex = 10;
        errorElement.innerHTML = `<strong>Error!</strong> ${error}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>`
        document.getElementById(`${sectionName}Collapse`).appendChild(errorElement);
    }
}
let getFirstData = async(sectionName = 'arts') => {
    try {
        let url = `https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();
        let accordionCollapseContent = '';
        if (data.results.length > 0) {
            let newCardInfo = data.results;
            console.log(newCardInfo);
            for (let i = 0; i < newCardInfo.length; i++) {
                let imgSrc = '';
                let newsUrl = newCardInfo[i].short_url;
                if (newsUrl == "" || newsUrl == undefined || newsUrl == null || newsUrl.length == 0) {
                    newsUrl = newCardInfo[i].url;
                }
                if (newCardInfo[i].hasOwnProperty('multimedia') && newCardInfo[i]['multimedia'] != null) {
                    imgSrc = newCardInfo[i].multimedia[1].url;
                }
                let currentCollapseData = `    <div class="col-8 offset-2 offset-lg-0 col-lg-6 mt-4">
                    <div class="card mb-3">
                    ${sectionName} - ${newCardInfo[i].item_type}
                        <div class="row no-gutters">          
                            <div class="col-md-4 order-md-1">
                                <img src="${imgSrc}" class="card-img" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${newCardInfo[i].title}</h5>
                                    <p class="card-text"><small class="text-muted">${new Date(newCardInfo[i].created_date).toDateString()}</small></p>
                                    <p class="card-text">${newCardInfo[i].abstract}</p>                                    
                                    <a href="${newsUrl}" class="card-link">Continue Reading</a>
                                </div>
                                <div class="card-footer">
                                    ${newCardInfo[i].byline}
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>`;
                accordionCollapseContent += currentCollapseData;
            }
            document.getElementById(`${sectionName}Collapse`).innerHTML = accordionCollapseContent;
        }
    } catch (error) {
        let errorElement = document.createElement('div');
        errorElement.className = `alert alert-warning alert-dismissible fade show`;
        errorElement.Role = `alert`;
        errorElement.tabIndex = 10;
        errorElement.innerHTML = `<strong>Error!</strong> ${error}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>`
        document.getElementById(`${sectionName}Collapse`).appendChild(errorElement);
    }
}
getFirstData();