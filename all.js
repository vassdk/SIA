
let container, w, h, scene, camera, controls, renderer, stats;
let loop = {};
var scoreBot = null;
var scoreJoueur = null;
var niveauxA = null;
var piaf = null;
var get=null;
var getSword=null;
var getExtension=null;
var bordNormalDBot=5;
var rebondNBot=3/2;
var bordNormalGJ=2;
var bordNormalDJ=5;
var rebondNJ=3/2;
difficulte=1;
niveaux=1;
bouclierActifJ=true;
bouclierActifB=true;
isJokerSpeed=false;
isJokerSword=false;
isJokerExtension=false;
speed=0;
speedx=0;
vel=0;
scoreStockJ=0;
scoreStockB=0;

window.addEventListener('load', go);
function go() {

    init();
    gameLoop();

}

var game = {
        w : 850,
        h : 200,
        fov : 75,
        joueur : {speed : 0.25, w : 3, h : .5, d : .5, x : 0, baton : null},
        balle : {speed : .125, w : .5, h : .5, d : .5, x : 0, z : 0, vel : {x : 0,}, cube : null},
        bot : {speed : 0.03, w : 3, h : .5, d : .5, x : 0, baton : null},
        stage : {w : 15, h : 10, z : -5, mesh : null},


        reset : function(){
            game.balle.position.z = 5;
            game.balle.position.x = 0;
            game.joueur.baton.position.z = -2;
            game.bot.baton.position.z = 12;
            game.joueur.baton.position.x = 0;
            game.bot.baton.position.x = 0;
            speed=0;
            speedx=0;
            if(bouclierActifB==false){
                bouclierActifB=true;
                bouclierBot();
            }
            if(bouclierActifJ==false){
                bouclierActifJ=true;
                bouclierJoueur();
            }
            removeJokerSpeed();
            removeJokerSword();
            removeJokerExtension()
            removeScene("batonBot");
            removeScene("batonJoueur");
            addBatonJ(basicBaton, joueurMaterial);
            addBatonB(basicBaton, botMaterial);
            game.joueur.speed = 0.25;
            if(difficulte==1){
                game.bot.speed = 0.03;
            }
            else if(difficulte==2){
                game.bot.speed = 0.05;
            }
            else{
                game.bot.speed = 0.08;
            }
            bordNormalDBot=5;
            rebondNBot=3/2;
            bordNormalGJ=2;
            bordNormalDJ=5;
            rebondNJ=3/2;


        }

    },


    controller = {

        left 	: false,
        right 	: false
    }

function restartBalle(){
    setTimeout(function(){
        speed=0.1;
    },2000)

}
var r = new THREE.FontLoader();
function scoreBotA(t) {
    r.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        var ScoreB = new THREE.TextGeometry(t.toString(), {
            font: font,
            size: 1.3,
            height: 0.01,
            curveSegments: 10,
            bevelEnabled: false
        });
        ScoreB.center();
        var textMaterial1 = new THREE.MeshLambertMaterial({color: "white"});
        scoreBot = new THREE.Mesh(ScoreB, textMaterial1);
        scoreBot.position.x = -6.9;
        scoreBot.position.y = 3;
        scoreBot.position.z = 4.4;
        scoreBot.rotation.x = 25 * Math.PI / 180;
        scoreBot.rotation.y =  Math.PI;
        scoreBot.name = "scoreB";
        scene.add(scoreBot);
    });
}

function scoreJoueurA(t) {
    r.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var ScoreJ = new THREE.TextGeometry( t.toString(), {
            font: font,
            size: 1.3,
            height: 0.01,
            curveSegments: 10,
            bevelEnabled: false
        } );
        ScoreJ.center();
        var textMaterial1 = new THREE.MeshLambertMaterial( {color: "white"} );
        scoreJoueur = new THREE.Mesh( ScoreJ, textMaterial1 );
        scoreJoueur.position.x = 6.9;
        scoreJoueur.position.y = 3;
        scoreJoueur.position.z = 4.4;
        scoreJoueur.rotation.x = 25 * Math.PI / 180;
        scoreJoueur.name = "scoreJ";
        scoreJoueur.rotation.y =  Math.PI;
        scene.add( scoreJoueur );
    } );
}

