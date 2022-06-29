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
    header();
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
        posElementClicked = localStorage.getItem('posElementClicked');
        moverMainScroll({ focusAnimation: false, behaviorAnimation: false });
        moverTargetSpan(posElementClicked);
        consultasADb(posElementClicked);
        ocultarNavBar(true);
    }

    navBar.addEventListener('click', e => {
        let posNavOpt = [...navOptions].indexOf(e.target);
        if (mainSectionsX[posNavOpt] !== undefined && posNavOpt >= 0) {
            posElementClicked = posNavOpt;
            localStorage.setItem('posElementClicked', posElementClicked);

            moverMainScroll({ focusAnimation: true });
            moverTargetSpan(posElementClicked);
            consultasADb(posElementClicked);
        }
    }, {passive: true});

    navBar.addEventListener('mouseenter', () => {
        ocultarNavBar(false);

        setTimeout(() => {
            navBar.addEventListener('mouseleave', () => {
                ocultarNavBar(true);
            });
        }, 1000);
    });

    addEventListener('keydown', e => {
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
    }, {passive: true});

    new ResizeObserver(() => {
        mainSections.forEach((section, index) => {
            mainSectionsX[index] = section.offsetLeft;
        });
        moverMainScroll({ focusAnimation: false, behaviorAnimation: false });
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

    function moverMainScroll(options) {
        if (options.focusAnimation == true) {
            main.classList.add('section_focus_change');
            setTimeout(() => {
                main.classList.remove('section_focus_change');
            }, 500);
        }

        /* prevElementClicked = posElementClicked; */
        main.scroll({
            left: mainSectionsX[posElementClicked],
        });
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

        window.scrollTo({
            top: 0,
        });
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

function header() {
    let buttonUp = document.getElementById('button_up');

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop >= 40) {
            buttonUp.classList.add('button_up_active');
        } else {
            buttonUp.classList.remove('button_up_active');
        }
    }, {passive: true});

    buttonUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
        });
    }, {passive: true});
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

    new HeaderCards('homeCards', contentsCard[0]);
    new HeaderCards('homeCards', contentsCard[1]);
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
    elementParent.addEventListener('wheel', e => {
        e.preventDefault();
        elementParent.scrollLeft += e.deltaY / 2;
    });

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
    buttonLeft.addEventListener('click', () => {
        elementParent.scrollLeft -= 300;
    }, {passive: true});

    buttonRight.innerHTML = `
        <span class="material-icons-round">navigate_next</span>`;
    buttonRight.addEventListener('click', () => {
        elementParent.scrollLeft += 300;
    }, {passive: true});

    elementParent.parentNode.append(buttonLeft, buttonRight);

    function isVisibilyScrollButtons() {
        if (wOverflowElement > wElementParent) {
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

    elementParent.addEventListener('scroll', () => {
        isVisibilyScrollButtons();
    }, {passive: true});

    addEventListener('resize', () => {
        wOverflowElement = overflowElement.offsetWidth;
        wElementParent = elementParent.offsetWidth;
        minRange = overflowElement.offsetWidth - overflowElement.offsetWidth * 0.01;
        maxRange = overflowElement.offsetWidth + overflowElement.offsetWidth * 0.01;
        isVisibilyScrollButtons();
    }, {passive: true});

    new ResizeObserver(() => {
        wOverflowElement = overflowElement.offsetWidth;
        wElementParent = elementParent.offsetWidth;
        minRange = overflowElement.offsetWidth - overflowElement.offsetWidth * 0.01;
        maxRange = overflowElement.offsetWidth + overflowElement.offsetWidth * 0.01;
        isVisibilyScrollButtons();
    }).observe(overflowElement);
}

/* ---------------------- HeaderCards --------------------- */
class HeaderCards {
    principalContainer;
    headerItem;
    spanMaterialIcons;
    containerBody;
    tableAssoc;
    id;
    icon;
    bodyElements;

    constructor(principalContainer, contents) {
        this.principalContainer = document.getElementById(principalContainer);
        this.headerItem = document.createElement('a');
        this.containerBody = document.createElement('div');
        this.id = contents.id;
        this.icon = contents.icon;
        this.bodyElements = contents.bodyElements;
        this.makeCard();
    }

    makeCard() {
        this.renderIcon();
        this.renderBody();

        this.headerItem.classList.add('header_item');
        this.headerItem.href = '#' + this.id;
        this.principalContainer.appendChild(this.headerItem);
    }

    renderIcon() {
        let spanIcon = document.createElement('span');
        spanIcon.classList.add('material-icons-round');
        spanIcon.innerText = this.icon;
        this.headerItem.appendChild(spanIcon);
    }

    renderBody() {
        this.containerBody.classList.add('container_body');
        let fragment = document.createDocumentFragment();

        this.bodyElements.forEach((bElement, i) => {
            let bodyElement = document.createElement('div');
            bodyElement.classList.add('body_element');
            bodyElement.innerHTML = `
            <h5>${this.bodyElements[i].number}</h5>
            <h5>${this.bodyElements[i].name}</h5>`;

            fragment.appendChild(bodyElement);
        });

        this.containerBody.appendChild(fragment);
        this.headerItem.appendChild(this.containerBody);
    }
}

/* --------------- Fetch ---------------- */
// ?Fetch
async function peticionFetch(parametros, url) {
    try {
        let response = await fetch(url, {
            method: 'POST',
            body: parametros,
        });
        return await response.json();
    } catch (error) {
        return 'Ha ocurrido un error: ' + error;
    }
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
        requestRoutes: requestRoutes
    };

    let tPeliculas = new DataTable('.data', contents);
    let tableTrs = await tPeliculas.tableRequest();
    let contentsCard = {
        id: 'Peliculas',
        icon: 'movie',
        bodyElements: [
            {
                number: tableTrs.length,
                name: 'Peliculas',
            },
        ],
    };

    new HeaderCards('chi2', contentsCard);
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

    let tEstadisticas = new DataTable('.data', contents);
    let tableTrs = await tEstadisticas.tableRequest();
    let contentsCard = {
        id: 'Estadisticas',
        icon: 'bar_chart',
        bodyElements: [
            {
                number: tableTrs.length,
                name: 'Estadisticas',
            },
        ],
    };

    new HeaderCards('chi2', contentsCard);
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

    let tActores = new DataTable('.data', contents);
    let tableTrs = await tActores.tableRequest();
    let contentsCard = {
        id: 'Actores',
        icon: 'groups',
        bodyElements: [
            {
                number: tableTrs.length,
                name: 'Actores',
            },
        ],
    };

    new HeaderCards('chi2', contentsCard);
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

    let tDirectores = new DataTable('.data', contents);
    let tableTrs = await tDirectores.tableRequest();
    let contentsCard = {
        id: 'Directores',
        icon: 'people',
        bodyElements: [
            {
                number: tableTrs.length,
                name: 'Directores',
            },
        ],
    };

    new HeaderCards('chi2', contentsCard);
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

    let tGeneros = new DataTable('.data', contents);
    let tableTrs = await tGeneros.tableRequest();
    let contentsCard = {
        id: 'Generos',
        icon: 'theaters',
        bodyElements: [
            {
                number: tableTrs.length,
                name: 'Generos',
            },
        ],
    };

    new HeaderCards('chi2', contentsCard);
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

    let tUsuarios = new DataTable('.user_data', contents);
    loader_users.classList.remove('loader');
}