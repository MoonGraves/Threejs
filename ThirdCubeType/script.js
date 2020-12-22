			function init() {

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 400;

				scene = new THREE.Scene();

        //box materials
				var texture = new THREE.TextureLoader().load( 'crate.gif' );
				
				var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
				var material = new THREE.MeshBasicMaterial( { map: texture } );

				mesh = new THREE.Mesh( geometry, material );
				scene.add(mesh);

			  //Skybox size
				var texture1 = new THREE.TextureLoader().load('taivas.jpg');

				var geometry1 = new THREE.SphereBufferGeometry(2000, 32, 32);
				var material1 = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide }); //tai BackSide


        //materiaalin lisääminen
				for (var i = 0; i < 50; i++) {
				    mesh = new THREE.Mesh(geometry, material);
				    mesh.position.x = i * 30;
				    mesh.position.y = 30 * (i % 10);

				    scene.add(mesh);
				}

				mesh2 = new THREE.Mesh(geometry1, material1);
				scene.add(mesh2);

				var geometry = new THREE.BoxBufferGeometry(75, 150, 150);
				var material = new THREE.MeshLambertMaterial({ map: texture });



			  //toisen laatikkon asetukset, huom var "muu_materiaalin nimi", sekä alhaalla mainittaan siihen materiaaliin
				var geometry_box1 = new THREE.BoxBufferGeometry(75, 45, 125);
				var geometry_box2 = new THREE.BoxBufferGeometry(75, 125, 35);
				var geometry_box3 = new THREE.BoxBufferGeometry(74, 150, 35);
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
				boxi3.rotation.x = Math.PI / 2;
				scene.add(boxi3);

			  //xyz koordinaatisto
				var axesHelper = new THREE.AxesHelper(500);
				scene.add(axesHelper);

				var directionalLight = new THREE.DirectionalLight(0xffffff, 2.75);
				directionalLight.position.set( 10, 5, -5);
			    scene.add( directionalLight );

			  //valon suunta asetukset eli joko lähellä/kaukana, asteikko, että kaarevuus
				var spotLight = new THREE.SpotLight(0xffffff);
				spotLight.position.set(175, 500, 350);
				scene.add(spotLight);


				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//
				controls = new THREE.OrbitControls(camera, renderer.domElement);
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

			    requestAnimationFrame(animate);

				for (var i = 0; i < scene.children.length; i++) {
				    if (scene.children[i].position.x > 0) {
				        scene.children[i].rotation.x += i* 0.005;
				        //mesh.rotation.y += 0.01
				    }
				}

				controls.update();
				renderer.render( scene, camera );

			}