function affichageNiveaux(t) {
    r.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var niveaux = new THREE.TextGeometry( t, {
            font: font,
            size: 0.5,
            height: 0.01,
            curveSegments: 10,
            bevelEnabled: false
        } );
        niveaux.center();
        var textMaterial1 = new THREE.MeshLambertMaterial( {color: "green"} );
        niveauxA = new THREE.Mesh( niveaux, textMaterial1 );
        niveauxA.position.y = 0;
        niveauxA.position.z = -3;
        niveauxA.rotation.x = 25 * Math.PI / 180;
        niveauxA.name = "niveauxName";
        niveauxA.rotation.y =  Math.PI;
        niveauxA.material.side = THREE.DoubleSide;
        scene.add( niveauxA );
    } );

}

function addStart(){
    r.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var start = new THREE.TextGeometry( "appuyer sur entree", {
            font: font,
            size: 0.5,
            height: 0.01,
            curveSegments: 10,
            bevelEnabled: false
        } );
        start.center();
        var textMaterial1 = new THREE.MeshLambertMaterial( {color: "yellow"} );
        startH = new THREE.Mesh( start, textMaterial1 );
        startH.position.y = 0.5;
        startH.position.z = -0.5;
        startH.rotation.x = 25 * Math.PI / 180;
        startH.name = "niveauxName";
        startH.rotation.y =  Math.PI;
        startH.material.side = THREE.DoubleSide;
        startH.name="startH";
        scene.add( startH );
    } );
    r.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var start2 = new THREE.TextGeometry( "pour commencer", {
            font: font,
            size: 0.5,
            height: 0.01,
            curveSegments: 10,
            bevelEnabled: false
        } );
        start2.center();
        var textMaterial1 = new THREE.MeshLambertMaterial( {color: "yellow"} );
        startB = new THREE.Mesh( start2, textMaterial1 );
        startB.position.y = 1.5;
        startB.position.z = -0.5;
        startB.rotation.x = 25 * Math.PI / 180;
        startB.name = "niveauxName";
        startB.rotation.y =  Math.PI;
        startB.material.side = THREE.DoubleSide;
        startB.name="startB";
        scene.add( startB );
    } );
}

function addNiveauxSuivant(){
    r.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var suivant1 = new THREE.TextGeometry( "Appuyez sur entree", {
            font: font,
            size: 0.5,
            height: 0.01,
            curveSegments: 10,
            bevelEnabled: false
        } );
        suivant1.center();
        var matSui1 = new THREE.MeshLambertMaterial( {color: "yellow"} );
        suivantH = new THREE.Mesh( suivant1, matSui1 );
        suivantH.position.y = 0.5;
        suivantH.position.z = -0.5;
        suivantH.rotation.x = 25 * Math.PI / 180;
        suivantH.rotation.y =  Math.PI;
        suivantH.material.side = THREE.DoubleSide;
        suivantH.name="suivantH";
        scene.add( suivantH );
    } );
    r.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var suivant2 = new THREE.TextGeometry( "Niveau suivant!", {
            font: font,
            size: 0.5,
            height: 0.01,
            curveSegments: 10,
            bevelEnabled: false
        } );
        suivant2.center();
        var matSui2 = new THREE.MeshLambertMaterial( {color: "yellow"} );
        suivantB = new THREE.Mesh( suivant2, matSui2 );
        suivantB.position.y = 1.5;
        suivantB.position.z = -0.5;
        suivantB.rotation.x = 25 * Math.PI / 180;
        suivantB.rotation.y =  Math.PI;
        suivantB.material.side = THREE.DoubleSide;
        suivantB.name="suivantB";
        scene.add( suivantB );
    } );
}

