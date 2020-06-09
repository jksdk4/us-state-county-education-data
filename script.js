function validateOnSubmit(searchFld, checkSelector){
    if (searchFld.value == "" && checkSelector.value !== "All") {
        window.alert("Please enter something to search for in the search box.");
        return true;
    }
    return false;
}

function loadSelectStateField(stateListOpts){
    let fetchedStates = fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json");
    fetchedStates.then(function(response){
        response.json().then(function(json){
            stateListOptsStr = '';
            for (let i = 0; i < json.length; i++){
                stateListOptsStr += `<option>${json[i].name}</option>`;
            }
            stateListOpts.innerHTML += stateListOptsStr;
        });
    });
}

window.addEventListener("load", function(){
    let stateListOptions = document.querySelector("select");
    loadSelectStateField(stateListOptions);

    // select state page
    let stateOptions = document.querySelector("form");
    stateOptions.addEventListener("submit", function(e){
        let choice = stateListOptions.options[stateListOptions.selectedIndex];
        if (choice == stateListOptions.options[0]){
            alert("Choose a state to continue.");
            e.preventDefault();
        } else {
            // redirect to individual state page
        }
    });

    // search
    let searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", function(e) {
        let searchField = document.querySelector("input[name=searchTerm]");
        let checkedSelector = document.querySelector("input[name=searchType]:checked");
        let noInput = validateOnSubmit(searchField, checkedSelector);
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
                    const entry = searchField.value;
                    let resultsStr = "";
                    for (let i = 0; i < json.length; i++){
                        // state shows by name or by postal abbrev
                        if (json[i].name.toLowerCase().includes(entry.toLowerCase()) || json[i].abbreviation.includes(entry.toUpperCase())){
                            resultsStr += `<p>${json[i].name}</p>`;
                        }
                    }
                    
                    if (resultsStr.length == 0){
                        if (checkedSelector.value == "All" && entry.length < 1){    // blank search & 'All' chosen
                            for (let i = 0; i < json.length; i++){
                                // this uses the above json[i].name value?? might need to redo loop
                                resultsStr += `<p>${json[i].abbreviation}</p>`;     // list everything
                            }
                        } else {    // none found, nonblank search & 'All' not checked
                            results.innerHTML = `<p><strong>Nothing here!</strong></p>
                            <p>The search returned no results.</p>`;
                        }
                    } else {
                        results.innerHTML = resultsStr;
                    }
                });
            });
        }
        e.preventDefault();
    });
});