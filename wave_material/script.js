			function init() {

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 1025;

				scene = new THREE.Scene();

				var texture = new THREE.TextureLoader().load( 'crate.gif' );

				//var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
				var geometry = new THREE.PlaneGeometry(2000,2000, 99, 99);
				var material = new THREE.MeshBasicMaterial( { map: texture } );

			    for (var i = 0, l = geometry.vertices.length; i < l; i++) 
				{
			        geometry.vertices[i].z = 200 * (Math.sin((i % 100) / 15) + Math.cos((i / 100) / 15));
				}
				mesh = new THREE.Mesh(geometry, material);
				mesh.rotation.x = -Math.PI / 2;
				scene.add( mesh );

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

				requestAnimationFrame( animate );

				//mesh.rotation.x += 0.005;
				//mesh.rotation.y += 0.01;
				controls.update();
				renderer.render( scene, camera );

			}