function restartPartie() {
    r.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        var niveaux = new THREE.TextGeometry( "Appuyez sur A pour redemarrer", {
            font: font,
            size: 0.4,
            height: 0.01,
            curveSegments: 10,
            bevelEnabled: false
        } );
        niveaux.center();
        var textMaterial1 = new THREE.MeshLambertMaterial( {color: "yellow"} );
        niveauxA = new THREE.Mesh( niveaux, textMaterial1 );
        niveauxA.position.y = 1;
        niveauxA.position.z = 0;
        niveauxA.rotation.x = 25 * Math.PI / 180;
        niveauxA.name = "redemarrer";
        niveauxA.rotation.y =  Math.PI;
        niveauxA.material.side = THREE.DoubleSide;
        scene.add( niveauxA );
    } );

}
var bouclier = new THREE.BoxGeometry( 0.1, 10, 0.25 );
var bouclierM = new THREE.MeshLambertMaterial( {color: 663333} );
function bouclierBot(){
    var BouclierB = new THREE.Mesh( bouclier, bouclierM );
    BouclierB.position.z = 12.45;
    BouclierB.position.y = 0.125;
    BouclierB.rotation.x = 1.57;
    BouclierB.rotation.z = 1.57;
    BouclierB.name = "bouclierBN";
    scene.add( BouclierB );
}


function bouclierJoueur() {
    var BouclierJ = new THREE.Mesh(bouclier, bouclierM);
    BouclierJ.position.z = -2.45;
    BouclierJ.position.y = 0.125;
    BouclierJ.rotation.x = 1.57;
    BouclierJ.rotation.z = 1.57;
    BouclierJ.name = "bouclierJN";
    scene.add(BouclierJ);
}



function niveauxDif(niveauxA){
    removeScene("niveauxName");
    if(niveauxA==1){
        game.bot.speed=0.03;
        affichageNiveaux("Niveau 1");
    }
    else if(niveauxA==2){
        removeScene("suivantH");
        removeScene("suivantB");
        addNiveauxSuivant();
        removeScene("scoreJ");
        scoreJoueurA(0);
        affichageNiveaux("Niveau 2");
        removeScene("poussin");
        addDuck();
    }
    else if(niveauxA==3){
        game.bot.speed=0.08;
        removeScene("suivantH");
        removeScene("suivantB");
        addNiveauxSuivant();
        affichageNiveaux("Niveau 3");
        removeScene("duck");
        addWoody();
    }
    else{
        affichageNiveaux("Victoire!");
        removeScene("woody");
        restartPartie();
        removeScene("suivantH");
        removeScene("suivantB");
        removeScene("scoreJ");
        scoreJoueurA(0);
        removeScene("scoreB");
        scoreBotA(0);
    }
}



function scoreJF(){
    scoreStockJ++;
    if(scoreStockJ == 1){
        game.reset();
        restartBalle();
        removeScene("scoreJ");
        scoreJoueurA(1);
    }
    else if(scoreStockJ == 2) {
        game.reset();
        restartBalle();
        removeScene("scoreJ");
        scoreJoueurA(2);
    }
    else if(scoreStockJ == 3){
        game.reset();
        removeScene("scoreJ");
        scoreJoueurA(0);
        scoreStockJ=0;
        difficulte++;
        niveauxDif(difficulte);
    }
    else{

    }
}

function scoreBF(){
    if(scoreStockB == 0){
        game.reset();
        restartBalle();
        removeScene("scoreB");
        scoreBotA(1);
        scoreStockB++;
    }
    else if(scoreStockB == 1){
        game.reset();
        restartBalle();
        removeScene("scoreB");
        scoreBotA(2);
        scoreStockB++
    }
    else if(scoreStockB == 2){
        game.reset();
        restartBalle();
        removeScene("scoreB");
        scoreBotA(3);
        scoreStockB++
    }
    else{

    }


}


function removeScene(id){
    idR = scene.getObjectByName(id);
    scene.remove(idR);

}
var memoB=null;
function memorizeBaton(id){
    memoB = scene.getObjectByName(id);
    memoB=memoB.position.x;
}
function placeBaton(id){
    track = scene.getObjectByName(id);
    track.position.x=memoB;
}


var texture = new THREE.TextureLoader().load('src/media/ice.jpg');
var joueurMaterial = new THREE.MeshLambertMaterial({color: "blue"});
var botMaterial = new THREE.MeshLambertMaterial({color: "red"});
var iceMaterial = new THREE.MeshBasicMaterial({  map: texture, side: THREE.DoubleSide});
var basicBaton = new THREE.CubeGeometry(3, 0.5, 0.5);
var extendBaton = new THREE.CubeGeometry(6, 0.5, 0.5);

