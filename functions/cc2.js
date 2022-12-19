//Why its work? is not IIFE disappeard from Call Stack after calling one time? It is!
//But we learn that with Closures, functions still can access to Variable Enviroment.
//Thats why we still can access "header" variable and not defining this "h1" elemetn again

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
