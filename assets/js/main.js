const select = document.querySelector('#options_here');

if (select) {
  const options = select.querySelectorAll('option');
  options.forEach((e) => {
    if (e.value == location.href) e.setAttribute('selected', 'selected');
  });
  select.addEventListener('change', function () {
    location.href = this.value;
  });
}

const navBurger = document.querySelector('.header__navigation');
if (navBurger) {
  const ul = navBurger.querySelector('.burger_menu');
  navBurger.addEventListener('click', function (e) {
    if (document.body.clientWidth < 768 && e.target.nodeName.toLowerCase() == 'nav') {
      ul.classList.toggle('active');
    }
  });

  ul.childNodes.forEach((e) => {
    if (e.nodeName && e.nodeName.toLowerCase() == 'li') {
      const submenu = e.querySelector('.sub-menu');
      if (submenu) {
        let inner = e.innerHTML;
        e.innerHTML += ' <i class="fas fa-chevron-down"></i>';
        e.addEventListener('click', function () {
          e.querySelector('.sub-menu').classList.toggle('active');
        });
      }
    }
  });
}

if (document.querySelector('.header-swiper-container')) {
  const swiper = new Swiper('.header-swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop:
      document.querySelector('.header-swiper-container').querySelectorAll('.swiper-slide').length >
      1,
    //autoplay: true,
    speed: 400,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
  });
}

if (document.querySelector('.overraching-swiper-container')) {
  const swiper1 = new Swiper('.overraching-swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 400,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
  });
}

if (document.querySelector('.gallery-swiper-container')) {
  const bodyWidth = document.body.clientWidth;
  const minusCount =
    bodyWidth < 480 ? 4 : bodyWidth < 540 ? 3 : bodyWidth < 768 ? 2 : bodyWidth < 920 ? 1 : 0;
  const slidesCount = document
    .querySelector('.gallery_logos-swiper-container')
    .querySelectorAll('.swiper-slide').length;
  const slidesPreviwCount = slidesCount < 5 ? slidesCount - minusCount : 5 - minusCount;
  const swiper2 = new Swiper('.gallery-swiper-container', {
    // Optional parameters
    //direction: 'horizontal',
    loop: true,
    speed: 400,
    slidesPerView: slidesPreviwCount,
    spaceBetween: 30,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  $('[data-fancybox="gallery"]').fancybox();
}

if (document.querySelector('.gallery_logos-swiper-container')) {
  const bodyWidth = document.body.clientWidth;
  const minusCount =
    bodyWidth < 480 ? 5 : bodyWidth < 540 ? 4 : bodyWidth < 768 ? 2 : bodyWidth < 920 ? 1 : 0;
  const slidesCount = document
    .querySelector('.gallery_logos-swiper-container')
    .querySelectorAll('.swiper-slide').length;
  const slidesPreviwCount = slidesCount < 6 ? slidesCount - minusCount : 6 - minusCount;
  new Swiper('.gallery_logos-swiper-container', {
    // Optional parameters
    //direction: 'horizontal',
    loop: true,
    speed: 400,
    slidesPerView: slidesPreviwCount,
    spaceBetween: 30,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

const mapSelect = document.getElementById('map_select');
if (mapSelect) {
  const resError = document.querySelector('.map_res_block_error');
  resError.style = 'display: none';
  const paths = document.querySelectorAll('.sel_path');
  mapSelect.addEventListener('change', function (e) {
    coloredPath(paths, this.value);
    selectMapResBlock(this.value, resError);
  });

  paths.forEach((p, i, arr) => {
    p.addEventListener('click', function (e) {
      coloredPath(arr, this.getAttribute('data-id'));
      selectMapResBlock(this.getAttribute('data-id'), resError);
      mapSelect.value = this.getAttribute('data-id');
    });
  });
}

function selectMapResBlock(value, error) {
  const resBlocks = document.querySelectorAll('.map_res_block');
  if (resBlocks) {
    const checkError = [];
    resBlocks.forEach((e) => (e.style = 'display: none;'));
    resBlocks.forEach((e) => {
      if (value == 0) e.style = 'display: block;';
      else if (value == e.getAttribute('data-result')) {
        e.style = 'display: block;';
        checkError.push(e);
      } else {
        e.style = 'display: none;';
      }
    });
    error.querySelector('h3').innerHTML = value
    error.style = checkError.length > 0 || value == 0 ? 'display: none;' : 'display: block;';
  }
}

function coloredPath(paths, value) {
  paths.forEach((p) => {
    p.classList.remove('st1');
    p.classList.add('st2');
    if (value == p.getAttribute('data-id')) {
      p.classList.remove('st2');
      p.classList.add('st1');
    }
  });
}

const waves = document.querySelectorAll('.wave');
if (waves) {
  waves.forEach((e) => {
    e.setAttribute('viewBox', '0 0 2200 70');
    e.setAttribute('preserveAspectRatio', 'none');
  });
}

const fWaves = document.querySelector('footer').querySelectorAll('.wave');
if (fWaves) {
  fWaves[0].setAttribute('viewBox', '0 0 2200 100');
}

const accordion = document.querySelectorAll('.download_section');
if (accordion) {
  //there will be one accordion, but just in case I added a loop, suddenly there will be several
  const icons = {
    pdf: '<i class="far fa-file-pdf"></i>',
    excel: '<i class="far fa-file-excel"></i>',
    powerpoint: '<i class="far fa-file-powerpoint"></i>',
    word: '<i class="far fa-file-word"></i>',
    file: '<i class="fas fa-file-download"></i>',
  };
  accordion.forEach((ac) => {
    const links = ac.querySelectorAll('a');
    links.forEach((l) => {
      if (l.hasAttribute('data-file-type')) {
        l.innerHTML = icons[l.getAttribute('data-file-type')] + ' &nbsp; ' + l.innerHTML;
      }
    });
  });
}