function addBatonB(size, mat){

    game.bot.baton = new THREE.Mesh(size, mat);
    game.bot.baton.position.y = 0.5 / 2;
    game.bot.baton.position.z = 12;
    game.bot.baton.name="batonBot";
    scene.add(game.bot.baton);

}

function addBatonJ(size, mat){

    game.joueur.baton = new THREE.Mesh(size,mat);
    game.joueur.baton.position.y = 0.5 / 2;
    game.joueur.baton.position.z = -2;
    game.joueur.baton.name="batonJoueur";
    scene.add(game.joueur.baton);

}

function randomPos(min, max) {
    return Math.random() * (max - min) + min;
}

function randomEntier(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}


function addPoussin() {
    let loaderUn = new THREE.GLTFLoader();
    loaderUn.load('src/media/oiseauUn/scene.gltf', function (gltf) {
        piaf = gltf.scene.children[0];
        piaf.scale.set(5, 5, 5);
        piaf.rotation.z = -Math.PI / 2;
        piaf.position.z = 13.5;
        piaf.position.y = 1;
        piaf.name = "poussin";
        scene.add(piaf);
    });
}
function addDuck() {
    let loaderDeux = new THREE.GLTFLoader();
    loaderDeux.load('src/media/oiseauDeux/scene.gltf', function (gltf) {
        piaf = gltf.scene.children[0];
        piaf.scale.set(0.01, 0.01, 0.01);
        piaf.rotation.z = Math.PI ;
        piaf.position.z = 13;
        piaf.name = "duck";
        scene.add(piaf);
    });
}

function addWoody() {
    let loaderTrois = new THREE.GLTFLoader();
    loaderTrois.load('src/media/oiseauTrois/scene.gltf', function (gltf) {
        piaf = gltf.scene.children[0];
        piaf.scale.set(0.7, 0.7, 0.7);
        piaf.rotation.z = Math.PI/2 ;
        piaf.position.z = 13.5;
        piaf.position.y = 2;
        piaf.name = "woody";
        scene.add(piaf);
    });
}


function addJokerSpeed(){
    jkSpeed.position.z = randomPos(0,8);
    jkSpeed.position.x = randomPos(-4,4);
}
function removeJokerSpeed(){
    jkSpeed.position.z = 50;
    jkSpeed.position.x = 50;
}
function addJokerSword(){
    jkSword.position.z = randomPos(0,8);
    jkSword.position.x = randomPos(-4,4);
}
function removeJokerSword(){
    jkSword.position.z = 50;
    jkSword.position.x = 50;
}

function addJokerExtension(){
    jkextension.position.z = randomPos(0,8);
    jkextension.position.x = randomPos(-4,4);
}
function removeJokerExtension(){
    jkextension.position.z = 50;
    jkextension.position.x = 50;
}

