const data = [
    {
        text: 'Daria Lazovskaya',
        label: 'fizy',
        color: 'red',
        category: 'person'
    },
    {
        text: 'Sasha Yarmolkevich',
        label: 'lifebox',
        color: 'blue',
        category: 'person'
    },
    {
        text: 'Eche Ktoto',
        label: 'durashka',
        color: 'red',
        category: 'person'
    },
    {
        text: 'Masha Ivanova',
        label: 'durashka',
        color: 'green',
        category: 'person'
    },
    {
        text: 'Duria Bel',
        label: 'durashka',
        color: 'purple',
        category: 'person'
    },
];
let resultData = [];

let resultsBlock = document.getElementById('results');
let row = '';
// resultsBlock.style.display = 'none';

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
        if(currentRow[0].previousElementSibling){
            currentRow[0].previousElementSibling.classList.add("resultRow_current-choice");
            currentRow[1].classList.remove("resultRow_current-choice");
        }else{
            allRowElements[0].classList.remove("resultRow_current-choice");
            allRowElements[allRowElements.length - 1].classList.add("resultRow_current-choice");
        }
    }
    if (event.key === "Enter" && currentInputValue) {
        saveRecentData(currentInputValue);
        if (!resultData.length) {
            displayRecentChoice();
        }
    }
});

searchInput.oninput = ((event) => {
    resultsBlock.innerHTML = "";
    data.forEach(item => {
        if ((item.text.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) &&
            (event.target.value !== '')) {
            resultsBlock.style.display = 'flex';
            searchInputBlock.classList.add('active');
            resultData = data.filter((item) =>
                item.text.toLowerCase().indexOf(event.target.value.trim().toLowerCase()) !== -1);
            resultsBlock.innerHTML = '';
            resultData.forEach(item => {
                row += `  <div class="resultRow">
                            <div class="resultRow_main">
                                <span class="resultRow_label" style="background-color: ${item.color}">${item.label}</span>
                                <p class="resultRow_text">${item.text}</p>
                            </div>
                            <span class="resultRow_btn" data-value="${item.text}">Select</span>
                        </div>`;
                resultsBlock.innerHTML = row;
            });
            highlightFirstMatch();
            row = '';
        } else if (event.target.value === '') {
            resultsBlock.innerHTML = '';
            searchInputBlock.classList.remove('active');
        }
    });

});

function displayRecentChoice() {
    if (recentChoiceArr.length) {
        searchInputBlock.classList.add('active');
        row = `<div class="resultRow_hint">Recent searches</div>`;
        recentChoiceArr.forEach(item => {
            row += `  <div class="resultRow">
                <div class="resultRow_main">
                    <p class="resultRow_text">${item}</p>
                </div>
                <span class="resultRow_btn" data-value="${item}">Select</span>
            </div>`;
        });
        resultsBlock.innerHTML = row;
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

function highlightChoice(elem) {
    saveRecentData(elem.dataset.value);
    let resultRows = document.getElementsByClassName("resultRow");
    for (let i = 0; i < resultRows.length; i++) {
        resultRows[i].classList.remove("resultRow_current-choice");
    }
    elem.parentElement.classList.add("resultRow_current-choice");
}