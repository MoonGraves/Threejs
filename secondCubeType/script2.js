function init() {

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;

				scene = new THREE.Scene();

				var texture = new THREE.TextureLoader().load( 'crate.gif' );
        //laatiko tai yms geometri materiaali koko asetukset

				var geometry = new THREE.BoxBufferGeometry( 75, 150, 150 );
				var material = new THREE.MeshLambertMaterial( { map: texture } );
        

        //laatikko & materials
				boxi = new THREE.Mesh(geometry, material );
			  scene.add( boxi );

        //toisen laatikkon asetukset, huom var "muu_materiaalin nimi", sekä alhaalla mainittaan siihen materiaaliin
        var geometry_box1 = new THREE.BoxBufferGeometry( 75, 45, 125 );
        var geometry_box2 = new THREE.BoxBufferGeometry( 75, 125, 35 );
        var geometry_box3 = new THREE.BoxBufferGeometry( 74, 150, 35 );
        //leveys x korkeus x syvyys

        
         //keksimmäinen rakennus kaksi pystyssä
        boxi1 = new THREE.Mesh(geometry_box1, material);
        boxi1.position.x = 0;
        boxi1.position.y = 135;
        boxi1.position.z = 53;

        boxi1.rotation.x = Math.PI / 2;
				scene.add(boxi1)     

        boxi2 = new THREE.Mesh(geometry_box2, material);
        boxi2.position.x = 0;
        boxi2.position.y = 135;
        boxi2.position.z = -58;

        boxi2.rotation.x = 0;
				scene.add(boxi2);

        //kolmas laattikko joka on vaakana, joka on kahden pystyssä olevien rakennuksen välissä
        boxi3 = new THREE.Mesh(geometry_box3, material);
        boxi3.position.x = 0;
        boxi3.position.y = 179.987;
        boxi3.position.z = 0;

        //Geometri palikka & materiaali joka pysyy tasan 90 asteessa kulmassa esim vaakan&pystyssä
        //Geometry positions, for eaxmple upside down
        boxi3.rotation.x = Math.PI / 2;
				scene.add(boxi3);

        //xyz koordinaatisto (oikean käden sääntö), eli viivat sini, pun, vihr & (luku jonka määrittyy viivojen pituus)
        var axesHelper = new THREE.AxesHelper( 150 );
        scene.add( axesHelper );


        var directionalLight = new THREE.DirectionalLight( 0xffffff, 2.75 );
        scene.add( directionalLight );

        //valon suunta asetukset eli joko lähellä/kaukana, asteikko, että kaarevuus
        //The light target
        var spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 175, 500, 350 );
        scene.add( spotLight );
        
        //valo väline, josta mihin suuntaa valo oikein tulee
        //Light helper tool of where does the light target is and adjustment
        var spotLightHelper = new THREE.SpotLightHelper( spotLight );
        scene.add( spotLightHelper )         

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

        //Background
				renderer.setClearColor("grey"); //taustavärin muokkaus

				controls = new THREE.OrbitControls(camera, renderer.domElement); //Need Orbitcontrols js or just link for and update...
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

        //laatikkon pyörimis suunta
				//boxi1.rotation.x += 0.005;
				//boxi1.rotation.y += 0.01;
        //boxi1.rotation.z += 0.03;

				//Orbitcontrols js or just link for the update...
				controls.update();
				renderer.render( scene, camera );

			}