function init() {

    container = document.querySelector('#SIApp');
    w = container.clientWidth;
    h = container.clientHeight;

    scene = new THREE.Scene();
    scene.id=1;
    camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(0, 3.75, -5)

    controls = new THREE.TrackballControls(camera, container);
    controls.target = new THREE.Vector3(0, 0, 0.75);
    controls.panSpeed = 0.4;
    const renderConfig = {antialias: true, alpha: true};
    renderer = new THREE.WebGLRenderer(renderConfig);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    scoreBotA(0);
    scoreJoueurA(0);
    bouclierBot();
    bouclierJoueur();
    niveauxDif(1);
    addPoussin();
    addBatonB(basicBaton, botMaterial);
    addBatonJ(basicBaton, joueurMaterial);
    addStart();

    // add Stats.js - https://github.com/mrdoob/stats.js
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    document.body.appendChild(stats.domElement);


    let loaderSpeed = new THREE.GLTFLoader();
    loaderSpeed.load('src/media/jokerSpeed/scene.gltf', function (gltf) {
        jkSpeed = gltf.scene.children[0];
        jkSpeed.scale.set(0.7, 0.7, 0.7);
        jkSpeed.rotation.z = Math.PI;
        jkSpeed.position.y = 0;
        jkSpeed.position.z =-50;
        jkSpeed.position.x =-50;
        jkSpeed.name = "jokerSpd";
        scene.add(jkSpeed);
        get=scene.getObjectByName("jokerSpd");
    });
    // add some geometries
    let loaderSword = new THREE.GLTFLoader();
    loaderSword.load('src/media/sword/scene.gltf', function (gltf) {
        jkSword = gltf.scene.children[0];
        jkSword.scale.set(0.0003, 0.0003, 0.0003);
        jkSword.rotation.z = Math.PI;
        jkSword.position.y = 0.1;
        jkSword.position.z = -40;
        jkSword.position.x =-40;
        jkSword.name = "jokerSword";
        scene.add(jkSword);
        getSword=scene.getObjectByName("jokerSword");
    });

    let loaderExtension = new THREE.GLTFLoader();
    loaderExtension.load('src/media/extension/scene.gltf', function (gltf) {
        jkextension = gltf.scene.children[0];
        jkextension.scale.set(0.006,0.006,0.006);
        jkextension.rotation.z = Math.PI;
        jkextension.position.y = 0.3;
        jkextension.position.z = 70;
        jkextension.position.x =70;
        jkextension.name = "jokerExtension";
        scene.add(jkextension);
        getExtension=scene.getObjectByName("jokerExtension");
    });

    var cube_geometry = new THREE.CubeGeometry(0.5, 0.5, 0.5);
    var lime_material = new THREE.MeshLambertMaterial({color: 0xc6e645});
    game.balle = new THREE.Mesh(cube_geometry, lime_material);
    game.balle.position.z = 5;
    game.balle.position.y = 0.5 / 2;

    scene.add(game.balle);

    var floor_geometry = new THREE.PlaneGeometry(15, 10);
    var brown_material = new THREE.MeshLambertMaterial({color: 669900});
    var terrain = new THREE.Mesh(floor_geometry, brown_material);
    terrain.position.z = 5;
    terrain.position.x = 0;
    terrain.rotation.x = -1.57079633;
    terrain.rotation.z = -1.57079633;
    terrain.material.side = THREE.DoubleSide;
    scene.add(terrain);

    var mur = new THREE.BoxGeometry(0.5, 15, 0.5);
    var murMaterial = new THREE.MeshLambertMaterial({color: 663333});


    var murG = new THREE.Mesh(mur, murMaterial);
    murG.position.x = 5.25;
    murG.position.z = 5;
    murG.position.y = 0.25;
    murG.rotation.x = 1.57;
    scene.add(murG);

    var murD = new THREE.Mesh(mur, murMaterial);
    murD.position.x = -5.25;
    murD.position.z = 5;
    murD.position.y = 0.25;
    murD.rotation.x = 1.57;
    scene.add(murD);

    var planeGeometry = new THREE.PlaneGeometry(2, 2, 10, 10);
    var planeMaterial = new THREE.MeshLambertMaterial({color: "red"});
    var scoreBoard1 = new THREE.Mesh(planeGeometry, planeMaterial);
    scoreBoard1.position.x = -7;
    scoreBoard1.position.y = 3;
    scoreBoard1.position.z = 4.5;
    scoreBoard1.rotation.x = 25 * Math.PI / 180;
    scoreBoard1.material.side = THREE.DoubleSide;
    scene.add(scoreBoard1);

    var planeGeometry = new THREE.PlaneGeometry(2, 2, 10, 10);
    var planeMaterial = new THREE.MeshLambertMaterial({color: "blue"});
    var scoreBoard2 = new THREE.Mesh(planeGeometry, planeMaterial);
    scoreBoard2.position.x = 7;
    scoreBoard2.position.y = 3;
    scoreBoard2.position.z = 4.5;
    scoreBoard2.rotation.x = 25 * Math.PI / 180;
    scoreBoard2.material.side = THREE.DoubleSide;
    scene.add(scoreBoard2);


// Ambient light to soften birds eye directional
    var directionalLight = new THREE.DirectionalLight(0xcccccc, 1);

    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    var directionalLight2 = new THREE.DirectionalLight(0xcccccc, 1);

    directionalLight2.position.set(0, 1, 1);
    scene.add(directionalLight2);

    var directionalLight3 = new THREE.DirectionalLight(0xcccccc, 1);

    directionalLight3.position.set(10, 1, 0);
    scene.add(directionalLight3);

    var directionalLight4 = new THREE.DirectionalLight(0xcccccc, 1);

    directionalLight4.position.set(-10, 1, 0);
    scene.add(directionalLight4)

    var directionalLight5 = new THREE.DirectionalLight(0xcccccc, 1);

    directionalLight5.position.set(-4, 1, 0);
    scene.add(directionalLight4);

// Ambient light to soften birds eye directional
    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add(light);

    const fps = 60;
    const slow = 1; // slow motion! 1: normal speed, 2: half speed...
    loop.dt = 0,
        loop.now = timestamp();
    loop.last = loop.now;
    loop.fps = fps;
    loop.step = 1 / loop.fps;
    loop.slow = slow;
    loop.slowStep = loop.slow * loop.step;

    let loader = new THREE.GLTFLoader();
    loader.load('src/media/fantas/scene.gltf', function (gltf) {
        sky = gltf.scene.children[0];
        sky.scale.set(2, 2, 2);
        sky.rotation.x = 4;
        scene.add(gltf.scene);
    })
}

