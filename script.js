const data = [
    {
        text: 'John Dorie',
        color: 'red',
        imageURL: "./assets/img/user.png",
        category: 'person'
    },
    {
        text: 'Dean Gross',
        imageURL: "./assets/img/user.png",
        color: 'blue',
        category: 'person'
    },
    {
        text: 'Where do i get good winter jacket?',
        label: 'Fashion',
        color: 'red',
        category: 'question'
    },
    {
        text: 'Is it possible to ski with a normal winter jacket?',
        label: 'Questions',
        color: 'grey',
        category: 'question'
    }
];
let resultData = [];

let resultsBlock = document.getElementById('results');
let SearchRow = "";
let recentSearchRow = "";


let searchInput = document.getElementById('searchInput');
let searchInputBlock = document.getElementById('searchInputBlock');

let recentChoiceArr = [];

searchInput.addEventListener("click", () => {
    !searchInput.value ? displayRecentChoice() : null;
});

searchInputBlock.onclick = function (event) {
    let currentResult = event.target;
    if (currentResult.className === 'resultRow_btn') {
        highlightChoice(currentResult);
    }

};

searchInput.addEventListener("keyup", (event) => {
    let currentInputValue = searchInput.value;
    let currentRow = document.getElementsByClassName("resultRow_current-choice");
    let allRowElements = document.getElementsByClassName("resultRow");
    if(currentRow[0]){
        if(event.key === "ArrowDown"){
            if(currentRow[0].nextElementSibling){
                currentRow[0].nextElementSibling.classList.add("resultRow_current-choice");
                currentRow[0].classList.remove("resultRow_current-choice");
            }else{
                allRowElements[allRowElements.length - 1].classList.remove("resultRow_current-choice");
                allRowElements[0].classList.add("resultRow_current-choice");
            }
        }
        if(event.key === "ArrowUp"){
            if(currentRow[0].previousElementSibling && currentRow[0].previousElementSibling.className !== "resultRow_hint"){
                currentRow[0].previousElementSibling.classList.add("resultRow_current-choice");
                currentRow[1].classList.remove("resultRow_current-choice");
            }else{
                allRowElements[0].classList.remove("resultRow_current-choice");
                allRowElements[allRowElements.length - 1].classList.add("resultRow_current-choice");
            }
        }
    }
    if (event.key === "Enter") {
        if(currentRow[0] && currentInputValue){
            let highlightText = currentRow[0].childNodes[1].childNodes[3].innerText;
            searchInput.value = highlightText;
            saveRecentData(highlightText);
            filterSearchResults(event);
        }else if(currentRow[0] && !currentInputValue){
            let highlightText = currentRow[0].childNodes[1].innerText;
            searchInput.value = highlightText;
            saveRecentData(highlightText);
            filterSearchResults(event);
        }else{
            saveRecentData(currentInputValue);
        }

    }
});

searchInput.oninput = ((event) => {
    filterSearchResults(event);
});

function filterSearchResults(event) {
    resultsBlock.innerHTML = "";
    resultData = [];
    data.forEach(item => {
        if ((item.text.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) &&
            (event.target.value !== '')) {
            resultsBlock.style.display = 'flex';
            searchInputBlock.classList.add('active');
            resultData = data.filter((item) =>
                item.text.toLowerCase().indexOf(event.target.value.trim().toLowerCase()) !== -1);
            resultsBlock.innerHTML = '';
            resultData.forEach(item => {
                if(item.category === "person"){
                    SearchRow += `  <div class="resultRow">
                            <div class="resultRow_main">  
                
                                <img src="${item.imageURL}" alt="" class="resultRow_person-img">
                                <p class="resultRow_text">${item.text}</p>
                            </div>
                            <span class="resultRow_btn" data-value="${item.text}">Select</span>
                        </div>`;
                }else{
                    SearchRow += `  <div class="resultRow">
                            <div class="resultRow_main">
                                <span class="resultRow_label" style="background-color: ${item.color}">${item.label}</span>
                                <p class="resultRow_text">${item.text}</p>
                            </div>
                            <span class="resultRow_btn" data-value="${item.text}">Select</span>
                        </div>`;
                }
                resultsBlock.innerHTML = SearchRow;
            });
            highlightFirstMatch();
            SearchRow = '';
        } else if (event.target.value === '') {
            resultData = [];
            resultsBlock.innerHTML = "";
            searchInputBlock.classList.remove('active');
        } else if(event.target.value !== '' && !resultData.length){
            resultData = [];
            searchInputBlock.classList.add('active');
            let nothingToShow = `<div class="resultRow_text">No results</div>`;
            resultsBlock.innerHTML = nothingToShow;
        }
    });

}

function displayRecentChoice() {
    if (recentChoiceArr.length) {
        searchInputBlock.classList.add('active');
        recentSearchRow = `<div class="resultRow_hint">Recent searches</div>`;
        recentChoiceArr.forEach(item => {
            recentSearchRow += `  <div class="resultRow">
                <div class="resultRow_main">
                    <p class="resultRow_text">${item}</p>
                </div>
                <span class="resultRow_btn" data-value="${item}">Select</span>
            </div>`;
        });
        resultsBlock.innerHTML = recentSearchRow;
        highlightFirstMatch();
    }
}

function highlightFirstMatch() {
    document.getElementsByClassName("resultRow")[0].classList.add("resultRow_current-choice");
}

function saveRecentData(currentValue) {
    let indexOfSelectedElement = recentChoiceArr.indexOf(currentValue);
    if (indexOfSelectedElement !== -1) {
        recentChoiceArr.splice(indexOfSelectedElement, 1);
        recentChoiceArr.unshift(currentValue);
    } else {
        if (recentChoiceArr.length === 4) {
            recentChoiceArr.pop();
            recentChoiceArr.unshift(currentValue);
        } else {
            recentChoiceArr.unshift(currentValue);
        }
    }
}

function highlightChoice(elem, event) {
    saveRecentData(elem.dataset.value);
    let resultRows = document.getElementsByClassName("resultRow");
    for (let i = 0; i < resultRows.length; i++) {
        resultRows[i].classList.remove("resultRow_current-choice");
    }
    elem.parentElement.classList.add("resultRow_current-choice");
}