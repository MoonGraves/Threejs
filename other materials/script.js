function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

   //////////////////////////////////////////////////////////////////////////////

    var triangleGeometry = new THREE.Geometry();

    var texture = new THREE.ImageUtils.loadTexture('texture/grasslight-big.jpg');

    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide});


    //////////////////////////////////////////////////////////////////////////////
    //LATTIA
    triangleGeometry.vertices.push(new THREE.Vector3(0.0, 750.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3(-750.0, -750.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3(750.0, -750.0, 0.0));
    triangleGeometry.faces.push(new THREE.Face3(0, 1, 2)); 

    mesh = new THREE.Mesh(triangleGeometry, material, texture);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(0, -10, 10);
    scene.add(mesh);


    ////////////////////////////////////////////////////////////////
    //VALO
    var spotLight = new THREE.SpotLight(0xFFFFFF, 1.9);
    spotLight.position.set(-500, 1000, 500);


    spotLight.castShadow = true;
    spotLight.shadowMap = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);



    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    scene.background = new THREE.Color("silver"); //taustaväri
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);

    ///////////////////////////////////////////////////////////////////////////
    //////FIRST MODELS (MTL/OBJ)
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    var onError = function () { };

    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

    new THREE.MTLLoader()
        .setPath('./gasstation')
        .load('/gasstation.mtl', function (materials) {

            materials.preload();

            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('./gasstation')
                //.load('male02.obj', function (object) {
                .load('/GasStation.obj', function (object) {

                    //object.position.y = - 95;
                    object.scale.x = 50;
                    object.scale.y = 50;
                    object.scale.z = 50;
                    object.position.set(0, 10, 209);
                    object.castShadow = true;
                    object.receiveShadow = true;
                    scene.add(object);

                }, onProgress, onError);

        });
    ///////////////
    ///Second model
    new THREE.MTLLoader()
        .setPath('./')
        .load('./blue_car/Blue_Car.mtl', function (materials) {

            materials.preload();

            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('./')
                //.load('male02.obj', function (object) {
                .load('./blue_car/Blue_Car.obj', function (object) {

                    //object.position.y = - 95;
                    //scale koko
                    object.scale.x = 1;
                    object.scale.y = 1;
                    object.scale.z = 1;
                    object.position.set(100, 40, 300);
                    object.castShadow = true;
                    object.receiveShadow = true;
                    scene.add(object);

                }, onProgress, onError);

        });

    /////////////////
    //DAE MODELS

    var loadingManager = new THREE.LoadingManager(function () {
        elf.position.x = 50;

        //scale koko
        elf.scale.x = 0.0025;
        elf.scale.y = 0.0025;
        elf.scale.z = 0.0025;
        elf.position.set(262, -10, 160);
        elf.castShadow = true;
        elf.receiveShadow = true;
        scene.add(elf);
    });

    // collada
    var loader = new THREE.ColladaLoader(loadingManager);
    loader.load('./statue/model.dae', function (collada) {
        elf = collada.scene;
    });


    //
    var loadingManager = new THREE.LoadingManager(function () {
        elf2.position.x = 50;

        //scale koko
        elf2.scale.x = 0.0025;
        elf2.scale.y = 0.0025;
        elf2.scale.z = 0.0025;
        elf2.position.set(-262, -10, 160);
        elf2.castShadow = true;
        elf.receiveShadow = true;
        scene.add(elf2);
    });

    // collada
    var loader = new THREE.ColladaLoader(loadingManager);
    loader.load('./statue/model.dae', function (collada) {
        elf2 = collada.scene;
    });



    ///////////////////////////////////////////////////////////////////////////
 

    //
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);
    //mesh.geometry.vertices[0].z += 0.1;
    //mesh.geometry.verticesNeedUpdate = true; //init:iin

    //mesh.rotation.x += 0.005;
    //mesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);

}