function activeJokerSpeed(){
    if(speed<0) {
        bordNormalDBot=5;
        rebondNBot=3/2;
        rebondNJ=3/2;
        memorizeBaton("batonBot");
        removeScene("batonBot");
        addBatonB(basicBaton, iceMaterial);
        placeBaton("batonBot");
        game.bot.speed = game.bot.speed/2;
        setTimeout(function(){
            memorizeBaton("batonBot");
            removeScene("batonBot");
            addBatonB(basicBaton, botMaterial);
            placeBaton("batonBot");
            game.bot.speed = game.bot.speed*2;
        },5000);
    }
    else{
        bordNormalGJ=2;
        bordNormalDJ=5;
        rebondNJ=3/2;
        memorizeBaton("batonJoueur");
        removeScene("batonJoueur");
        addBatonJ(basicBaton, iceMaterial);
        placeBaton("batonJoueur");
        game.joueur.speed = game.joueur.speed/4;
        setTimeout(function(){
            memorizeBaton("batonJoueur");
            removeScene("batonJoueur");
            addBatonJ(basicBaton, joueurMaterial);
            placeBaton("batonJoueur");
            game.joueur.speed = 0.25;
        },5000);
    }

}
function activeJokerSword(){

    if(speed>0) {
        if (bouclierActifJ == true) {
            removeScene("bouclierJN");
            bouclierActifJ = false;
        }

    }
    else{
        if (bouclierActifB == true) {
            removeScene("bouclierBN");
            bouclierActifB = false;
        }
    }
}

function activeJokerExtension(){

    if(speed>0) {
        bordNormalDBot=3.5;
        rebondNJ=3;
        rebondNBot=3;
        memorizeBaton("batonBot");
        removeScene("batonBot");
        addBatonB(extendBaton, botMaterial);
        placeBaton("batonBot");
        setTimeout(function(){
            memorizeBaton("batonBot");
            removeScene("batonBot");
            addBatonB(basicBaton, botMaterial);
            placeBaton("batonBot");
            bordNormalDBot=5;
            rebondNBot=3/2;
        },5000);
    }
    else{
        bordNormalGJ=0.5;
        bordNormalDJ=3.5;
        rebondNJ=3;
        memorizeBaton("batonJoueur");
        removeScene("batonJoueur");
        addBatonJ(extendBaton, joueurMaterial);
        placeBaton("batonJoueur");
        setTimeout(function(){
            memorizeBaton("batonJoueur");
            removeScene("batonJoueur");
            addBatonJ(basicBaton, joueurMaterial);
            placeBaton("batonJoueur");
            bordNormalGJ=2;
            bordNormalDJ=5;
            rebondNJ=3/2;
        },5000);
    }

}


function animateSpd() {
    get.rotation.z+=0.05;
    animateSpdID=requestAnimationFrame( animateSpd );
    setTimeout(function(){
        cancelAnimationFrame(animateSpdID);
        removeJokerSpeed();
    },7500);

    if(game.balle.position.z-0.8<get.position.z && get.position.z<game.balle.position.z+0.8
        &&get.position.x<game.balle.position.x+0.8 && get.position.x>game.balle.position.x-0.8){
        removeJokerSpeed();
        activeJokerSpeed();



    }
}

