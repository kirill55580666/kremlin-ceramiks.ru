// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import '~/app/libs/parallax.js-master/parallax.js-master/parallax.min.js'
import '~/app/libs/SmartPhoto/smartphoto.min.js'

import MicroModal from 'micromodal'

document.addEventListener('DOMContentLoaded', () => {

	$('.about').parallax({
		imageSrc: '../images/dist/hands-throwing-pottery.jpg',
	});

	var photoGallery = new SmartPhoto(".js-smartPhoto", {
		useOrientationApi: false,
		
	});

	MicroModal.init({
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableFocus: true,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true,
	})

  const NodeSuccess = document.querySelector('.success');

  function successShow() {
    NodeSuccess.style.display = 'block';
  }

	$("form").on("submit", function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			setTimeout(function() {
        successShow();
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

  //selfmade burger

  const PAGE_BURGER_OPENED = 'burger-opened';

  const bodyNode = document.querySelector('body');
  const burgerControlNode = document.querySelector('.burger-menu__controls');
  const toplineControlNode = document.querySelector('.top-line__controls');
  const burgerSpaceCoverNode = document.querySelector('.space-cover');

  [burgerControlNode, toplineControlNode].forEach((item) => {
    item.addEventListener('click', (_event) => {

      if (bodyNode.classList.contains(PAGE_BURGER_OPENED)) {
        bodyNode.classList.remove(PAGE_BURGER_OPENED);
      } else {
        bodyNode.classList.add(PAGE_BURGER_OPENED);
      }
    });
  })

  burgerSpaceCoverNode.addEventListener('click', () => {
    bodyNode.classList.remove(PAGE_BURGER_OPENED);
  });

  const ScrolledHomepageClassName = 'scrolled'

  window.addEventListener('scroll', (event)=> {
    if(
      window.scrollY > window.innerHeight &&
      !bodyNode.classList.contains(ScrolledHomepageClassName)
    ) {
      bodyNode.classList.add(ScrolledHomepageClassName);
    } else if ( 
      window.scrollY <= window.innerHeight &&
      bodyNode.classList.contains(ScrolledHomepageClassName)
    ) {
      bodyNode.classList.remove(ScrolledHomepageClassName);
    } 
  });



  //Bruger Scroll Animation//
  let currentScroll = window.scrollY;
  let scrollAnimationId;

  const scrollDownButtonMain = document.getElementById('scroll-to-main');
  const scrollDownButtonMain_Footer = document.getElementById('scroll-to-main-footer');
  const scrollToNodeMain = document.getElementById('main');

  const scrollDownButtonPrices = document.getElementById('scroll-to-prices');
  const scrollDownButtonPrices_Footer = document.getElementById('scroll-to-prices-footer');
  const scrollToNodePrices = document.getElementById('prices');

  const scrollDownButtonFooter = document.getElementById('scroll-to-footer');
  const scrollDownButtonFooter_Footer = document.getElementById('scroll-to-footer-footer');
  const scrollToNodeFooter = document.getElementById('footer');

  function scrollObject(button, node) {
    this.button = button;
    this.node = node;
  }
   
  const mainScrollObject = new scrollObject(scrollDownButtonMain, scrollToNodeMain);
  const mainPricesObject = new scrollObject(scrollDownButtonPrices, scrollToNodePrices);
  const mainFooterObject = new scrollObject(scrollDownButtonFooter, scrollToNodeFooter);

  const mainScrollObject_Footer = new scrollObject(scrollDownButtonMain_Footer, scrollToNodeMain);
  const mainPricesObject_Footer = new scrollObject(scrollDownButtonPrices_Footer, scrollToNodePrices);
  const mainFooterObject_Footer = new scrollObject(scrollDownButtonFooter_Footer, scrollToNodeFooter);

  let arrScrollObjects = [mainScrollObject, mainPricesObject, mainFooterObject, mainScrollObject_Footer, mainPricesObject_Footer, mainFooterObject_Footer];

  arrScrollObjects.forEach((item) => {
    item.button.addEventListener('click', (event) => {
    event.preventDefault();

    stopAnimationScroll();
    currentScroll = window.scrollY;
    bodyNode.classList.remove(PAGE_BURGER_OPENED);

    startAnimationScroll(item.node.offsetTop);
  });
  });



  function startAnimationScroll(newScrollY) {
    //bodyNode.classList.remove(PAGE_BURGER_OPENED);
    const deltaScroll = (newScrollY - currentScroll);

    console.log(deltaScroll);
    
    currentScroll += deltaScroll * 0.7;
    window.scrollTo(0, currentScroll);

    if(Math.abs(deltaScroll) > 1) {
      scrollAnimationId = window.requestAnimationFrame(
        () => startAnimationScroll(newScrollY)
      );
    } else {
      window.scrollTo(0, newScrollY);
      stopAnimationScroll();
    }
  }

  function stopAnimationScroll() {
    window.cancelAnimationFrame(scrollAnimationId);
    scrollAnimationId = undefined;
  }

  //
  //** add/del active link

  const linkActiveClassName = 'main__link_active'

  window.addEventListener('scroll', (event) => {
    if(window.scrollY >= mainFooterObject.node.offsetTop && 
      !mainFooterObject.button.classList.contains(linkActiveClassName)) 
    {
      mainScrollObject.button.classList.remove(linkActiveClassName);
      mainPricesObject.button.classList.remove(linkActiveClassName);
      mainFooterObject.button.classList.add(linkActiveClassName);
    } else if(window.scrollY >= mainPricesObject.node.offsetTop )//&&
      //!mainPricesObject.button.classList.contains(linkActiveClassName))
    {
      mainScrollObject.button.classList.remove(linkActiveClassName);
      mainFooterObject.button.classList.remove(linkActiveClassName);
      mainPricesObject.button.classList.add(linkActiveClassName);
    } else if(window.scrollY >= mainScrollObject.node.offsetTop &&
      !mainScrollObject.button.classList.contains(linkActiveClassName)) 
    {
      mainFooterObject.button.classList.remove(linkActiveClassName);
      mainPricesObject.button.classList.remove(linkActiveClassName);
      mainScrollObject.button.classList.add(linkActiveClassName);
    }
  });
})