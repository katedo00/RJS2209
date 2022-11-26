if (!window.localStorage.getItem("json.api")) {
  syncData();
}
let json = JSON.parse(window.localStorage.getItem("json.api"));
drawUser(json);
async function syncData() {
  let promise = new Promise((resolve) => {
    resolve(
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
        headers: {},
      }).then((response) =>
        response.json().then((res) => {
          return res;
        })
      )
    );
  });
  let users = await promise;
  window.localStorage.setItem("json.api", JSON.stringify(users));
}
// // (B) DRAW TABLE
function drawUser(users) {
  for (const index in users) {
    const user = users[index];
    const textArr = [
      user.id,
      `${user.name} ${user.username}`,
      user.email,
      user.phone,
    ];
    const tr = document.createElement("tr");
    for (const value of textArr) {
      const td = document.createElement("td");
      td.innerHTML = value;
      tr.appendChild(td);
    }
    const tdButton = document.createElement("td");
    tdButton.innerHTML = `<button onclick = "addUser(this, ${tr.firstChild.innerHTML});">Add</button><span style = "padding-right: 15px"></span><button onclick = "removeUser(this)">Remove</button>`;
    tr.appendChild(tdButton);
    document.querySelector(".editable tbody").appendChild(tr);
  }
}
// // (B2) ADD BUTTON
function addUser(el, index) {
  let currTR = el.parentNode.parentNode;
  let newTR = document.createElement("tr");
  newTR.innerHTML = `<td>${index}</td><td>(Insert Name)</td><td>(Insert Email)</td><td>(Insert Phone)</td><td><button onclick = "addUser(this, ${index});">Add</button><span style = "padding-right: 15px"></span><button onclick = "removeUser(this)">Remove</button>`;
  currTR.parentNode.insertBefore(newTR, currTR.nextSibling);
  users = [];
  document.querySelectorAll(".editable tbody tr").forEach((row, index) => {
    row.firstChild.innerHTML = index + 1;
    let user = {
      id: index + 1,
      name: row.childNodes[1].innerHTML,
      username: "",
      email: row.childNodes[2].innerHTML,
      phone: row.childNodes[3].innerHTML,
    };
    users.push(user);
  });
  console.log(users);
  window.localStorage.setItem("json.api", JSON.stringify(users));
}
// // (B3) REMOVE BUTTON
function removeUser(el) {
  let currTR = el.parentNode.parentNode;
  currTR.parentNode.removeChild(currTR);
  users = [];
  document.querySelectorAll(".editable tbody tr").forEach((row, index) => {
    row.firstChild.innerHTML = index + 1;
    let user = {
      id: index + 1,
      name: row.childNodes[1].innerHTML,
      username: "",
      email: row.childNodes[2].innerHTML,
      phone: row.childNodes[3].innerHTML,
    };
    users.push(user);
  });
  console.log(users);
  window.localStorage.setItem("json.api", JSON.stringify(users));
}
// // (B4) RESET BUTTON
function onReset() {
  document.querySelector(".editable tbody").innerHTML = "";
  syncData();
  let json = JSON.parse(window.localStorage.getItem("json.api"));
  drawUser(json);
}
// (C) INITIALIZE - DOUBLE CLICK TO EDIT CELL
window.addEventListener("DOMContentLoaded", () => {
  for (let cell of document.querySelectorAll(".editable td")) {
    if (cell.childElementCount < 2) {
      cell.ondblclick = () => editable.edit(cell);
    }
  }
});
var editable = {
  // (C) PROPERTIES
  selected: null, // current selected cell
  value: "", // current selected cell value

  // (D) "CONVERT" TO EDITABLE CELL
  edit: (cell) => {
    // (D2) EDITABLE CONTENT
    cell.contentEditable = true;
    cell.focus();

    // (D3) "MARK" CURRENT SELECTED CELL
    cell.classList.add("edit");
    editable.selected = cell;
    editable.value = cell.innerHTML;

    // (D4) PRESS ENTER/ESC OR CLICK OUTSIDE TO END EDIT
    window.addEventListener("click", editable.close);
    cell.onkeydown = (evt) => {
      if (evt.key == "Enter" || evt.key == "Escape") {
        editable.close(evt.key == "Enter" ? true : false);
        return false;
      }
    };
  },
  // (E) END "EDIT MODE"
  close: (evt) => {
    if (evt.target != editable.selected) {
      // (E1) CANCEL - RESTORE PREVIOUS VALUE (ESC OR CLICK OUTSIDE)
      if (evt === false) {
        editable.selected.innerHTML = editable.value;
      }
      // (E2) MAKE CURRENT CELL UNEDITABLE
      editable.selected.contentEditable = false;
      // (E3) REMOVE CLICK TO CLOSE LISTENER
      window.removeEventListener("click", editable.close);
      // (E4) RESET CURRENT SELECTED CELL'S TAG & UNMARK ALL SELECTED
      editable.selected.classList.remove("edit");
      editable.selected = null;
      editable.value = "";
    }
  },
};
