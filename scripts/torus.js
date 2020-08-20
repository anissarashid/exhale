var camera, scene, renderer;
			var mesh, sprite, texture;

			var cameraOrtho, sceneOrtho;

			var dpr = window.devicePixelRatio;

			var textureSize = 128 * dpr;
			var vector = new THREE.Vector2();

			init();
			animate();

			function init() {

				//

				var width = window.innerWidth;
				var height = window.innerHeight;

				camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 );
				camera.position.z = 20;

				cameraOrtho = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1, 10 );
				cameraOrtho.position.z = 10;

				scene = new THREE.Scene();
				
				sceneOrtho = new THREE.Scene();

				//

				var geometry = new THREE.TorusKnotBufferGeometry( 3, 1, 256, 32 );
				var material = new THREE.MeshStandardMaterial( { color:0xFFDB70, wireframe:true} );

				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				//
				var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
				scene.add( ambientLight );

				var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( pointLight );
				scene.add( camera );

				//


				renderer = new THREE.WebGLRenderer( { alpha: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.autoClear = false;
				document.body.appendChild( renderer.domElement );

				//


				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				var width = window.innerWidth;
				var height = window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				cameraOrtho.left = - width / 2;
				cameraOrtho.right = width / 2;
				cameraOrtho.top = height / 2;
				cameraOrtho.bottom = - height / 2;
				cameraOrtho.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				updateSpritePosition();

			}

			function updateSpritePosition() {

				var halfWidth = window.innerWidth / 2;
				var halfHeight = window.innerHeight / 2;

				var halfImageWidth = textureSize / 2;
				var halfImageHeight = textureSize / 2;

				sprite.position.set( - halfWidth + halfImageWidth, halfHeight - halfImageHeight, 1 );

			}

			function animate() {

				requestAnimationFrame( animate );

				var spin = function(theta){
					var tmp = Math.sin(-(1/1.5)*theta);
					var output = (tmp - (-1)) * (0.008 - 0) / (1 - (-1)) + 0;

					return output
				}
				

				var scale = function(theta){
					var tmp = Math.sin(theta);
					var output = (tmp - (-1)) * (1.8 - 1) / (1 - (-1)) + 1;
					return output
				}

				theta += 0.026;

			
				mesh.rotation.z += spin(theta);
				mesh.rotation.x += spin(theta);
			
				mesh.scale.x = scale((1/1.5)*theta);
				mesh.scale.y = scale((1/1.5)*theta);
				mesh.scale.z = scale((1/1.5)*theta);

				renderer.render( scene, camera );
				renderer.clear();
				renderer.render( scene, camera );

				// calculate start position for copying data

				renderer.copyFramebufferToTexture( vector, texture );

				renderer.clearDepth();
				renderer.render( sceneOrtho, cameraOrtho );

			}
