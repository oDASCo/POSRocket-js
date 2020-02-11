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
resultsBlock.style.display = 'none';

let searchInput = document.getElementById('searchInput');
let searchInputBlock  = document.getElementById('searchInputBlock');

searchInput.oninput = ((event) => {
    data.forEach(item => {
        if ((item.text.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) &&
            (event.target.value !== '')) {
            resultsBlock.style.display = 'flex';
            searchInputBlock.classList.add('active');
        } else if (event.target.value === '') {
            resultsBlock.style.display = 'none';
            searchInputBlock.classList.remove('active');
        }
    });
    resultData = data.filter((item) =>
        item.text.toLowerCase().indexOf(event.target.value.trim().toLowerCase()) !== -1);
    resultsBlock.innerHTML = '';
    resultData.forEach(item => {
        row += `  <div class="resultRow">
                <div class="resultRow_main">
                    <span class="resultRow_label" style="background-color: ${item.color}">${item.label}</span>
                    <p class="resultRow_text">${item.text}</p>
                </div>
                <span class="resultRow_btn">Select</span>
            </div>`;
        resultsBlock.innerHTML = row;
    });
    row = '';
});

