import fetch from "node-fetch";
function getData() {
  fetch("https://jsonplaceholder.typicode.com/users", {
  method: "GET",
  headers: {

}
}).then(response => response.json().then(res => {return res})) }

async function syncData() {
  let promise = new Promise((resolve) => {
      resolve(fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
        headers: {
      
      }
      }).then(response => response.json().then(res => {return res})));
  });
  let data = await promise; 
  console.log(data);
  return data;
};
syncData()