function animateSword() {
    getSword.rotation.z+=0.05;
    animateSwordID=requestAnimationFrame( animateSword );
    setTimeout(function(){
        cancelAnimationFrame(animateSwordID);
        removeJokerSword();
    },7500);
    if(game.balle.position.z-0.5<getSword.position.z && getSword.position.z<game.balle.position.z+0.5
        &&getSword.position.x<game.balle.position.x+0.5 && getSword.position.x>game.balle.position.x-0.5){
        removeJokerSword();
        activeJokerSword();
    }
}

function animateExtension() {
    getExtension.rotation.z+=0.05;
    animateExtensionID=requestAnimationFrame( animateExtension );
    setTimeout(function(){
        cancelAnimationFrame(animateExtensionID);
        removeJokerExtension();
    },7500);
    if(game.balle.position.z-0.5<getExtension.position.z && getExtension.position.z<game.balle.position.z+0.5
        &&getExtension.position.x<game.balle.position.x+0.5 && getExtension.position.x>game.balle.position.x-0.5){
        console.log("test");
        removeJokerExtension();
        activeJokerExtension();
    }
}


function gameLoop() {

    // gestion de l'incrément du temps
    loop.now = timestamp();
    loop.dt = loop.dt + Math.min(1, (loop.now - loop.last) / 1000);
    while(loop.dt > loop.slowStep) {
        loop.dt = loop.dt - loop.slowStep;
        update(loop.step); // déplace les objets d'une fraction de seconde

        document.onkeydown=function(e){
            if(e.keyCode == 81){
                controller.left = true;
            }
            if(e.keyCode == 68) {
                controller.right = true;

            }
        };

        document.onkeyup=function(e){
            if(e.keyCode == 81){
                controller.left = false;
            }
            if(e.keyCode == 68) {
                controller.right = false;
            }
            if(e.keyCode == 13){
                removeScene("startB");
                removeScene("startH");
                removeScene("suivantH");
                removeScene("suivantB");
                speed=0.1;
            }
            if(e.keyCode == 66){
                scoreJF();
                removeScene("startB");
                removeScene("startH");
                removeScene("suivantH");
                removeScene("suivantB");
                removeScene("scoreJ");
            }
            if(e.keyCode == 78){
                difficulte++;
                scoreStockJ=0;
                scoreStockB=0;
                removeScene("scoreJ");
                scoreJoueurA(0);
                removeScene("scoreB");
                scoreBotA(0);
                niveauxDif(difficulte);
                removeScene("startB");
                removeScene("startH");
                game.reset();
                console.log();
            }
            if(e.keyCode == 79) {
                animateExtension();
            }
            if(e.keyCode == 70) {
                pleinEcran();
            }
            if(e.keyCode == 80) {
                prendreUnScreen();
            }
            if(e.keyCode == 65) {
                if(difficulte>3) {
                    removeScene("redemarrer");
                    removeScene("niveauxName");
                    removeScene("scoreJ");
                    niveauxA = 1;
                    niveauxDif(niveauxA);
                    difficulte = 1;
                    scoreStockF = 0;
                    scoreStockJ = 0;
                    addStart();
                    addPoussin();
                }
            }

        };

        if(controller.left && game.joueur.baton.position.x - (game.joueur.w/2) < (bordNormalGJ)){
            game.joueur.baton.position.x += game.joueur.speed;}


        if(controller.right && game.joueur.baton.position.x - (game.joueur.w/2) > -(bordNormalDJ)){
            game.joueur.baton.position.x -= game.joueur.speed;}

        if(game.bot.baton.position.x > game.balle.position.x && game.bot.baton.position.x - (game.bot.w/2) > -(bordNormalDBot)){
            game.bot.baton.position.x -= game.bot.speed;
        }

        if(game.bot.baton.position.x < game.balle.position.x && game.bot.baton.position.x + (game.bot.w/2) < (bordNormalDBot)){
            game.bot.baton.position.x += game.bot.speed;
        }

        game.balle.position.z -= speed;
        game.balle.position.x += speedx;

        if(	game.balle.position.z - (0.5/2) <= 3- (10/2) + (0.5/2)){

            if( game.balle.position.x + (0.5/2) > game.joueur.baton.position.x - (rebondNJ) &&

                game.balle.position.x - (0.5/2) < game.joueur.baton.position.x + (rebondNJ)){
                speed*= -1.02;
                speedx = (game.balle.position.x - game.joueur.baton.position.x)/10;

                if(isJokerSpeed==false) {
                    alea1 = randomEntier(1,4);
                    if(alea1==2){
                        addJokerSpeed();
                        isJokerSpeed=true;
                        animateSpd();
                        setTimeout(function(){
                            isJokerSpeed=false;
                        },15000);

                    }

                }
                if(isJokerSword==false) {
                    alea2 = randomEntier(1, 4);
                    if (alea2 == 2) {
                        if(bouclierActifJ==true || bouclierActifB==true) {
                            addJokerSword();
                            isJokerSword = true;
                            animateSword();
                            setTimeout(function () {
                                isJokerSword = false;
                            }, 15000);
                        }
                    }

                }
                if(isJokerExtension==false) {
                    alea3 = randomEntier(1, 4);
                    if (alea3 == 2) {
                        addJokerExtension();
                        isJokerExtension = true;
                        animateExtension();
                        setTimeout(function () {
                            isJokerExtension = false;
                        }, 15000);
                    }

                }


            }else{
                if(	game.balle.position.z - (0.5/2) <= 2.35- (10/2) + (0.5/2)) {
                    if(bouclierActifJ==true){
                        speed*= -1.04;
                        removeScene("bouclierJN");
                        bouclierActifJ=false;
                    }
                    else {
                        scoreBF();
                    }
                }
            }
        }

        if(	game.balle.position.z - (0.5/2) >= 6+ (10/2) + (0.5/2)){

            if( game.balle.position.x + (0.5/2) > game.bot.baton.position.x - (rebondNBot) &&

                game.balle.position.x - (0.5/2) < game.bot.baton.position.x + (rebondNBot)){
                speed*=-1.04;
                speedx = (game.balle.position.x - game.bot.baton.position.x)/10;
                console.log(bouclierActifJ);
                if(isJokerSpeed==false) {
                    alea4 = randomEntier(1,4);
                    if(alea4==2){
                        addJokerSpeed();
                        isJokerSpeed=true;
                        animateSpd();
                        setTimeout(function(){
                            isJokerSpeed=false;
                        },15000);
                    }

                }
                if(isJokerSword==false) {
                    alea5 = randomEntier(1,4);
                    if(alea5==2){
                        if(bouclierActifJ==true || bouclierActifB==true) {
                            addJokerSword();
                            isJokerSword = true;
                            animateSword();
                            setTimeout(function () {
                                isJokerSword = false;
                            }, 15000);
                        }
                    }

                }
                if(isJokerExtension==false) {
                    alea6 = randomEntier(1, 4);
                    if (alea6 == 2) {
                        addJokerExtension();
                        isJokerExtension = true;
                        animateExtension();
                        setTimeout(function () {
                            isJokerExtension = false;
                        }, 15000);
                    }

                }
            }else{
                if(	game.balle.position.z - (0.5/2) >= 6.35- (10/2) + (0.5/2)) {
                    if(bouclierActifB==true){
                        speed*= -1.05;
                        removeScene("bouclierBN");
                        bouclierActifB=false;
                    }
                    else {
                        scoreJF();
                    }

                }
            }
        }

        if(game.balle.position.x > (9.5/2))
            speedx *= -1;

        if(game.balle.position.x < -(9.5/2))
            speedx *= -1;


    }
    renderer.render(scene, camera);  // rendu de la scène
    loop.last = loop.now;
    resize();
    requestAnimationFrame(gameLoop);
    controls.update();
    stats.update();
}

function update(step) {
    const angleIncr = Math.PI * 2 * step / 5 ; // une rotation complète en 5 secondes
}

function resize() {
    w = container.clientWidth;
    h = container.clientHeight;
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

function timestamp() {
    return window.performance.now();
}


function pleinEcran() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
    elem.style.width = '100%';
    elem.style.height = '100%';
}

function prendreUnScreen() {
    var ecran = window.open('', '');
    ecran.document.title = "Screenshot";
    var img = new Image();
    renderer.render(scene, camera);
    img.src = renderer.domElement.toDataURL();

}
