function init() {

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2500 );
				camera.position.z = 750; camera.position.y = 500;

				scene = new THREE.Scene();

        var texture = new THREE.TextureLoader().load('crate.gif');
				var geometry = new THREE.SphereGeometry( 200, 200, 200 ); //THREE.SphereGeometry & THREE.BoxBufferGeometry

        var geometry2 = new THREE.BoxBufferGeometry( 2000, 20, 2000 );
				var material = new THREE.MeshPhongMaterial( { map: texture } ); //MeshBasicMaterial

        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = 50; mesh.position.y = 50;
        mesh.castShadow = true; //ottaa varjon
        mesh.receiveShadow = true; //ottaa vastaanottaa varjon
				scene.add(mesh);

        mesh2 = new THREE.Mesh(geometry2, material);
        mesh2.position.y = -150;
        mesh.receiveShadow = true;
        scene.add(mesh2);

        ///
        // white spotlight shining from the side, casting a shadow

        var spotLight = new THREE.SpotLight( 0xffffff , 2.5 );
        spotLight.position.set( 100, 1000, 100 );

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        scene.add( spotLight );

        var spotlightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(spotlightHelper);

        ////
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        controls = new THREE.OrbitControls(camera, renderer.domElement);
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;

        //mesh2.rotation.x += 0.008;
        //mesh2.rotation.y += 0.03;
        //mesh2.rotation.z += 0.02

        controls.update(); //mous
				renderer.render( scene, camera );

			}
