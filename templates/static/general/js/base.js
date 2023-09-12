
const toggleBtn = document.getElementById('btn');
var sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
});

function menuBtnChange() {
    
    if (sidebar.classList.contains("open")) {
        toggleBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
        toggleBtn.classList.remove("bx-menu-alt-right");
        toggleBtn.classList.add("bx-menu");
    }
}


const showButton = document.getElementById("btn");
const logoImage = document.getElementById("logoImage");

let imagemVisivel = false; 


showButton.addEventListener("click", function() {
    if (imagemVisivel) {
        
        logoImage.style.display = "none";
    } else {
       
        logoImage.style.display = "block";
    }
    
   
    imagemVisivel = !imagemVisivel;
});

