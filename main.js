gsap.registerPlugin(Draggable, gsap);
console.clear();
gsap.ticker.lagSmoothing(false); //////// pour eviter les arrets animations lors d'un non-focus sur la page

let PlayPauseButton = document.querySelector("#playPauseButton");
let playPauseButtonDiv = document.querySelector("#playPauseButtonDiv");
let dragEnd = 0;
let positionSong = 0;
let arm = document.querySelector("#arm");
let diskCenter = document.querySelector("#centerVinyle");
let isStarted = false;
let timelineTurn = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
let interval;
let player = document.querySelector("#player");
let songTimeEnd = player.duration;
let timeElapsed = player.currentTime;
// var volumeControl = document.getElementById('vol-control');
var rate = document.querySelector("#BTNVitesse");
let timelineTurnCenter = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
//let timelinePlay = gsap.timeline({ repeat: 0, defaults: { ease: "none" } });
let setRated = 1;
let stopBut = document.querySelector("#stopButton");
/////////////////////////////////
let testinter;
let rotateOnDragEnd;
//let ArmGO = gsap.to("#arm", { rotation: 93, duration: ((songTimeEnd - (songTimeEnd * (gsap.getProperty("#arm", "rotation") - 76) / 17)) / (player.playbackRate)), onComplete: retourzerobras });
let contenus = {};
let ArmGO = TweenMax.to("#arm", { rotation: 70, duration: 2 });
let vitesse = 1; //vitesse de lecture, 1 au départ
let vitessePosition = 1;


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////      Timeline GSAP du vinyle et du centre du disk
timelineTurn
    .to("#disk", {
        duration: 2,
        rotation: 720,
        repeat: -1,
        ease: "none",
        paused: false
    });


timelineTurnCenter.to("#centerVinyle", {
    duration: 2,
    rotation: 720,
    repeat: -1,
    ease: "none",
    paused: false
})

///////////////   Mets en pause les timelines
timelineTurn.pause();
timelineTurnCenter.pause();


// /////////////// Controle du volume
// volumeControl.addEventListener('input', SetVolume);
// var SetVolume = function() {
//     player.volume = this.value / 100;
//     console.log(this.value);
// };




///////////////   Mets en pause les timelines
timelineTurn.pause();
timelineTurnCenter.pause();

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////Modification du centre de rotation du bras
TweenLite.set('#arm', { transformOrigin: '54px 67px' });

