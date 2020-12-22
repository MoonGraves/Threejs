function init() {

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;

				scene = new THREE.Scene();

        //maa taso esim ruohikko, pinta, vuori, meri tai yms
        var floorTexture = new THREE.ImageUtils.loadTexture( 'grasslight-big.jpg' );
        
	      floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	      floorTexture.repeat.set( 15, 20 );
	      var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	      var floorGeometry = new THREE.PlaneGeometry(750, 750, 20, 10);
        
        //pinnan suuruus, eli y suunta ylös/alas
        //x suunta vaaka
        //z suunta käännös
	      var ruohikkoFloor = new THREE.Mesh(floorGeometry, floorMaterial);
	      ruohikkoFloor.position.y = -78;
	      ruohikkoFloor.rotation.x = Math.PI / 2;
        ruohikkoFloor.rotation.z = 1;
	      scene.add(ruohikkoFloor);

        
        //xyz koordinaatisto (oikean käden sääntö), eli viivat sini, pun, vihr & (luku jonka määrittyy viivojen pituus)
        var axesHelper = new THREE.AxesHelper( 500 );
        scene.add( axesHelper );
             
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

        //Background color
				renderer.setClearColor("grey"); //taustavärin muokkaus

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

				controls.update();
				renderer.render( scene, camera );

			}
