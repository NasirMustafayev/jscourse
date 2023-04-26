'use strict';

//For test this code you need to do:
//Slow down your network speed from Dev tools
//Disable cache from Dev tools

const waitforasec = (sec) => new Promise((resolve) => setTimeout(resolve, sec * 1000))

const createImage = (imgpath) => {
    return new Promise((resolve, reject) => {
        const newimg = document.createElement("img");
        newimg.src = imgpath

        newimg.addEventListener("load", () => {
            document.querySelector(".images").appendChild(newimg);
            resolve(newimg)
        })

        newimg.addEventListener("error", () => {
            reject(new Error("There is a problem with loading image!"))
        })
    })
}

createImage('img/img-1.jpg')
    .then(response => response)
    .then((img) => {
        waitforasec(2).then(() => img.style.display = "none")
        return createImage("img/img-2.jpg")
    })
    .then(response => response)
    .then((img) => {
        waitforasec(2).then(() => img.style.display = "none")
        return createImage("img/img-3.jpg")
    })
    .then(response => response)
    .then((img) => {
        waitforasec(2).then(() => img.style.display = "none")
    })
    .catch(err => console.error(err))