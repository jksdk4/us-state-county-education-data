function validateOnSumbit(searchField){
    if (searchField.value == "") {
        window.alert("Please enter something to search for in the search box.");
        return true;
    }
    return false;
}

function loadSelectStateField(){
    let stateListOpts = document.querySelector("select");
    let fetchedStates = fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json");
    fetchedStates.then(function(response){
        response.json().then(function(json){
            stateListOptsStr = '';
            for (let i = 0; i < json.length; i++){
                stateListOptsStr += `<option>${json[i].abbreviation}</option>`
            }
            stateListOpts.innerHTML += stateListOptsStr;
        });
    });          
}

window.addEventListener("load", function(){
    loadSelectStateField();

    let searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", function(e) {
        let searchField = document.querySelector("input[name=searchTerm]");
        let noInput = validateOnSumbit(searchField);
        if (noInput) {
            e.preventDefault();
        } else {
            // states only for now, no counties
            // this JSON is just for ensuring the function works
            // likely won't need to use anything with this later
            let fetchedStates = fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json");
            fetchedStates.then(function(response){
                response.json().then(function(json){
                    const results = document.getElementById("searchResults");
                    resultsStr = "";
                    for (let i = 0; i < json.length; i++){
                        // state shows by name or by postal abbrev
                        if (json[i].name.toLowerCase().includes(searchField.value.toLowerCase()) || json[i].abbreviation.includes(searchField.value.toUpperCase())){
                            resultsStr += `<p>${json[i].name}</p>`;
                        }
                    }
                    if (resultsStr == ""){
                        results.innerHTML = `<p><strong>Nothing here!</strong></p>
                        <p>The search returned no results.</p>`;
                    } else {
                        results.innerHTML = resultsStr;
                    }
                });
            });
        }
        e.preventDefault();

        let stateOptions = document.querySelector("form");
        stateOptions.addEventListener("submit", function(){
            // redirect to individual state page
        });
        
    });
});