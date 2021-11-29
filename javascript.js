const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*=============== TYPE WRITING EFFECT ===============*/
class TypeWriter {
    constructor(txtElement, words, wait = 1000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];

      if(this.isDeleting) {
    
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  

      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
    
      let typeSpeed = 200;
  
      if(this.isDeleting) {
        typeSpeed /= 2;
      }
  
    
      if(!this.isDeleting && this.txt === fullTxt) {
       
        typeSpeed = this.wait;
     
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
       
        this.wordIndex++;
       
        typeSpeed = 600;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  

  document.addEventListener('DOMContentLoaded', init);
  
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
   
    new TypeWriter(txtElement, words, wait);
  }

  /*=============== COLLAPSIBLES ===============*/
  var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

var experience = document.querySelector(".experience");

fetch("./experience.json")
    .then((res)=>{return res.json()})
    .then((data)=>{
        data.map((item)=>{
            experience.innerHTML +=  '    <div class= "exp-main"><div class= "exp-num">'+item.id+'</div><div class="exp-details"><div class= "exp-title">'+item.title+'</div><div class="exp-subtitle">'+item.subtitle+' <br> '+item.break+'</div><div class= "exp-des">'+item.info+'</div></div></div>';
        })
    })


    var skill = document.querySelector(".division");
var style= document.createElement("style")



fetch("./skill.json")
    .then((res)=>{return res.json()})
    .then((data)=>{
        data.map((item)=>{
        style.innerHTML+='.skill-bars .bar .'+item.custom_class+' {width: '+item.per_num+'; height: 10px;background: #652cdf;position: relative;transform: scaleX(0);transform-origin: left;border-radius: 0 10px 10px 0;box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05), 0 1px #652cdf;-webkit-animation: animate 1s cubic-bezier(1, 0, 0.5, 1) forwards;animation: animate 1s cubic-bezier(1, 0, 0.5, 1) forwards;}'

            skill.innerHTML +=  '<div class="bar" data-aos="flip-left"><div class="info"><span>'+item.title+'</span><div class="percent-number">'+item.per_num+'</div></div><div class="percent-bar"><div class='+item.custom_class+'></div></div></div>';
        })
        // style.type='text/css';
        document.head.appendChild(style);
        
    })


