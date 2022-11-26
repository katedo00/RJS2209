const imgPaths = ["img/img1.jpg", "img/img2.png", "img/img3.png"]
var currentIndex = 1;
var slides = document.getElementsByClassName("imageSlides");
displaySlides(currentIndex);
function displaySlides(num) {
    var x;
    if (num > slides.length) { currentIndex = 1 }
    else if (num < 1) { currentIndex = slides.length };
    for (x = 0; x < slides.length; x++) {
        slides[x].style.display = "none";
    }
    slides[currentIndex - 1].style.display = "block";
    slides[currentIndex - 1].getElementsByTagName('img')[0].src = imgPaths[currentIndex-1];
};
function setSlides(num) {
    displaySlides(currentIndex += num);
};