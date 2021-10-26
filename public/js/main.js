
 // autoSlide
 var autoslideIndex = 0;
 function autoslide() {
     var i;
     var autoslides = document.getElementsByClassName("Slides");
     for (i = 0; i < autoslides.length; i++) {
         autoslides[i].style.display = "none"
     }
     autoslideIndex++;
     if (autoslideIndex > autoslides.length) { autoslideIndex = 1 }
     autoslides[autoslideIndex - 1].style.display = "block";
     clr = setTimeout(autoslide, 3500);
 }
// const update = document.querySelector('#update')
// update.addEventListener('click', _ => {
//     // fetch(endpoint, options) -syntax of the fetch api
//     update.style="background-color:blue;"
//     console.log("working")
//     fetch('/quotes', {
//         method: 'put'
//       })
// })