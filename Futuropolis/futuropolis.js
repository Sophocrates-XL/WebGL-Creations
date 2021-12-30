//let mat4 = glMatrix.mat4;
//let vec3 = glMatrix.vec3;

const SIGHT_RANGE = 100;
let eye_position = null;
let rad_horizontal = Math.PI / 2;
let rad_vertical = 0;
let target_position = null;
let key_states = {
	"w": false,
	"s": false,
	"a": false,
	"d": false
};



function randint(a, b) {
	let u = Math.random();
	return(Math.floor(a + (b + 1 - a) * u));
}



function futuropolis() {
	
	// Test code for initialization of scene using three.js library.
	// Test successful.
	let scene = new THREE.Scene();
	let camera = new THREE.PerspectiveCamera(90, 1.0, 0.01, 1000);
	let renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(480, 480);
	document.body.appendChild(renderer.domElement);
	
	document.addEventListener("keydown", (event) => {
		key_states[event.key] = true;
	});
	document.addEventListener("keyup", (event) => {
		key_states[event.key] = false;
	});
	renderer.domElement.addEventListener("mousemove", (event) => {
		rad_horizontal = Math.PI / 2 - Math.PI * (event.clientX - 240) / 120;
		rad_vertical = (event.clientY > 240) ? 0 : Math.PI * (240 - event.clientY) / 480;
	});
	
	let phase = 0.0;
	const FPS = 15.0;
	const PERIOD = 2.0;
	const MIN_PERIOD = 2.0;
	const MAX_PERIOD = 5.0;
	const N_ROW = 28;
	const N_COL = 28;
	const DISTRICT_N_COL = 2;
	const MIN_H = 40;
	const MAX_H = 100;
	const BASE_W = 20;
	const BODY_W = 18;
	const BASE_H = 1;
	const LEVEL_H = 3;
	const WALK_SPEED = 10;
	const P_VACANT = 0.4;
	const STAR_DISTANCE = 50000;
	const STAR_DENSITY = 0.000001;
	
	const X_LOWER = - N_COL * BASE_W / 2;
	const X_UPPER = N_COL * BASE_W / 2;
	const Z_LOWER = - N_ROW * BASE_W / 2;
	const Z_UPPER = N_ROW * BASE_W / 2;
	
	let cell_types = new Uint32Array(N_ROW * N_COL);
	let cell_body_dims = new Array(N_ROW * N_COL);
	let cell_colors = new Uint32Array(N_ROW * N_COL);
	let cell_phases = new Float32Array(N_ROW * N_COL);
	let cell_periods = new Float32Array(N_ROW * N_COL);
	for (let i = 0; i < N_ROW; i++) {
		for (let j = 0; j < N_COL; j++) {
			let index = i * N_COL + j;
			// 0: Vacant.
			// 1: Square Structure.
			// 2: Hexagonal structure.
			// 3: Octagonal structure.
			cell_periods[index] = MIN_PERIOD + Math.random() * (MAX_PERIOD - MIN_PERIOD);
			cell_phases[index] = Math.random() * cell_periods[index];
			if (i === 0 || i === N_ROW - 1 || j === 0 || j === N_COL - 1 || j % (DISTRICT_N_COL + 1) === 0 || Math.random() < P_VACANT) {
				cell_types[index] = 0;
				cell_body_dims[index] = new WHD(BASE_W, 0.01, BASE_W);
				cell_colors[index] = 0x808080;	
			} else {
				cell_types[index] = randint(1, 5);
				let body_h = randint(MIN_H, MAX_H);
				body_h -= body_h % LEVEL_H;
				cell_body_dims[index] = new WHD(BODY_W, body_h, BODY_W);
				cell_colors[index] = randint(0x000000, 0xFFFFFF);
			}
		}
	}
	
	let avenue_rowcols = [];
	for (let i = 0; i < N_ROW; i++) {
		for (let j = 0; j < N_COL; j++) {
			let index = i * N_COL + j;
			if (cell_types[index] === 0) avenue_rowcols.push([i, j]);
		}
	}
	let viewer_rowcol = avenue_rowcols[randint(0, avenue_rowcols.length - 1)];
	eye_position = [X_LOWER + (viewer_rowcol[1] + 0.5) * BASE_W, 1.5, Z_LOWER + (viewer_rowcol[0] + 0.5) * BASE_W];
    target_position = [eye_position[0], 1.5, eye_position[2] - SIGHT_RANGE];
	camera.position.set(...eye_position);
	camera.lookAt(...target_position);
	console.log("Initialization complete.");
	console.log("Initial viewer position: [" + eye_position[0] + ", " + eye_position[2] + "]."); 
	
	
	let base_whd = new WHD(BASE_W, BASE_H, BASE_W);
	// Initializes a list of boxes to be accessed each frame.
	for (let i = 0; i < N_ROW; i++) {
		for (let j = 0; j < N_COL; j++) {
			let index = i * N_COL + j;
			let ground_position = [X_LOWER + (j + 0.5) * BASE_W, 0, Z_LOWER + (i + 0.5) * BASE_W];
			if (cell_types[index] === 0) {
				scene.add(ENV.Avenue(ground_position, new WHD(BASE_W, 0.02, BASE_W)));
			} else if (cell_types[index] === 1) {
				scene.add(STRUCT.MonochromeSquareStruct(ground_position, base_whd, cell_body_dims[index], cell_colors[index]));
			} else if (cell_types[index] === 2) {
				scene.add(STRUCT.MonochromeOctagonalStruct(ground_position, base_whd, cell_body_dims[index], cell_colors[index]));
			} else if (cell_types[index] === 3) {
				scene.add(STRUCT.MonochromeCircularStruct(ground_position, base_whd, cell_body_dims[index], cell_colors[index]));
			} else if (cell_types[index] === 4) {
				scene.add(STRUCT.ClassicalStructA(ground_position, base_whd, cell_body_dims[index], cell_colors[index]));
			} else if (cell_types[index] === 5) {
				scene.add(STRUCT.ClassicalStructB(ground_position, base_whd, cell_body_dims[index], cell_colors[index]));
			}
		}
	}
	
	// Creates a common floor shared by the entire scene.
	let floor = ENV.Floor([0, 0, 0], new WHD(X_UPPER - X_LOWER, 0.02, Z_UPPER - Z_LOWER));
	scene.add(floor);
	
	// Adds lightings to scene.
	let sunlight = new THREE.DirectionalLight(0xFFFFFF, 0.7);
	sunlight.position.set(-500, 500, -500);
	sunlight.castShadow = true;
	let ambient_light = new THREE.AmbientLight(0xFFFFFF, 0.7);
	scene.add(TEMP.Composite([sunlight, ambient_light]));
	
	let objects = scene.children.slice(0, N_ROW * N_COL);
	let struct_base_bounding_boxes = [];
	let struct_body_bounding_boxes = [];
	for (let i = 0; i < N_ROW; i++) {
		for (let j = 0; j < N_COL; j++) {
			let index = i * N_COL + j;
			if (cell_types[index] !== 0) {
				objects[index].children[0].children[0].geometry.computeBoundingBox();
				struct_base_bounding_boxes.push(objects[index].children[0].children[0].geometry.boundingBox);
				objects[index].children[0].children[1].geometry.computeBoundingBox();
				struct_body_bounding_boxes.push(objects[index].children[0].children[1].geometry.boundingBox);
			}
		}
	}
	//console.log(struct_bases);
	//console.log(struct_bodies);
	
	
	function animate() {
	//setInterval(() => {
		let time_1 = new Date().getTime();

		for (let i = 0; i < N_ROW; i++) {
			for (let j = 0; j < N_COL; j++) {
				let index = i * N_COL + j;
				let I = 0.75 + 0.25 * Math.sin(2 * Math.PI * cell_phases[index] / cell_periods[index]);
				if (cell_types[index] !== 0) {
					let fill_color_rgb = THREE_AUX.fromHexToRGB(cell_colors[index]);
					fill_color_rgb[0] = Math.floor(fill_color_rgb[0] * I);
					fill_color_rgb[1] = Math.floor(fill_color_rgb[1] * I);
					fill_color_rgb[2] = Math.floor(fill_color_rgb[2] * I);
					let new_body_fill_color = THREE_AUX.fromRGBToHex(fill_color_rgb);
					let new_base_fill_color = THREE_AUX.getIntensified(new_body_fill_color, 0.7);
					objects[index].children[0].children[0].material.setValues({ color: new_base_fill_color });
					objects[index].children[0].children[1].material.setValues({ color: new_body_fill_color });
				}
			}
		}
		renderer.render(scene, camera);
		
		let time_2 = new Date().getTime();
		let time_elapsed = (time_2 - time_1) / 1000;
		
		// Calculates for the viewer its tentative new position upon movement.
		let eye_x_new = eye_position[0];
		let eye_z_new = eye_position[2];
		if (key_states["w"]) {
			eye_x_new = eye_position[0] + WALK_SPEED * time_elapsed * Math.cos(rad_horizontal);
			eye_z_new = eye_position[2] - WALK_SPEED * time_elapsed * Math.sin(rad_horizontal);
		} else if (key_states["s"]) {
			eye_x_new = eye_position[0] - WALK_SPEED * time_elapsed * Math.cos(rad_horizontal);
			eye_z_new = eye_position[2] + WALK_SPEED * time_elapsed * Math.sin(rad_horizontal);
		} else if (key_states["a"]) {
			eye_x_new = eye_position[0] - WALK_SPEED * time_elapsed * Math.cos(rad_horizontal - Math.PI / 2);
			eye_z_new = eye_position[2] + WALK_SPEED * time_elapsed * Math.sin(rad_horizontal - Math.PI / 2);
		} else if (key_states["d"]) {
			eye_x_new = eye_position[0] + WALK_SPEED * time_elapsed * Math.cos(rad_horizontal - Math.PI / 2);
			eye_z_new = eye_position[2] - WALK_SPEED * time_elapsed * Math.sin(rad_horizontal - Math.PI / 2);
		}
		
		// Checks if the viewer's new position is out of the boundaries.
		// The viewer's dimension is treated as if a sphere of radius 1.
		let exceeds_bound = eye_x_new < X_LOWER + 1 || eye_x_new > X_UPPER - 1 || eye_z_new < Z_LOWER + 1 || eye_z_new > Z_UPPER - 1; 
		
		// Checks if the viewer's new position collides with any structures.
		let viewer_j = Math.floor((eye_x_new - X_LOWER) / BASE_W);
		let viewer_i = Math.floor((eye_z_new - Z_LOWER) / BASE_W);
		let has_collision = (cell_types[viewer_i * N_COL + viewer_j] !== 0);
		
		/*
		let viewer_sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1), new THREE.MeshBasicMaterial());
		viewer_sphere.position.set(eye_x_new, eye_position[1], eye_z_new);
		console.log(viewer_sphere.position);
		let has_collision = false;
		for (let box of struct_body_bounding_boxes) {
			if (box.intersectsSphere(viewer_sphere)) {
				has_collision = true;
				break;
			}
		}
		*/
		// If the viewer's new location does not collide with any structures and does not go out of the map,
		// updates viewer and camera positions.
		if ((!has_collision) && (!exceeds_bound)) {
			eye_position[0] = eye_x_new;
			eye_position[2] = eye_z_new;
			target_position[0] = eye_position[0] + SIGHT_RANGE * Math.cos(rad_vertical) * Math.cos(rad_horizontal);
			target_position[1] = eye_position[1] + SIGHT_RANGE * Math.sin(rad_vertical);
			target_position[2] = eye_position[2] - SIGHT_RANGE * Math.cos(rad_vertical) * Math.sin(rad_horizontal);
			camera.position.set(...eye_position);
			camera.lookAt(...target_position);
		}
		
		// Updates the phases for the colors of structures.
		for (let i = 0; i < N_ROW; i++) {
			for (let j = 0; j < N_COL; j++) {
				let index = i * N_COL + j;
				cell_phases[index] = (cell_phases[index] + time_elapsed) % cell_periods[index];
			}
		}
		
		// Recursively runs animation.
		requestAnimationFrame(animate);
		
	};
	
	// Starts animation loop.
	animate();

}