//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Rendre draggable le bras du tourne-disque
const dragable = Draggable.create("#arm", {
    type: "rotation",
    transformOrigin: "50% 50%",
    throwProps: true,
    bounds: { minRotation: 70, maxRotation: 93 },


    ////////////////////////////////à la fin du deplacement
    onDragEnd: function() {
        //play();
    },
    ///////////////////////////////au début du déplacement
    onDragStart: function() {
        dragEnd = 0;
        timelineTurn.pause();
        timelineTurnCenter.pause();
        player.pause();
    },

    /////////////////////////////// au click sans déplacement
    onPress: function() {
        dragEnd = 0;
        player.pause();
    },

    ////////////////////////////////// au relachement du click sans déplacement. Obligatoire avec onPress
    onRelease: function() {
        play();
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Rendre draggable le bouton du reglage vitesse
const dragableVit = Draggable.create("#BTNVitesse", {
        type: "y",
        transformOrigin: "50% 50%",
        throwProps: true,
        bounds: { minY: -80, maxY: 100 },


        ////////////////////////////////à la fin du deplacement
        onDragEnd: function() {
            //play();
            vitessePosition = (this.y - 100) / -90; // vitesse de lecture
            console.log(vitessePosition);
            vitesse = vitessePosition;
            player.playbackRate = vitessePosition.toFixed(2);
            timelineTurn.timeScale(player.playbackRate.toFixed(2));
            timelineTurnCenter.timeScale(player.playbackRate.toFixed(2));
            setRated = player.playbackRate.toFixed(2);

            //console.log((player.duration - player.currentTime) + " " + ((player.duration - (player.duration * ((gsap.getProperty("#arm", "rotation") - 76) / 17))) * player.playbackRate));
            //console.log(ArmGO.duration());

            player.pause();
            dragEnd = 0;
            play();
        },
        ///////////////////////////////au début du déplacement
        onDragStart: function() {
            // dragEnd = 0;
            // timelineTurn.pause();
            // timelineTurnCenter.pause();
            // player.pause();
            //SetRate();
        },

        /////////////////////////////// au click sans déplacement
        onPress: function() {
            // dragEnd = 0;
            // player.pause();
        },

        ////////////////////////////////// au relachement du click sans déplacement. Obligatoire avec onPress
        onRelease: function() {
            // play();
        }
    })
    /// fixer la position initiale du curseur de vitesse
TweenLite.set("#BTNVitesse", { y: 10 });


//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Rendre draggable le bouton du reglage volume
const dragableVol = Draggable.create("#BTNVolume", {
        type: "x",
        transformOrigin: "50% 50%",
        throwProps: true,
        bounds: { minX: -90, maxX: 90 },


        ////////////////////////////////à la fin du deplacement
        onDragEnd: function() {
            //play();
            let volume = (this.x + 90) / 180; // vitesse de lecture
            console.log(volume);
            player.volume = volume;
            // vitesse = vitessePosition;
            // player.playbackRate = vitessePosition.toFixed(2);
            // timelineTurn.timeScale(player.playbackRate.toFixed(2));
            // timelineTurnCenter.timeScale(player.playbackRate.toFixed(2));
            // setRated = player.playbackRate.toFixed(2);

            // //console.log((player.duration - player.currentTime) + " " + ((player.duration - (player.duration * ((gsap.getProperty("#arm", "rotation") - 76) / 17))) * player.playbackRate));
            // //console.log(ArmGO.duration());

            // player.pause();
            // dragEnd = 0;
            // play();
        },
        ///////////////////////////////au début du déplacement
        onDragStart: function() {
            // dragEnd = 0;
            // timelineTurn.pause();
            // timelineTurnCenter.pause();
            // player.pause();
            //SetRate();
        },

        /////////////////////////////// au click sans déplacement
        onPress: function() {
            // dragEnd = 0;
            // player.pause();
        },

        ////////////////////////////////// au relachement du click sans déplacement. Obligatoire avec onPress
        onRelease: function() {
            // play();
        }
    })
    /// fixer la position initiale du curseur de vitesse
TweenLite.set("#BTNVolume", { x: 90 });

//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////  faire bouger le bras, faire tourner le disque et lancer le player
function play() {
    if (gsap.getProperty("#arm", "rotation") > 76 && gsap.getProperty("#arm", "rotation") <= 93 && dragEnd == 0) {
        console.log("test de reprise" + gsap.getProperty("#arm", "rotation") + "  " + dragEnd);
        //////// lancement du player audio HTML5
        player.play();
        player.playbackRate = vitessePosition.toFixed(2); // fixe la vitesse de lecture en fonction de l'ancienne

        songTimeEnd = player.duration;
        timeElapsed = songTimeEnd - (songTimeEnd * (gsap.getProperty("#arm", "rotation") - 76) / 17);

        player.currentTime = (songTimeEnd - timeElapsed).toFixed(2);
        ////// lancement rotation du disque par timeline
        timelineTurn.play();
        timelineTurnCenter.play();

        ////////////// Rotation actuelle du bras
        rotateOnDragEnd = gsap.getProperty("#arm", "rotation");
        /////////////  Durée de la musique en minute
        //console.log("en minute" + new Date(songTimeEnd * 1000).toISOString().substr(11, 8));

        ///////////////////////////fonction affichage temps lecture
        showTime();

        ////////     affiche la pochette central
        let musicNumber = parseInt(PlayPauseButton.getAttribute("data-nummusic"));
        diskCenter.src = contenus[musicNumber].image;


        ArmGO.kill();
        ///////////////////////////////    Tween qui fait avancer le bras à la fin en fonction de la musique et de la rotation de départ
        // 
        ArmGO = TweenMax.to("#arm", { rotation: 93, duration: ((player.duration - (player.duration * ((gsap.getProperty("#arm", "rotation") - 76) / 17))) / player.playbackRate), onComplete: retourzerobras });
        ArmGO.timeScale(1);


        /////////////Place le bouton en mode lecture
        PlayPauseButton.classList.add("iconplay");
        PlayPauseButton.setAttribute("data-index", "true");
        //playPauseButtonDiv.classList.toggle("green");
        playPauseButtonDiv.className = "green";

        //testinter = setInterval(testaudio, 2000); ///// donne la rotation du bras

        dragEnd = 1; ////// INTERDIT LE REDRAG ACCIDENTEL
    } else {
        stopAll();
        showTime();
        PlayPauseButton.classList.remove("iconplay");
        PlayPauseButton.setAttribute("data-index", "false");
        //playPauseButtonDiv.classList.remove("green");
        playPauseButtonDiv.className = "red";

    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// Modifier la vitesse de lecture et relancer la lecture à la bonne vitesse
// function SetRate() {
//     console.log((this.y - 100) / -90);
//     vitesse = vitessePosition;
//     player.playbackRate = vitessePosition.toFixed(2);
//     timelineTurn.timeScale(player.playbackRate.toFixed(2));
//     timelineTurnCenter.timeScale(player.playbackRate.toFixed(2));
//     setRated = player.playbackRate.toFixed(2);

//     console.log((player.duration - player.currentTime) + " " + ((player.duration - (player.duration * ((gsap.getProperty("#arm", "rotation") - 76) / 17))) * player.playbackRate));
//     console.log(ArmGO.duration());

//     player.pause();
//     dragEnd = 0;
//     play();

// };

///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////  pour console.log la position du bras
// function testaudio() {
//     console.log("duree :" + gsap.getProperty("#arm", "rotation"));
//     let rotate = arm.style.transform;
//     rotate = rotate.slice(rotate.indexOf("rotate(") + 7, rotate.indexOf("."))
//     if (rotate <= 74) {
//         clearInterval(testaudio);
//     }
// }


/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////Fonction qui arrete le disque de tourner

function StopDiskRotate() {
    timelineTurn.pause();
    timelineTurnCenter.pause();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// Retour à zero du bras puis arret rotation et arret si pas de lecture en boucle
function retourzerobras() {
    if (loopPlayer == 1) {
        dragEnd = 0;
        let ArmEnd = gsap.to("#arm", { rotation: 70, duration: 2, onComplete: StopDiskRotate })
        playPauseButtonDiv.className = "red";
        PlayPauseButton.classList.remove("iconplay");
        PlayPauseButton.setAttribute("data-index", "false");
        loopPlayerFunct();
    } else {
        dragEnd = 0;
        let ArmEnd = gsap.to("#arm", { rotation: 70, duration: 2, onComplete: StopDiskRotate })
        playPauseButtonDiv.className = "red";
        PlayPauseButton.classList.remove("iconplay");
        PlayPauseButton.setAttribute("data-index", "false");
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// changement de disque
function diskChange(index) {
    dragEnd = 0;
    let ArmEnd = gsap.to("#arm", { rotation: 70, duration: 2, onComplete: playButton(index) });
    timelineTurn.pause();
    timelineTurnCenter.pause();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// Fonction PAuse Audio
function stopAudio() {
    player.pause();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////        pour rendre cliquable les disque en haut, arret de la lecture et attribuer la source

let posBan = 0;
let delai;
let ban;
let msgBan = "Arne Vinzon - Lente dépression";


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////    Affichage déroulant du titre et artiste
function banniere() {
    delai = 200;
    posBan = 0 + posBan;
    if (posBan >= msgBan.length) {
        posBan = 0;
        msgBan = msgBan + "   " + msgBan;
        //console.log("test1");
    } else if (posBan == 0) {
        msgBan = "   " + msgBan;
        console.log("test2");
        while (msgBan.length < 198) {
            msgBan = msgBan + "    " + msgBan;
            console.log("test3");
        }
    }
    document.querySelector("#titre").value = msgBan.substring(posBan, posBan + msgBan.length);
    posBan++;
    ban = setTimeout("banniere()", delai);

}


///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////        pour rendre cliquable les disque en haut, arret de la lecture et attribuer la source


let y = 0;

function imageOnTop() {
    let zz = 0;

    document.querySelectorAll(".diskCenter").forEach(element => {
        // document.querySelector('#diskvinylecenter' + i).src = contenus[y].image;
        element.src = contenus[zz].image;

        element.setAttribute("data-index", zz);


        element.addEventListener("click", () => {

            let index = element.getAttribute("data-index");
            stopAll();
            diskChange(index);
            msgBan = String(contenus[index].artiste) + " - " + String(contenus[index].titre) + "";
            PlayPauseButton.setAttribute("data-nummusic", index);
            player.src = contenus[index].music_src;
        })
        zz++;
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////                   Fonction stop qui arrete tout
function stopAll() {

    ArmGO.pause(); /////// pause du bras

    player.pause(); ///// pause de la balise audio
    player.currentTime = 0; /// remise à zero balise audio

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////fonction bouton Play
let timeStopped;
PlayPauseButton.addEventListener("click", function() {
    this.classList.toggle("iconplay");

    if (this.getAttribute("data-index") == "false" || this.getAttribute("data-index") == null) {
        playPauseButtonDiv.className = "green";

        this.setAttribute("data-index", "true");
        if (gsap.getProperty("#arm", "rotation") > 76 && gsap.getProperty("#arm", "rotation") <= 93 && dragEnd == 0) {
            if (timeStopped > 0) {
                player.currentTime = timeStopped;
                play();
            } else {
                play();
            }
        } else {
            //playButton(parseInt(this.getAttribute("numMusic")));
            playButton(1);

        }
    } else {
        this.setAttribute("data-index", "false");
        ArmGO.pause(); /////// pause du bras
        timelineTurn.pause();
        timelineTurnCenter.pause();
        timeStopped = player.currentTime;
        player.pause(); ///// pause de la balise audio
        dragEnd = 0;
        playPauseButtonDiv.className = "red";
    }
})

function playButton(index) {
    let ArmPlay = TweenMax.to("#arm", { rotation: 76.01, duration: 3, onComplete: play });

}


////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// bouton stop
stopBut.addEventListener("click", function() {
    stopAll();
    showTime();
    PlayPauseButton.classList.remove("iconplay");
    PlayPauseButton.setAttribute("data-index", "false");
    playPauseButtonDiv.className = "red";
    let ArmEnd = gsap.to("#arm", { rotation: 70, duration: 2 });
    timelineTurn.pause();
    timelineTurnCenter.pause();
    dragEnd = 0;

});

////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// bouton previous track
let previousButton = document.querySelector("#previousButtonDiv");
previousButton.addEventListener("click", function() {
    if (PlayPauseButton.getAttribute("data-nummusic") == 0) {
        PlayPauseButton.setAttribute("data-nummusic", 3);
        diskChange(3);
        msgBan = String(contenus[PlayPauseButton.getAttribute("data-nummusic")].artiste) + " - " + String(contenus[PlayPauseButton.getAttribute("data-nummusic")].titre) + "";
        player.src = contenus[PlayPauseButton.getAttribute("data-nummusic")].music_src;

    } else {

        stopAll();
        diskChange(PlayPauseButton.getAttribute("data-nummusic") - 1);
        msgBan = String(contenus[PlayPauseButton.getAttribute("data-nummusic") - 1].artiste) + " - " + String(contenus[PlayPauseButton.getAttribute("data-nummusic") - 1].titre) + "";
        player.src = contenus[PlayPauseButton.getAttribute("data-nummusic") - 1].music_src;
        PlayPauseButton.setAttribute("data-nummusic", PlayPauseButton.getAttribute("data-nummusic") - 1);
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// bouton next track
let nextButton = document.querySelector("#nextButtonDiv");
nextButton.addEventListener("click", function() {
    if (PlayPauseButton.getAttribute("data-nummusic") == 3) {
        PlayPauseButton.setAttribute("data-nummusic", 0);
        diskChange(0);
        msgBan = String(contenus[PlayPauseButton.getAttribute("data-nummusic")].artiste) + " - " + String(contenus[PlayPauseButton.getAttribute("data-nummusic")].titre) + "";
        player.src = contenus[PlayPauseButton.getAttribute("data-nummusic")].music_src;

    } else if (PlayPauseButton.getAttribute("data-nummusic") == 2) {
        let actualMusic = PlayPauseButton.getAttribute("data-nummusic");
        stopAll();
        diskChange(3);
        msgBan = String(contenus[3].artiste) + " - " + String(contenus[3].titre) + "";
        player.src = contenus[3].music_src;
        PlayPauseButton.setAttribute("data-nummusic", 3);

    } else if (PlayPauseButton.getAttribute("data-nummusic") == 1) {
        let actualMusic = PlayPauseButton.getAttribute("data-nummusic");
        stopAll();
        diskChange(2);
        msgBan = String(contenus[2].artiste) + " - " + String(contenus[2].titre) + "";
        player.src = contenus[2].music_src;
        PlayPauseButton.setAttribute("data-nummusic", 2);

    } else if (PlayPauseButton.getAttribute("data-nummusic") == 0) {
        let actualMusic = PlayPauseButton.getAttribute("data-nummusic");
        stopAll();
        diskChange(1);
        msgBan = String(contenus[1].artiste) + " - " + String(contenus[1].titre) + "";
        player.src = contenus[1].music_src;
        PlayPauseButton.setAttribute("data-nummusic", 1);

    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////       Fonction lecture en boucle
loopButtonDiv = document.querySelector("#loopButtonDiv");
loopButtonDiv.addEventListener("click", function() {
    if (loopButtonDiv.getAttribute("data-value") == 0) {
        loopPlayer = 1;
        loopButtonDiv.setAttribute("data-value", 1);
        loopButtonDiv.classList.add("loopButtonDivgreen");
    } else {
        loopPlayer = 0;
        loopButtonDiv.setAttribute("data-value", 0);
        loopButtonDiv.classList.remove("loopButtonDivgreen");
    }
    console.log(loopPlayer);
})

function loopPlayerFunct() {
    if (PlayPauseButton.getAttribute("data-nummusic") == 3) {
        PlayPauseButton.setAttribute("data-nummusic", 0);
        diskChange(0);
        msgBan = String(contenus[PlayPauseButton.getAttribute("data-nummusic")].artiste) + " - " + String(contenus[PlayPauseButton.getAttribute("data-nummusic")].titre) + "";
        player.src = contenus[PlayPauseButton.getAttribute("data-nummusic")].music_src;

    } else if (PlayPauseButton.getAttribute("data-nummusic") == 2) {
        let actualMusic = PlayPauseButton.getAttribute("data-nummusic");
        stopAll();
        diskChange(3);
        msgBan = String(contenus[3].artiste) + " - " + String(contenus[3].titre) + "";
        player.src = contenus[3].music_src;
        PlayPauseButton.setAttribute("data-nummusic", 3);

    } else if (PlayPauseButton.getAttribute("data-nummusic") == 1) {
        let actualMusic = PlayPauseButton.getAttribute("data-nummusic");
        stopAll();
        diskChange(2);
        msgBan = String(contenus[2].artiste) + " - " + String(contenus[2].titre) + "";
        player.src = contenus[2].music_src;
        PlayPauseButton.setAttribute("data-nummusic", 2);

    } else if (PlayPauseButton.getAttribute("data-nummusic") == 0) {
        let actualMusic = PlayPauseButton.getAttribute("data-nummusic");
        stopAll();
        diskChange(1);
        msgBan = String(contenus[1].artiste) + " - " + String(contenus[1].titre) + "";
        player.src = contenus[1].music_src;
        PlayPauseButton.setAttribute("data-nummusic", 1);

    }
};



///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////          Fetch de la liste de musique

var myInit = {
    method: 'GET',
};

var p = fetch('music.json', myInit)
p.then(async function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json()
                .then(function(contenu) {
                    contenus = contenu;
                    player.src = contenu[0].music_src;
                    imageOnTop();
                })
        } else {

            console.log("le fichier envoyé n'est pas du json !");
        }


    })
    .catch(function(error) {
        console.log("le srv est inaccessible:");
        // Network Error!
        console.log(error);
    });


/*
 ** SCROLL
 */


// var scrollDistance = document.body.clientHeight / 2;
// var winScrollY;
// const timelineScrolled = gsap.timeline({
//     paused: true,
//     defaults: {
//         ease: 'power2.inOut',
//         duration: 1,
//     },
// });

// timelineScrolled
// .from('.main__content', { opacity: 0, y: 300 })
// .to(".sun", { rotation: 27, x: 100 }, "-=1.5")

// function scrolled() {
//     winScrollY = window.scrollY;
//     timelineScrolled.progress(winScrollY / scrollDistance);
// }
// scrolled();

// window.addEventListener("scroll", scrolled);

var dn;
c1 = new Image();
c1.src = "image/c1.gif";
c2 = new Image();
c2.src = "image/c2.gif";
c3 = new Image();
c3.src = "image/c3.gif";
c4 = new Image();
c4.src = "image/c4.gif";
c5 = new Image();
c5.src = "image/c5.gif";
c6 = new Image();
c6.src = "image/c6.gif";
c7 = new Image();
c7.src = "image/c7.gif";
c8 = new Image();
c8.src = "image/c8.gif";
c9 = new Image();
c9.src = "image/c9.gif";
c0 = new Image();
c0.src = "image/c0.gif";
cb = new Image();
cb.src = "image/cb.gif";

function extract(h, m, s) {
    if (!document.images) return;
    if (h <= 9) {
        document.images.a.src = c0.src;
        document.images.b.src = eval("c" + h + ".src");
    } else {
        document.images.a.src = eval("c" + Math.floor(h / 10) + ".src");
        document.images.b.src = eval("c" + (h % 10) + ".src");
    }
    if (m <= 9) {
        document.images.d.src = c0.src;
        document.images.e.src = eval("c" + m + ".src");
    } else {
        document.images.d.src = eval("c" + Math.floor(m / 10) + ".src");
        document.images.e.src = eval("c" + (m % 10) + ".src");
    }
    if (s <= 9) {
        document.g.src = c0.src;
        document.images.h.src = eval("c" + s + ".src");
    } else {
        document.images.g.src = eval("c" + Math.floor(s / 10) + ".src");
        document.images.h.src = eval("c" + (s % 10) + ".src");
    }
}

function extractTotal(ht, mt, st) {
    if (!document.images) return;
    if (ht <= 9) {
        document.images.i.src = c0.src;
        document.images.j.src = eval("c" + ht + ".src");
    } else {
        document.images.i.src = eval("c" + Math.floor(h / 10) + ".src");
        document.images.j.src = eval("c" + (ht % 10) + ".src");
    }
    if (mt <= 9) {
        document.images.k.src = c0.src;
        document.images.l.src = eval("c" + mt + ".src");
    } else {
        document.images.k.src = eval("c" + Math.floor(m / 10) + ".src");
        document.images.l.src = eval("c" + (mt % 10) + ".src");
    }
    if (st <= 9) {
        document.images.m.src = c0.src;
        document.images.n.src = eval("c" + st + ".src");
    } else {
        document.images.m.src = eval("c" + Math.floor(st / 10) + ".src");
        document.images.n.src = eval("c" + (st % 10) + ".src");
    }

}


function showTime() {
    if (!document.images)
        return;

    if (isNaN(player.currentTime)) {

        extract(0, 0, 0);
    } else {
        var Digital = new Date(player.currentTime * 1000).toISOString().substr(11, 8);
        if (player.duration == player.currentTime) {
            extract(0, 0, 0);
        } else {
            var hours = parseInt(Digital.slice(0, 2));
            var minutes = parseInt(Digital.slice(3, 5));
            var seconds = parseInt(Digital.slice(-2));
            extract(hours, minutes, seconds);
        }
    }


    if (isNaN(player.duration)) {
        extractTotal(0, 0, 0);
    } else {
        var DigitalTotalTime = new Date(player.duration * 1000).toISOString().substr(11, 8);

        var hoursTotal = parseInt(DigitalTotalTime.slice(0, 2));
        var minutesTotal = parseInt(DigitalTotalTime.slice(3, 5));
        var secondsTotal = parseInt(DigitalTotalTime.slice(-2));

        extractTotal(hoursTotal, minutesTotal, secondsTotal)

        setTimeout("showTime()", 500);
    }
}

///////////////////// fonction lancée au démarrage
function displayTitleTime() {
    showTime();
    banniere();
    document.querySelector("#titre").textContent
}