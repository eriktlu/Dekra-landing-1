let el = document.getElementsByClassName('wistia_responsive_padding')[0];
let elPaddingTop = window.getComputedStyle(el, null).getPropertyValue('padding-top');



// window.addEventListener('load', (event) => {
//     let x = document.getElementsByClassName('w-bpb-wrapper')[0]
//     console.log(x)
//     x.style.marginTop = Math.abs(parseInt(x.style.marginTop, 10)) + 'px'
// });

console.log(el.offsetHeight)

let newPadding = parseInt(elPaddingTop, 10) / 2;
if(newPadding > 337.5){
    newPadding = 337.5;
}

el.style.padding = newPadding + "px 0 0 0";

let headerWhite = document.getElementsByClassName('header-white')[0].style.marginTop = newPadding+20 + 'px';
console.log(newPadding)


// Carousel code -----------------

var previousButton, nextButton;
var slidesContainer, slides;
var leftMostSlideIndex = 0;
var slideGap = 20;
var z = 0
var xDown = null;                                                        
var yDown = null;

const windowSize = window.matchMedia("(max-width: 991px)");

window.addEventListener('DOMContentLoaded', function(e) {
    previousButton = document.querySelector('.previous');
    nextButton = document.querySelector('.next');
    slidesContainer = document.querySelector('.slides');
    slides = slidesContainer.querySelectorAll('.slide');

    // Set up previous/next button behaviors
    previousButton.addEventListener('click', previousSlide);
    nextButton.addEventListener('click', nextSlide);

    /*Swipe Control*/
    slidesContainer.addEventListener('touchstart', handleTouchStart, false);        
    slidesContainer.addEventListener('touchmove', handleTouchMove, false);

});

/** Go to previous slide */
function previousSlide() {
    if(leftMostSlideIndex > 0) {
        goToSlide(leftMostSlideIndex - 1);
    } else {
        if(windowSize.matches) {
            goToSlide(slides.length - 1);
        } else {
            goToSlide(slides.length - 3);
        }
        
    }
}

/** Go to next slide */
function nextSlide() {
    if(windowSize.matches) {
        z = 1
    } else {
        z = 3
    }
    if(leftMostSlideIndex < slides.length - z) {
        goToSlide(leftMostSlideIndex + 1);
    } else {
        goToSlide(0);
    }
}

/** Go to a specific slide */
function goToSlide(nextLeftMostSlideIndex) {
    // Scroll to the requested slide
    slidesContainer.style.left = '-' + (slides[0].offsetWidth + slideGap) *  nextLeftMostSlideIndex + 'px';

    // Update the record of the left-most slide
    leftMostSlideIndex = nextLeftMostSlideIndex;
}

function getTouches(evt) {
    return evt.touches 
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
}                      

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
			nextSlide()
        } else {
            /* right swipe */
			previousSlide()
        }                       
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}

// Carousel code end -----------------

// Reload page on resize
// This is due to the wistia video player

// window.onresize = function(){ location.reload(); }

// Overlay

const buttons = document.querySelectorAll('.btn');
const overlay =  document.getElementById('overlay');
const closeBtn = document.getElementById('formClose');
const body = document.querySelector('body');

buttons.forEach(el => el.addEventListener('click', event => {
    overlay.classList.add('dark-overlay');
    body.classList.add('stop-scroll');
}));

overlay.addEventListener('click', event => {
    if(event.target !== event.currentTarget) return;
    closeOverlay();
});

closeBtn.addEventListener('click', event => {
    closeOverlay();
});

function closeOverlay() {
    overlay.classList.remove('dark-overlay');
    body.classList.remove('stop-scroll');
}

var previousButton, nextButton, progressButton;
var formContainer, formPage;
var progressBar;
var errorBox;
var leftMostFormIndex = 0;
var pageGap = 50;

window.addEventListener('DOMContentLoaded', function(e) {
    nextButton = document.querySelectorAll('.overlay-next');
    previousButton = document.querySelectorAll('.overlay-previous');
    formContainer = document.querySelector('.form-container');
    formPage = formContainer.querySelectorAll('.form-page');
    progressBar = this.document.querySelectorAll('.progress-bar');
    errorBox = this.document.querySelectorAll('.error');


    // Set up previous/next button behaviors
    nextButton.forEach(el => el.addEventListener('click', event => {
        nextPage();
    }));

    previousButton.forEach(el => el.addEventListener('click', event => {
        previousPage();
    }));
});

function previousPage() {
    if(leftMostFormIndex > 1) {
        progressBar[leftMostFormIndex - 1].style.backgroundColor = 'var(--clr-secondary-100)'
        goToPage(leftMostFormIndex - 1);
    } else {
        return
    }
}

