function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 750 );
				camera.position.z = 20;

				scene = new THREE.Scene();

        var texture = new THREE.TextureLoader().load('crate.gif');
        var material = new THREE.MeshPhongMaterial( { map: texture } );

        var geometry2 = new THREE.BoxBufferGeometry( 2000, 20, 2000 );
        mesh2 = new THREE.Mesh(geometry2, material);
        mesh2.position.y = -150;
        mesh2.receiveShadow = true;
        //mesh.receiveShadow = true;
        scene.add(mesh2);

				//var ambientLight = new THREE.AmbientLight( 0x404040, 2 );
			  //scene.add( ambientLight );


        var spotLight = new THREE.SpotLight( 0xffffff, 1.25 );
        spotLight.position.set( 150, 150, 150 );

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        scene.add( spotLight );

        var spotLightHelper = new THREE.SpotLightHelper( spotLight );
        scene.add( spotLightHelper );

        //
        
				var pointLight = new THREE.PointLight( 0xffffff, 1 );
				camera.add( pointLight );
				scene.add( camera );

        var pointLightHelper = new THREE.PointLightHelper( pointLight );
        scene.add( pointLightHelper );

        var light = new THREE.DirectionalLight( 0xFFFFFF );
        var helper = new THREE.DirectionalLightHelper( light, 5 );
        scene.add( helper );

				// model

				var onProgress = function ( xhr ) {

					if ( xhr.lengthComputable ) {

						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				};

				var onError = function () { };
        //////////////////////////////////////////////////////////
        ///Obj + mtl
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load("Moccamasteri/moccamasteri.mtl", function(materials){
          
          materials.preload();
          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          
          objLoader.load("Moccamasteri/moccamasteri.obj", function(mesh){
          
            mesh.traverse(function(node){
              if( node instanceof THREE.Mesh ){
                node.castShadow = true;
                node.receiveShadow = true;
              }
            });
          
            scene.add(mesh);
            mesh.position.set(-5, -5, -5);
            mesh.scale.set(1 , 1 , 1 );
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            mesh.rotation.y = -Math.PI/4;
          });
          
        });


        //////////////////////////////////////////////


				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;

				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}
