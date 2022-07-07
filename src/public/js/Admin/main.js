let body = document.querySelector('body');
let navBar = document.querySelector('nav');
let navOptions = document.querySelectorAll('.option img');
let targetSpan = navBar.querySelector('.targetStyles');
let mainSections = document.querySelectorAll('section');
let main = document.querySelector('main');
let loader = document.getElementById('loader');
let loader_users = document.getElementById('loader_users');
/* let prevElementClicked = 0; */
let posElementClicked = 0;

addEventListener('load', () => {
  navInSections();
  headerFunctionalities();
  homeHeaderCards();
  crearGrafico();
  makeScrollableElements();
});

function navInSections() {
  let fEjecutadaData = false;
  let fEjecutadaUsers = false;
  let mainSectionsX = [];

  mainSections.forEach((section, index) => {
    mainSectionsX[index] = section.offsetLeft;
  });

  if (localStorage.getItem('posElementClicked')) {
    /* let localStorageKeys = Object.keys(localStorage)
    let lsItems = []
    for (let i = 0; i < localStorageKeys.length; i++) {

      lsItems.push({
        key: localStorageKeys[i],
        value: localStorage.getItem(localStorageKeys[i]),
      })
    } */

    posElementClicked = localStorage.getItem('posElementClicked');
    moverMainScroll({ focusAnimation: false });
    moverTargetSpan(posElementClicked);
    consultasADb(posElementClicked);
    ocultarNavBar(true);
  }

  navBar.addEventListener(
    'click',
    e => {
      let posNavOpt = [...navOptions].indexOf(e.target);
      if (mainSectionsX[posNavOpt] !== undefined && posNavOpt >= 0) {
        posElementClicked = posNavOpt;
        localStorage.setItem('posElementClicked', posElementClicked);

        moverMainScroll({ focusAnimation: true });
        moverTargetSpan(posElementClicked);
        consultasADb(posElementClicked);
      }
    },
    { passive: true }
  );

  navBar.addEventListener('mouseenter', () => {
    ocultarNavBar(false);

    navBar.addEventListener('mouseleave', () => {
      setTimeout(() => {
        ocultarNavBar(true);
      }, 3000);
    });
  });

  addEventListener(
    'keydown',
    e => {
      let auxEleClicked = posElementClicked;
      if (e.key > 0 && e.key < mainSectionsX.length + 1 && e.altKey) {
        posElementClicked = e.key - 1;

        if (mainSectionsX[posElementClicked] !== undefined && posElementClicked >= 0) {
          localStorage.setItem('posElementClicked', posElementClicked);
          moverMainScroll({ focusAnimation: true });
          moverTargetSpan(posElementClicked);
          consultasADb(posElementClicked);
        } else {
          posElementClicked = auxEleClicked;
        }
      }
    },
    { passive: true }
  );

  new ResizeObserver(() => {
    mainSections.forEach((section, index) => {
      mainSectionsX[index] = section.offsetLeft;
    });
    moverMainScroll({ focusAnimation: false, up: false });
    moverTargetSpan(posElementClicked);
  }).observe(body);

  function ocultarNavBar(active) {
    if (active) {
      setTimeout(() => {
        navBar.classList.add('navHidden');
      }, 1000);
    } else {
      navBar.classList.remove('navHidden');
    }
  }

  function moverMainScroll({ focusAnimation, up }) {
    if (focusAnimation == true) {
      main.classList.add('section_focus_change');
      setTimeout(() => {
        main.classList.remove('section_focus_change');
      }, 500);
    }

    /* prevElementClicked = posElementClicked; */
    main.scrollLeft = mainSectionsX[posElementClicked];
    if (up != false) window.scrollTo({ top: 0 });
  }

  function moverTargetSpan(posicion) {
    navOptions.forEach((option, index) => {
      if (index == posicion) option.parentNode.classList.add('option_active');
      else option.parentNode.classList.remove('option_active');
    });

    targetSpan.style.left = `${targetSpan.clientWidth * posicion}px`;
    targetSpan.classList.add('targetOnMove');
    setTimeout(() => {
      targetSpan.classList.remove('targetOnMove');
    }, 500);
  }

  function consultasADb(posicion) {
    if (posicion == 1) {
      if (!fEjecutadaUsers) {
        loader_users.classList.add('loader');
        consultarUsuarios();
        fEjecutadaUsers = true;
      }
    }

    if (posicion == 2) {
      if (!fEjecutadaData) {
        loader.classList.add('loader');
        consultarActores();
        consultarDirectores();
        consultarEstadisticas();
        consultarGeneros();
        consultarPeliculas();
        //se desactiva el loader desde una de las funciones
        fEjecutadaData = true;
      }
    }
  }
}