function nextPage() {
    if(leftMostFormIndex < formPage.length - 1) {
        if(leftMostFormIndex === 0) {
            document.getElementById('formProgress').style.visibility = 'visible';
        }
        progressBar[leftMostFormIndex].style.backgroundColor = 'var(--clr-secondary-1000)'
        goToPage(leftMostFormIndex + 1);
    } else {
        console.log('return')
        return;
    }
}

function goToPage(nextLeftMostFormIndex) {
    console.log('gotopage');
    // Scroll to the requested slide
    formContainer.style.left = '-' + (formPage[0].offsetWidth + pageGap) *  nextLeftMostFormIndex + 'px';

    var inputNodesOld = formPage[leftMostFormIndex].getElementsByTagName('input');
    var inputNodesNew = formPage[nextLeftMostFormIndex].getElementsByTagName('input');

    for (var i = 0; i < inputNodesOld.length; i++) {
        inputNodesOld[i].tabIndex = '-1';
    }

    for (var i = 0; i < inputNodesNew.length; i++) {
        inputNodesNew[i].tabIndex = '0';
    }
    // Update the record of the left-most slide
    leftMostFormIndex = nextLeftMostFormIndex;
}

window.addEventListener('DOMContentLoaded', function(e) {
    var nextButtons = document.querySelectorAll('.check');

    for(let i = 0; i < nextButtons.length; i++){
        nextButtons[i].onclick = function() {
            checkFields(leftMostFormIndex)
        }
    }
});

function checkFields(currentPage) {
    let allAreFilled = true;
    document.getElementsByClassName("form-page")[currentPage].querySelectorAll("[required]").forEach(function(i) {
        if (!allAreFilled) return;
        if (i.type === "radio") {
            let radioValueCheck = false;
            document.getElementsByClassName("form-page")[currentPage].querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
                if (r.checked) radioValueCheck = true;
            })
            allAreFilled = radioValueCheck;
            return;
        }
        if (!i.value) { 
            allAreFilled = false;  
            return; 
        }

        
    });
    if (!allAreFilled) {
        errorBox[currentPage-1].style.display = 'block';
    } else {
        errorBox[currentPage-1].style.display = 'none';
        nextPage(currentPage);
    }
}


const form = document.getElementById('course-signup')
const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)

form.addEventListener('submit', function(event) {
  event.preventDefault();

  document.getElementsByClassName('overlay-finish')[0].style.display = 'none';
  document.getElementById('loading').style.display = 'flex';

  setTimeout(submitForm, 500000);
  let formSubmitted = false;

  function submitForm() {
    if (!formSubmitted) {
        formSubmitted = true;
        sendWebhook();
        // form.submit();
        
    }
  }

  window.dataLayer.push({
      'event': 'Nyt lead',
      'leadId': id,
      'eventCallback': submitForm
  })
})

function sendWebhook() {
    fetch('https://webhook.site/3bef1258-5c53-4159-91bd-ca6659b78fe5', {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            queryString: window.location.q,
            landingPage: window.location.href,
            leadForm: 'version 0',
            name: document.getElementById('firstName').value + ' ' + document.getElementById('firstName').value,
            phone: document.getElementById('mobNumber').value,
            current_job_situation: document.querySelector('input[name="currentJob"]:checked').value,
            do_you_want_the_education: document.querySelector('input[name="considerTraining"]:checked').value,
            why: document.getElementById('why').value
        })
    })
    .then(response => {
        window.location.href = 'confirmation.html';
    })
    .catch(error => {
        console.error('Error:', error);
        window.location.href = 'confirmation.html';
    });

    // var http = new XMLHttpRequest();
    // var url = 'https://webhook.site/3bef1258-5c53-4159-91bd-ca6659b78fe5';
    // var content = {
    //     'first_name': document.getElementById('firstName').value,
    //     'phone': document.getElementById('mobNumber').value
    // }

    // http.open('POST', url, true);
    // http.setRequestHeader('Content-type', 'application/json');
    // http.onreadystatechange = function() {
    //     if(http.readyState == 4 && http.status == 200) {
    //         alert(http.responseText);
    //     }
    // }
    // http.send(JSON.stringify(content));

}


// const getButton = document.getElementById('btn');
//     const getFirstName = document.getElementById('first_name');
//     const getEmail = document.getElementById('email');
//     fetch('https://hooks.zapier.com/hooks/catch/12195186/bzjhk97/', {
//       method: 'POST',
//       body: new URLSearchParams({
//         first_name: getFirstName.value,
//         email: email.value
//       })
//     })
//     .then(response => {
        
//     });