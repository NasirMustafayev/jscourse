'use strict'

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

// createImage('img/img-1.jpg')
//     .then(response => response)
//     .then((img) => {
//         waitforasec(2).then(() => img.style.display = "none")
//         return createImage("img/img-2.jpg")
//     })
//     .then(response => response)
//     .then((img) => {
//         waitforasec(2).then(() => img.style.display = "none")
//         return createImage("img/img-3.jpg")
//     })
//     .then(response => response)
//     .then((img) => {
//         waitforasec(2).then(() => img.style.display = "none")
//     })
//     .catch(err => console.error(err))

const loadNPause = async () => {
    try {
        const img1 = await createImage('img/img-1.jpg');
        await waitforasec(2)
        img1.style.display = "none";

        const img2 = await createImage('img/img-2.jpg');
        await waitforasec(2)
        img2.style.display = "none";

        const img3 = await createImage('img/img-3.jpg');
        await waitforasec(2)
        img3.style.display = "none";
    } catch (err) {
        console.error(err);

    }
}

// loadNPause();


const loadAll = async (imgArr) => {
    try {
        const imgs = imgArr.map(async img => await createImage(img));
        console.log(imgs);

        const imgsEl = await Promise.all(imgs)
        console.log(imgsEl);

        imgsEl.forEach(imgEl => imgEl.classList.add("parallel"))

    } catch (err) {
        console.error(err)
    }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
