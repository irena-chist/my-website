//hamburger

const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    menulink = document.querySelectorAll('.menu__link-a'),
    close = document.querySelector('.menu__close');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    close.addEventListener('click', () => {
        menu.classList.remove('active');
    });


menulink.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove('active');
    });
}); 


//skills

let percent = document.querySelectorAll('.use__skills-percent'),
    lines = document.querySelectorAll('.use__skills-lineorange');

percent.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});


//tabs

let info = document.querySelector('.content__header'),
    tabs = document.querySelectorAll('.content__tab'),
    content = document.querySelectorAll('.info-tabcontent');

function hideTabContent(a) {
    for (let i = a; i < content.length; i++) {
        content[i].classList.remove('show');
        content[i].classList.add('hide');
    }
}

hideTabContent(1);

function showTabContent(b) {
    if (content[b].classList.contains('hide')) {
        content[b].classList.add('show');
        content[b].classList.remove('hide');
    }
}

info.addEventListener('click', function (event) {
    if(event.target && event.target.classList.contains('content__tab')) {
        for(let i = 0; i < tabs.length; i++) {
            if (event.target == tabs[i]) {
                hideTabContent(0);
                showTabContent(i);
                break;
            }
        }
    }
});


//timer

let deadline = '2021-07-31';

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
    seconds = Math.floor((t/1000) % 60),
    minutes = Math.floor((t/1000/60) % 60),
    hours = Math.floor((t/(1000*60*60) % 24)),
    days = Math.floor((t/(1000*60*60*24)));

    return {
        'total' : t,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    };
}

function setClock(id, endtime) {
    let timer = document.getElementById(id),
        days =  timer.querySelector('.days'),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);
        
    function updateClock() {
        let t = getTimeRemaining(endtime);

        function addZero(num){
            if(num <= 9) {
                return '0' + num;
            } else return num;
        };

        days.textContent = addZero(t.days);
        hours.textContent = addZero(t.hours);
        minutes.textContent = addZero(t.minutes);
        seconds.textContent = addZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
        }
    }
}
setClock('timer', deadline);


//slider

const slider = tns({
    container: '.use__wrapper',
    items: 4,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    center: true,
    speed: 1000,
    nav: false
});
document.querySelector('.use__left').addEventListener('click', function () {

        slider.goTo('prev');
    }); 
document.querySelector('.use__right').addEventListener('click', function () {
    slider.goTo('next');
}); 


//modal

function bindModal(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelectorAll(closeSelector),
        close2 = document.querySelectorAll('.overlay__close2');


    trigger.forEach(item => {
        item.addEventListener('click', (e) => {
            if(e.target) {
                e.preventDefault();
            }
            modal.style.display='block';
            document.body.style.overflow = 'hidden';
        });
    });

    close.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display='none';
            document.body.style.overflow = '';
        });
    });

    close2.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display='none';
            document.body.style.overflow = '';
        });
    });

}
bindModal('.more', '.overlay', '.overlay__popup-close');
bindModal('.info-yes', '.yes', '.overlay__popup-close-min');
bindModal('.info-no', '.no', '.close-min');
bindModal('.portfolio__wrapper', '.error', '.close-error');



//my works

/* function removeError() {
    let wrapper = document.querySelector('.portfolio__wrapper'),
    error = document.querySelector('.error'),   
    works = wrapper.getElementsByTagName('a');

    wrapper.addEventListener('click', function (event) {
        event.preventDefault();
        error.style.display='block';
    });

}
removeError(); */

//hide slidepanel

function showSmth(smth, height) {
    let panel  = document.querySelector(smth);

    function hideSlidepanel() {
        if(window.pageYOffset > height) {
            panel.style.opacity = '1';
        } else {
            panel.style.opacity = '0';
        }
    }
    
    window.onscroll = hideSlidepanel;
}
showSmth('.sidepanel', 700);
//showSmth('.pageup', 1000);

//smooth scrolling
$(function(){
    $("a[href^='#']").click(function(){
            var _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
    });  
});

//ToDo List

//let todo = document.querySelectorAll('.todo__item');


//form

let phoneInputs = document.querySelectorAll('input[name="phone"]');

phoneInputs.forEach(item => {
    item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/, '');
    });
});

$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'mailer/smart.php',
        data: $(this).serialize()
    }).done(function() {
        $(this).find('input').val('');
        $(".contacts__message").text("Спасибо! Скоро я с Вами свяжусь!");
        $('.phone__message').text("Спасибо! Я Вам обязательно перезвоню!");

        $('form').trigger('reset');
        setTimeout(fade_out, 5000);

        function fade_out() {
        $(".phone__message").fadeOut().empty();
        $(".contacts__message").fadeOut().empty();
        }
    });
    return false;
});

/* let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро я с Вами свяжусь!',
    failure: 'Что-то пошло не так...'
};

let form = document.querySelector('.contacts__form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'mailer/smart.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let formData = new FormData(form);

    let obj = {};
    formData.forEach(function(value, key) {
        obj[key] = value;
    });
    let json = JSON.stringify(obj);

    request.send(json);

    console.log(obj);

    request.addEventListener('readystatechange', function() {
        if (request.readyState < 4) {
            statusMessage.innerHTML = message.loading;
        } else if(request.readyState === 4 && request.status == 200) {
            statusMessage.innerHTML = message.success;
        } else {
            statusMessage.innerHTML = message.failure;
        }
    });

    
    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }
}); */