function headerFunctionalities() {
  let buttonUp = document.getElementById('button_up');

  window.addEventListener(
    'scroll',
    () => {
      if (document.documentElement.scrollTop >= 50) {
        buttonUp.classList.add('button_up_active');
      } else {
        buttonUp.classList.remove('button_up_active');
      }
    },
    { passive: true }
  );

  buttonUp.addEventListener(
    'click',
    () => {
      window.scrollTo({
        top: 0,
      });
    },
    { passive: true }
  );
}

function crearGrafico() {
  let grafico = {
    contenedor: 'grafico',
    labels: ['Usuarios'],
    parametros: ['En linea', 'Registrados', 'No registrados', 'Pendientes', 'Semi-Registrados'],
    valores: [[2850, 3000, 2900, 3160, 3109]],
  };
  renderGrafico({ ...grafico });

  function renderGrafico({ contenedor, labels, parametros, valores }) {
    let canvasGrafico = document.getElementById(contenedor);
    // eslint-disable-next-line no-undef
    new Chart(canvasGrafico, {
      type: 'line',
      data: {
        labels: parametros,
        datasets: [
          {
            label: labels[0],
            data: valores[0],
            backgroundColor: ['#0069bd', 'lightgreen', 'red'],
          },
        ],
      },
      responsive: true,
    });
  }
}

function homeHeaderCards() {
  let contentsCard = [
    {
      id: 'InLine',
      icon: 'person',
      bodyElements: [
        {
          number: 890,
          name: 'En Linea 🔵',
        },
      ],
    },
    {
      id: 'Registered',
      icon: 'done',
      bodyElements: [
        {
          number: 578,
          name: 'Registrados 🟢',
        },
      ],
    },
    {
      id: 'Unregistered',
      icon: 'clear',
      bodyElements: [
        {
          number: 300,
          name: 'No Registrados 🔴',
        },
      ],
    },
  ];

  // eslint-disable-next-line no-undef
  new HeaderCards('homeCards', contentsCard[0]);
  // eslint-disable-next-line no-undef
  new HeaderCards('homeCards', contentsCard[1]);
  // eslint-disable-next-line no-undef
  new HeaderCards('homeCards', contentsCard[2]);
}

function makeScrollableElements() {
  let ovContainers = document.querySelectorAll('.overflowable_container');
  ovContainers.forEach(ovContainer => {
    let firstChild = ovContainer.firstElementChild;
    isScrollableElement(ovContainer, firstChild);
  });
}

function isScrollableElement(elementParent, overflowElement) {
  let wOverflowElement = overflowElement.offsetWidth;
  let wElementParent = elementParent.offsetWidth;
  let minRange = overflowElement.offsetWidth - overflowElement.offsetWidth * 0.01;
  let maxRange = overflowElement.offsetWidth + overflowElement.offsetWidth * 0.01;

  let buttonLeft = document.createElement('div');
  let buttonRight = document.createElement('div');

  buttonLeft.classList.add('button_left');
  buttonLeft.classList.add('scrollButtons');

  buttonRight.classList.add('button_right');
  buttonRight.classList.add('scrollButtons');

  buttonLeft.innerHTML = `
        <span class="material-icons-round">navigate_before</span>`;
  buttonLeft.addEventListener(
    'click',
    () => {
      elementParent.scrollLeft -= 300;
    },
    { passive: true }
  );

  buttonRight.innerHTML = `
        <span class="material-icons-round">navigate_next</span>`;
  buttonRight.addEventListener(
    'click',
    () => {
      elementParent.scrollLeft += 300;
    },
    { passive: true }
  );

  elementParent.parentNode.append(buttonLeft, buttonRight);

  function isVisibilyScrollButtons() {
    if (wOverflowElement > wElementParent) {
      elementParent.addEventListener('wheel', e => {
        e.preventDefault();
        elementParent.scrollLeft += e.deltaY / 2;
      });

      if (elementParent.scrollLeft > 1) {
        buttonLeft.style.transform = 'scaleX(1)';
      } else {
        buttonLeft.style.transform = 'scaleX(0)';
      }

      let scrollRelation = wElementParent + elementParent.scrollLeft;
      if (scrollRelation > minRange && scrollRelation < maxRange) {
        buttonRight.style.transform = 'scaleX(0)';
      } else {
        buttonRight.style.transform = 'scaleX(1)';
      }
    } else {
      buttonLeft.style.transform = 'scaleX(0)';
      buttonRight.style.transform = 'scaleX(0)';
    }
  }

  elementParent.addEventListener(
    'scroll',
    () => {
      isVisibilyScrollButtons();
    },
    { passive: true }
  );

  addEventListener(
    'resize',
    () => {
      wOverflowElement = overflowElement.offsetWidth;
      wElementParent = elementParent.offsetWidth;
      minRange = overflowElement.offsetWidth - overflowElement.offsetWidth * 0.01;
      maxRange = overflowElement.offsetWidth + overflowElement.offsetWidth * 0.01;
      isVisibilyScrollButtons();
    },
    { passive: true }
  );

  new ResizeObserver(() => {
    wOverflowElement = overflowElement.offsetWidth;
    wElementParent = elementParent.offsetWidth;
    minRange = overflowElement.offsetWidth - overflowElement.offsetWidth * 0.01;
    maxRange = overflowElement.offsetWidth + overflowElement.offsetWidth * 0.01;
    isVisibilyScrollButtons();
  }).observe(overflowElement);
}

