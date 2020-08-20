var radius = 5;
var scale = radius*0.001;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



var geometry = new THREE.SphereGeometry(radius, 20, 20);
var material = new THREE.MeshBasicMaterial( {color: 0xFFDB70, wireframe: true} );
var sphere = new THREE.Mesh( geometry, material );

scene.add( sphere );

camera.position.z = 20;

var theta = 0;



var animate = function () {
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

	sphere.rotation.y += spin(theta);

	sphere.scale.x = scale((1/1.5)*theta);
	sphere.scale.y = scale((1/1.5)*theta);
	sphere.scale.z = scale((1/1.5)*theta);

	console.log("shpere:" + sphere.scale.x);

	renderer.render( scene, camera );
};

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

	}

animate();
