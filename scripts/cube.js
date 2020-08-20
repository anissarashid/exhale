
var camera, scene, renderer;
var geometry, material, mesh;

init();


function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    var material = new THREE.MeshStandardMaterial( { color: 0xFFDB70} );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
	scene.add( ambientLight );

	var pointLight = new THREE.PointLight( 0xffffff, .5 );
	camera.add( pointLight );
	scene.add( camera );


    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var theta = 0;

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
}	

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

	}

animate();