/* -------------Consultas a db-------------- */
//variables
const requestRoutes = {
  actor: '/Actores/',
  director: '/Directores/',
  estadisticas: '/Estadisticas/',
  genero: '/Generos/',
  pelicula: '/Peliculas/',
  usuario: '/Usuarios/',
};

// !Consultar peliculas
async function consultarPeliculas() {
  let contents = {
    name: 'pelicula',
    titulo: 'peliculas',
    titleIcon: 'movie',
    requestRoutes: requestRoutes,
  };

  // eslint-disable-next-line no-undef
  let tPeliculas = new DataTable('.data', contents);
  let { rows } = await tPeliculas.tableRequest();

  if (rows.length > 0) {
    let contentsCard = {
      id: 'Peliculas',
      icon: 'movie',
      bodyElements: [
        {
          number: rows.length,
          name: 'Peliculas',
        },
      ],
    };

    // eslint-disable-next-line no-undef
    new HeaderCards('chi2', contentsCard);
  }

  loader.classList.remove('loader');
}

// !Consultar estadisticas
async function consultarEstadisticas() {
  let contents = {
    name: 'estadisticas',
    titulo: 'estadisticas',
    titleIcon: 'bar_chart',
    requestRoutes: requestRoutes,
  };

  // eslint-disable-next-line no-undef
  let tEstadisticas = new DataTable('.data', contents);
  let { rows } = await tEstadisticas.tableRequest();

  if (rows.length > 0) {
    let contentsCard = {
      id: 'Estadisticas',
      icon: 'bar_chart',
      bodyElements: [
        {
          number: rows.length,
          name: 'Estadisticas',
        },
      ],
    };

    // eslint-disable-next-line no-undef
    new HeaderCards('chi2', contentsCard);
  }

  loader.classList.remove('loader');
}

// !Consultar actores
async function consultarActores() {
  let contents = {
    name: 'actor',
    titulo: 'actores',
    titleIcon: 'groups',
    requestRoutes: requestRoutes,
  };

  // eslint-disable-next-line no-undef
  let tActores = new DataTable('.data', contents);
  let { rows } = await tActores.tableRequest();

  if (rows.length > 0) {
    let contentsCard = {
      id: 'Actores',
      icon: 'groups',
      bodyElements: [
        {
          number: rows.length,
          name: 'Actores',
        },
      ],
    };

    // eslint-disable-next-line no-undef
    new HeaderCards('chi2', contentsCard);
  }

  loader.classList.remove('loader');
}

// !Consultar directores
async function consultarDirectores() {
  let contents = {
    name: 'director',
    titulo: 'directores',
    titleIcon: 'people',
    requestRoutes: requestRoutes,
  };

  // eslint-disable-next-line no-undef
  let tDirectores = new DataTable('.data', contents);
  let { rows } = await tDirectores.tableRequest();

  if (rows.length > 0) {
    let contentsCard = {
      id: 'Directores',
      icon: 'people',
      bodyElements: [
        {
          number: rows.length,
          name: 'Directores',
        },
      ],
    };

    // eslint-disable-next-line no-undef
    new HeaderCards('chi2', contentsCard);
  }

  loader.classList.remove('loader');
}

// !Consultar generos
async function consultarGeneros() {
  let contents = {
    name: 'genero',
    titulo: 'generos',
    titleIcon: 'theaters',
    requestRoutes: requestRoutes,
  };

  // eslint-disable-next-line no-undef
  let tGeneros = new DataTable('.data', contents);
  let { rows } = await tGeneros.tableRequest();

  if (rows.length > 0) {
    let contentsCard = {
      id: 'Generos',
      icon: 'theaters',
      bodyElements: [
        {
          number: rows.length,
          name: 'Generos',
        },
      ],
    };

    // eslint-disable-next-line no-undef
    new HeaderCards('chi2', contentsCard);
  }

  loader.classList.remove('loader');
}

// !Consultar Usuarios
async function consultarUsuarios() {
  let contents = {
    name: 'usuario',
    titulo: 'usuarios',
    titleIcon: 'theaters',
    requestRoutes: requestRoutes,
  };

  // eslint-disable-next-line no-undef
  new DataTable('.user_data', contents);
  loader_users.classList.remove('loader');
}
