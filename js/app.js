var mediaJson = [{
        id: 0,
        title: 'Dura',
        path: 'Dura',
        type: 'music',
        caratula: 'Dura.jpg'
    },
    {
        id: 1,
        title: 'Perfect',
        path: 'Perfect',
        type: 'music',
        caratula: 'Perfect.jpg'
    },
    {
        id: 2,
        title: 'Puro Chantaje',
        path: 'Shakira',
        type: 'music',
        caratula: 'chantaje.jpg'
    },
    {
        id: 3,
        title: 'Shape of you',
        path: 'Shape',
        type: 'music',
        caratula: 'Shape.jpg'
    },
    {
        id: 4,
        title: 'Video personalizado',
        path: 'Chirusa',
        type: 'video',
        caratula: 'Chirusa.mp4'
    }
];

var videoArray = []
loadPlayList();

function loadPlayList() {

    var contLista = document.getElementsByClassName('contenedor-canciones')[0];
    for (let i = 0; i < mediaJson.length; i++) {
        var cancion = document.createElement('div');
        cancion.setAttribute('class', 'cancion');
        cancion.setAttribute('id', mediaJson[i].id);

        var tituloCancion = document.createElement('titulo');
        tituloCancion.setAttribute('class', 'titulo');
        tituloCancion.innerHTML = mediaJson[i].title;

        var iconito = document.createElement('i')
        iconito.setAttribute('class', 'icono-cancion fas fa-music isNotPlaying');
        iconito.setAttribute('id', mediaJson[i].id);

        tituloCancion.appendChild(iconito);

        cancion.addEventListener('click', () => {
            mostrarReproduccionActual(mediaJson[i].id);
            reproducirMedia(mediaJson[i].id);
            rep.play();

        }, false);

        cancion.appendChild(tituloCancion);
        contLista.appendChild(cancion);
    }
}


function mostrarReproduccionActual(i) {
    var iconos = document.querySelectorAll(".icono-cancion");

    iconos.forEach(element => {
        if (element.id == i) {
            element.setAttribute("class", "icono-cancion fas fa-music isPlaying");
        } else {
            element.setAttribute("class", "icono-cancion fas fa-music isNotPlaying");
        }
    });

}
var rep = document.getElementById('reproducir');

function reproducirMedia(i) {

    path = '';
    caratula = '';
    type = '';
    mediaJson.forEach(element => {
        if (element.id == i) {
            path = element.path;
            caratula = element.caratula;
            type = element.type;
        }
    });

    if (type == 'video') {
        //$("video").append("<track> label='español' kind='subtitles' srclang='es' src='../resource'");//falta poner el vtt.
        rep.setAttribute('src', 'resources/video/' + path + '.mp4');
    } else {
        rep.setAttribute('src', 'resources/music/' + path + '.mp3');
        rep.setAttribute('poster', 'resources/img/' + caratula);
    }

    rep.setAttribute('data-media', i);

}

function anterior() {

    var currentId = parseInt(rep.getAttribute("data-media"));

    if (currentId - 1 < 0) {
        mostrarReproduccionActual(mediaJson.length - 1);
        reproducirMedia(mediaJson.length - 1);
    } else {
        mostrarReproduccionActual(currentId - 1);
        reproducirMedia(currentId - 1);
    }

    rep.play();
}

function retroceder() {

    rep.currentTime -= 10;
}

function play() {

    rep.play();
}

function pause() {
    rep.pause();
}

function adelantar() {
    rep.currentTime += 10;
}

function siguiente() {
    var currentId = parseInt(rep.getAttribute("data-media"));

    if (currentId + 1 >= mediaJson.length) {
        mostrarReproduccionActual(0);
        reproducirMedia(0);
    } else {

        mostrarReproduccionActual(currentId + 1);
        reproducirMedia(currentId + 1);
    }

    rep.play();

}

function volmas() {
    if (rep.volume < 1.0) {
        rep.volume += 0.1;
    }
}

function volmenos() {
    if (rep.volume >= 0.1) {
        rep.volume -= 0.1;
    }

}
