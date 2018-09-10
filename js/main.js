window.onload = function () {

	var scrollBtn = document.querySelector('.scroll_btn'),
		mainMenu = document.querySelector('.main_menu'),
		skillsSection = document.querySelector('.sixth_section'),
		indicatLine = document.querySelectorAll('.indicator'),
		statSection = document.querySelector('.third'),
		numberState = document.querySelectorAll('.number_in'),
		paralax = document.querySelectorAll('.paralax'),
		btnTop = document.querySelectorAll('.btn_show .buttons'),
		sectionBanners = document.querySelector('.sec_first'),
		bannerTop = sectionBanners.getElementsByClassName('banners'),
		tweet = document.getElementsByClassName('tweet_item'),
		clients = document.querySelector('.clients'),
		customers = document.querySelector('.customer_row'),
		customer = customers.getElementsByClassName('customer'),
		btnCustom = document.querySelectorAll('.customers_box .fa'),
		client = clients.getElementsByClassName('clients_row'),
		bars = document.querySelector('.navbar_dubble'),
		navBar = document.querySelector('.navbar');

	var scrollWatch;
	var flag = 0;
	var flagTwo = 0;
	var step = 0;
	var progress = true;
	//var i = 0;
    //console.log(customer);

    bars.onclick = function(){						//появление и скрытие меню
    	navBar.classList.toggle('navbar_show');
    }

    var offsetCustom = function(){                  //центрирование блока с клиентами при изменении ширины экрана
		var customersWidth = customers.clientWidth;
		var windowWidth = document.body.clientWidth;
		if (customersWidth > windowWidth) {
			customers.style.left = (windowWidth - customersWidth) / 2 + 'px';
		} else{
			customers.style.left = 0 + 'px';
		}
	}

    window.onresize = function(){                 //центрирование при ресайзе страницы         
    	offsetCustom();
    	if (document.documentElement.clientWidth > 992) {
    		navBar.classList.remove('navbar_show');
    	}
    }

    offsetCustom();								  // цетрирование при перезагрузке страницы

    for (var i = 0; i < btnCustom.length; i++) {  // обработчек кнопок слайдера с клиентами
    	btnCustom[i].addEventListener('click', function(){
    		if (this == btnCustom[0]) {
    			getSlader(0, null, 3, 4);
    		} else {
    			getSlader(customer.length - 1, customer[0], 4, 3);
    		}
    		//console.log(this.className);	
    	});
    }

    function getSlader(el, elBefore, thisBig, nextBig){
    	var hendler = function(){
    		if (el == 0) {
				customers.removeChild(customer[el]);
			} else {
				customers.removeChild(customer[el + 1]);
			}
			customers.style.width = 990 + 'px';
			customers.style.left = 0;
			customers.classList.remove('fa-left-custom');
			customers.classList.remove('fa-right-custom');
			customers.removeEventListener('transitionend', hendler);
		}
		var newCustom = customer[el];
		var customerClon = newCustom.cloneNode(true);
		customers.style.width = 1103 + 'px';
		if (el != 0) {
			customers.style.left = -113 + 'px';
		}
		customers.insertBefore(customerClon, elBefore);
		raf(function(){
			if (el == 0) {
				customers.classList.add('fa-left-custom');
			} else {
				customers.classList.add('fa-right-custom');
			}
			customer[thisBig].classList.remove('front');
			customer[nextBig].classList.add('front');
		});
		customers.addEventListener('transitionend', hendler);
    }

	window.onscroll = function(){                 // отследивание прокручивания страницы
		var scrollWatch = window.pageYOffset;
		if (scrollWatch > 800){
			scrollBtn.style.opacity = 0.5;
			scrollBtn.onmouseover = function(){   //появление кнопки скролла
				scrollBtn.style.opacity = 1;
			}
			scrollBtn.onmouseout = function(){
				scrollBtn.style.opacity = 0.5;
			}
			mainMenu.style.position = 'fixed';    // фиксация главного меню вверху экрана
			mainMenu.style.top = 0;
			mainMenu.style.left = 0;
		} else{
			scrollBtn.style.opacity = 0;
			mainMenu.style.position = 'relative';
		}
		if (skillsSection.offsetTop < scrollWatch + screen.height / 2 && flag == 0) {
			getWidth();
			flag = 1;
		}
		if (statSection.offsetTop < scrollWatch + screen.height / 2 && flagTwo == 0) {
			for (var i = 0; i < numberState.length; i++) {
				getState(numberState[i]);
			}
		}
		for (var item in paralax){
			if (paralax[item].offsetTop < scrollWatch || paralax[item].offsetTop < scrollWatch + screen.height) {
				getParalax(paralax[item]);
			}
		}
	}

	function getWidth(){                                    // анимация индикаторов процентов (сдвиг вправо)
		for (var i = 0; i < indicatLine.length; i++) {
			var indicat = indicatLine[i];
			var widthPercent = parseInt(indicat.children[0].innerHTML);
			indicat.style.width = widthPercent + '%';
		}
	}

	function getState(el){                                 // анимация цифр при появлении блока
		var start = 0;
		var end = el.innerHTML;
		if (start < end) {
			var int = setInterval(function(){
				el.innerHTML = start;
				start += 1;
				if (start == end){
					clearInterval(int);
					el.innerHTML = end;
				}
			}, 1000 / end);
		}
		flagTwo = 1;
	}

	function getParalax(el){                // паралакс эффект фоновых фотографий
		scrollWatch = window.pageYOffset;
		if (el == paralax[0]) {
			el.style.backgroundPosition = '50% '+ (scrollWatch - el.offsetTop) * 0.07 +'%';
		} else {
			el.style.backgroundPosition = '50% '+ (scrollWatch - el.offsetTop) * 0.07 +'%';
		}
	}

	scrollBtn.addEventListener('click', function(e){
		scrollWatch = window.pageYOffset;
		getUp();
	});

	function getUp(){                      // функция скролла вверх при нажатии на кнопку
		if (scrollWatch > 0) {
			window.scrollTo(0, scrollWatch);
			scrollWatch -= 80;
			timer = setTimeout(getUp, 1);
		}
		else{
			clearTimeout(timer);
			window.scrollTo(0, 0);
		}		
	}

	var sliderLeft = new Slider(bannerTop, 1, 0, bannerTop.length - 1);
	var sliderRight = new Slider(bannerTop, -1, bannerTop.length - 1, 0);
	var tweetLeft = new Slider(tweet, 1, 0, tweet.length - 1);
	var tweetRight = new Slider(tweet, -1, tweet.length - 1, 0);

	document.querySelector('.btn_show .btn_right').onclick = function() {
		sliderRight.move();
	}
	document.querySelector('.btn_show .btn_left').onclick = function() {
		sliderLeft.move();
	}

	document.querySelector('.tweet_slider .fa-chevron-right').onclick = function() {
		tweetRight.move();
	}
	document.querySelector('.tweet_slider .fa-chevron-left').onclick = function() {
		tweetLeft.move();
	}		

 	function Slider(images, el, childFirst, childLast) {      // слайдер
		this.images = images;
		var step = 100;
		var i = 0;
		this.move = function() {
			var self = this;
			if (this.images[i] == this.images[childLast]) {
				var el2 = this.images[childFirst];
			} else{
				var el2 = this.images[i + 1 * el];
			}
			el2.classList.add('next');
			var el1 = this.images[i];
			if (step >= 0) {
				setTimeout(function(){
					el1.style.left = -100 * el + step * el + '%';
					el2.style.left = step * el + '%';
					step -= 1;
					self.move();
				}, 5);
			} else {
				el1.classList.remove('showed');
				el2.classList.remove('next');
				el2.classList.add('showed');
				i = i + 1 * el;
				step = 100;
			}			
			if (el == 1) {
				if (i > childLast) {
					i = childFirst;
				}	
			} else {
				if (i < childLast) {
					i = childFirst;
				}	
			}
		}	
	}

	function autoSlider(progress){               
		scrollWatch = window.pageYOffset;
		if (progress) {
			timer1 = setInterval(function(){sliderLeft.move()}, 3000);
		} else{
			clearInterval(timer1);
			i = 0;
		}                                                             //запуск слайдера в автоматическом режиме влево
	}

	autoSlider(progress);

	sectionBanners.addEventListener('mouseenter', function(){        //отмена автоматической прокрутки когда курсор в поле блока слайдера
		progress = false;
		autoSlider(progress);
	});

	// btnTop.addEventListener('mouseenter', function(){        //отмена автоматической прокрутки когда курсор в поле блока слайдера
	// 	progress = false;
	// 	autoSlider(progress);
	// });

	sectionBanners.addEventListener('mouseleave', function(){        //возобновление прокрутки когда курсор вышел из поля слайдера
		progress = true;
		autoSlider(progress);
	});

	// btnTop.addEventListener('mouseleave', function(){        //возобновление прокрутки когда курсор вышел из поля слайдера
	// 	progress = true;
	// 	autoSlider(progress);
	// });

	function getMove(el, child, elem){                     // слайдер партнеров
		var newClient = client[child];
		var clientClon = newClient.cloneNode(true);
		clients.style.left = step * el + '%';
		if (step <= 20) {
			setTimeout(function(){getMove(el, child, elem)}, 30);
			step += 1;
		} else{
			clients.removeChild(client[child]);
			clients.insertBefore(clientClon, elem);
			clients.style.left = 0;
			step = 0;
		}		
	}
	setInterval(function(){getMove(-1, 0, null)}, 3000);  // запуск автослайдера партнеров

	function raf(fn){
		window.requestAnimationFrame(function(){
			window.requestAnimationFrame(function(){
				fn();
			});
		});
	}	
	//setInterval(function(){sliderLeft.move()}, 3000);


	// for (var i = 0; i < btnTop.length; i++) {
	// 	btnTop[i].addEventListener('click', getBanner);
	// }

	// function getBanner(){
	// 	if (this == btnTop[0]) {
	// 		getMove(-1, 0, null);
	// 	} else{
	// 		getMove(1, bannerTop.length - 1, bannerTop[0]);
	// 	}
	// }

	// function getMove(el, child, elem){
	// 	var newBanner = bannerTop[child];
	// 	var bannerClon = newBanner.cloneNode(true);
	// 	sectionBanners.style.left = -100 + step * el + '%';
	// 	if (step <= 100) {
	// 		setTimeout(function(){getMove(el, child, elem)}, 5);
	// 		step += 1;
	// 	} else{
	// 		sectionBanners.removeChild(bannerTop[child]);
	// 		sectionBanners.insertBefore(bannerClon, elem);
	// 		sectionBanners.style.left = -100 + '%';
	// 		step = 0;
	// 	}
	// }

	// var timer = setInterval(function(){getMove(-1, 0, null)}, 3000);

	// sectionBanners.addEventListener('mouseenter', function(){
	// 	clearTimeout(timer);
	// });

	// sectionBanners.addEventListener('mouseleave', setInterval(function(){getMove(-1, 0, null)}, 3000));
	
}