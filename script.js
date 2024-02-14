const result = document.getElementById("result");
const filter = document.getElementById("filter");
const loadingItem = document.getElementById("loading-item");
const listItems = [];
let spinnerTimeout;

getData().then(() => {
  spinnerTimeout = setTimeout(removeSpinner, 3000);
});

filter.addEventListener("keyup", (e) => {
  showSpinner();
  clearTimeout(spinnerTimeout);
  setTimeout(() => {
    filterData(e.target.value);
    removeSpinner();
  }, 5000);
});

async function getData() {
  const res = await fetch("https://randomuser.me/api?results=50");
  const { results } = await res.json();

  result.innerHTML = "";

  results.forEach((user) => {
    const li = document.createElement("li");
    listItems.push(li);
    li.innerHTML = `<img src="${user.picture.large}" alt="${user.name.first}">
        <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
        </div>`;
    result.appendChild(li);
  });
}

function filterData(searchTerm) {
  listItems.forEach((item) => {
    const userText = item.innerText.toLowerCase();
    if (userText.includes(searchTerm.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
  removeSpinner();
}

function showSpinner() {
  loadingItem.classList.add("show");
}

function removeSpinner() {
  setTimeout(() => {
    loadingItem.classList.remove("show");
  }, 10000);
}
