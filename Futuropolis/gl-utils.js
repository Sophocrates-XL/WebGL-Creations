// Expands existing three.js functionalities to include new methods.
class Generic {
		
	constructor(l = null, w = null, r = null, h = null, n = null) {
		this.l = l;
		this.w = w;
		this.r = r;
		this.h = h;
		this.n = n;
	}
}
	
class WHD {
		
	constructor(w, h, d) {
		this.w = w;
		this.h = h;
		this.d = d;
	}
		
}
	
class RH {
		
	constructor(r, h) {
		this.r = r;
		this.h = h;
	}

}
	
class RHN {
		
	constructor(r, h, n) {
		this.r = r;
		this.h = h;
		this.n = n;
	}

}


class TEMP {
	
	// Generic method for creating a composite object containing a list of objects as children.
	static Composite(objects) {
		let composite = new THREE.Group();
		for (let object of objects) {
			composite.add(object);
		}
		return composite;
	}

	static MonochromePoints(positions, size, color) {
		let points_geometry = new THREE.BufferGeometry().setFromPoints(positions);
		return new THREE.Points(points_geometry, new THREE.PointsMaterial({ size: size, color: color}));
	}

	static MonochromeLine(points, color) {
		let line_geometry = new THREE.BufferGeometry().setFromPoints(points);
		return new THREE.Line(line_geometry, new THREE.LineBasicMaterial({ color: color }));
	}

	static MonochromeLineSegments(points, color) {
		let line_geometry = new THREE.BufferGeometry().setFromPoints(points);
		return new THREE.LineSegments(line_geometry, new THREE.LineBasicMaterial({ color: color }));
	}

	static MonochromeBox(position, whd, fill_color) {
		let geometry = new THREE.BoxBufferGeometry(whd.w, whd.h, whd.d);
		let material = new THREE.MeshLambertMaterial({ color: fill_color });
		let box = new THREE.Mesh(geometry, material);
		box.position.set(...position);
		return box;
	}

	static MonochromeCylinder(position, rhn, fill_color) {
		let geometry = new THREE.CylinderBufferGeometry(rhn.r, rhn.r, rhn.h, rhn.n, 1, false, Math.PI / rhn.n);
		let material = new THREE.MeshLambertMaterial({ color: fill_color });
		let cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.set(...position);
		return cylinder;
	}
	
	static MonochromePyramid(position, whd, fill_color) {
		let geometry = new THREE.ConeBufferGeometry(whd.w / Math.sqrt(2), whd.h, 4, 1, false, Math.PI / 4);
		let material = new THREE.MeshLambertMaterial({ color: fill_color });
		let cone = new THREE.Mesh(geometry, material);
		cone.position.set(...position);
		return cone;
	}
	
	static MonochromeCone(position, rhn, fill_color) { 
		let geometry = new THREE.ConeBufferGeometry(rhn.r, rhn.h, rhn.n, 1, false, Math.PI / rhn.n);
		let material = new THREE.MeshLambertMaterial({ color: fill_color });
		let cone = new THREE.Mesh(geometry, material);
		cone.position.set(...position);
		return cone;
	}
	
	static MonochromeSphere(position, r, fill_color) {
		let geometry = new THREE.SphereBufferGeometry(r, 64, 32);
		let material = new THREE.MeshLambertMaterial({ color: fill_color });
		let sphere = new THREE.Mesh(geometry, material);
		sphere.position.set(...position);
		return sphere;
	}

}


class STRUCT {
	
	// Templates for composite objects.
	// Realizes a square structure with square base and parallel decorative lines at the facade.
	// The directions of decorative lines may be horizontal or vertical, which is randomized at the point of creation.
	static MonochromeSquareStruct(ground_position, base_whd, body_whd, fill_color, line_color = THREE_AUX.getIntensified(fill_color, 1.5)) {
		
		let base_position = [ground_position[0], ground_position[1] + base_whd.h / 2, ground_position[2]];
		let body_position = [ground_position[0], ground_position[1] + base_whd.h + body_whd.h / 2, ground_position[2]];
		let base_monochrome_box = TEMP.MonochromeBox(base_position, base_whd, THREE_AUX.getIntensified(fill_color, 0.7));
		let body_monochrome_box = TEMP.MonochromeBox(body_position, body_whd, fill_color);
		
		let body_facade_points_1 = [];
		let body_facade_points_2 = [];
		const OFFSET_1 = 0.1;
		const OFFSET_2 = 0.02;
		
		if (Math.random() < 0.5) {
			
			for (let y = ground_position[1] + base_whd.h; y <= ground_position[1] + base_whd.h + body_whd.h; y += 3) {
				body_facade_points_1.push(
					new THREE.Vector3(ground_position[0] + body_whd.w / 2 + OFFSET_1, y, ground_position[2] + body_whd.d / 2 + OFFSET_1),
					new THREE.Vector3(ground_position[0] - body_whd.w / 2 - OFFSET_1, y, ground_position[2] + body_whd.d / 2 + OFFSET_1),	
					new THREE.Vector3(ground_position[0] - body_whd.w / 2 - OFFSET_1, y, ground_position[2] + body_whd.d / 2 + OFFSET_1),	
					new THREE.Vector3(ground_position[0] - body_whd.w / 2 - OFFSET_1, y, ground_position[2] - body_whd.d / 2 - OFFSET_1),
					new THREE.Vector3(ground_position[0] - body_whd.w / 2 - OFFSET_1, y, ground_position[2] - body_whd.d / 2 - OFFSET_1),
					new THREE.Vector3(ground_position[0] + body_whd.w / 2 + OFFSET_1, y, ground_position[2] - body_whd.d / 2 - OFFSET_1),
					new THREE.Vector3(ground_position[0] + body_whd.w / 2 + OFFSET_1, y, ground_position[2] - body_whd.d / 2 - OFFSET_1),
					new THREE.Vector3(ground_position[0] + body_whd.w / 2 + OFFSET_1, y, ground_position[2] + body_whd.d / 2 + OFFSET_1));
				body_facade_points_2.push(
					new THREE.Vector3(ground_position[0] + body_whd.w / 2 + OFFSET_2, y, ground_position[2] + body_whd.d / 2 + OFFSET_2),
					new THREE.Vector3(ground_position[0] - body_whd.w / 2 - OFFSET_2, y, ground_position[2] + body_whd.d / 2 + OFFSET_2),
					new THREE.Vector3(ground_position[0] - body_whd.w / 2 - OFFSET_2, y, ground_position[2] + body_whd.d / 2 + OFFSET_2),
					new THREE.Vector3(ground_position[0] - body_whd.w / 2 - OFFSET_2, y, ground_position[2] - body_whd.d / 2 - OFFSET_2),
					new THREE.Vector3(ground_position[0] - body_whd.w / 2 - OFFSET_2, y, ground_position[2] - body_whd.d / 2 - OFFSET_2),
					new THREE.Vector3(ground_position[0] + body_whd.w / 2 + OFFSET_2, y, ground_position[2] - body_whd.d / 2 - OFFSET_2),
					new THREE.Vector3(ground_position[0] + body_whd.w / 2 + OFFSET_2, y, ground_position[2] - body_whd.d / 2 - OFFSET_2),
					new THREE.Vector3(ground_position[0] + body_whd.w / 2 + OFFSET_2, y, ground_position[2] + body_whd.d / 2 + OFFSET_2));
			}
			
		} else {
			
			for (let x = ground_position[0] - body_whd.w / 2; x <= ground_position[0] + body_whd.w / 2; x += 3) {
				for (let z = ground_position[2] - body_whd.d / 2; z <= ground_position[2] + body_whd.d / 2; z += 3) {
					if (Math.abs(x - ground_position[0]) === body_whd.w / 2 ||
						Math.abs(z - ground_position[2]) === body_whd.d / 2) {
						// Unlike horizontal lines, the sign of offset for vertical lines have to be determined individually.
						let sign_offset_x = (x - ground_position[0] === body_whd.w / 2) ? 1 :
							((x - ground_position[0] === - body_whd.w / 2) ? -1 : 0);
						let sign_offset_z = (z - ground_position[2] === body_whd.d / 2) ? 1 :
							((z - ground_position[2] === - body_whd.d / 2) ? -1 : 0);
						let offset_x_1 = OFFSET_1 * sign_offset_x;
						let offset_z_1 = OFFSET_1 * sign_offset_z;
						let offset_x_2 = OFFSET_2 * sign_offset_x;
						let offset_z_2 = OFFSET_2 * sign_offset_z;
						body_facade_points_1.push(
							new THREE.Vector3(x + offset_x_1, ground_position[1] + base_whd.h, z + offset_z_1),
							new THREE.Vector3(x + offset_x_1, ground_position[1] + base_whd.h + body_whd.h, z + offset_z_1));
						body_facade_points_2.push(
							new THREE.Vector3(x + offset_x_2, ground_position[1] + base_whd.h, z + offset_z_2),
							new THREE.Vector3(x + offset_x_2, ground_position[1] + base_whd.h + body_whd.h, z + offset_z_2));
					}
				}
			}
		
		}					
						
		let body_facade_line_segments_1 = TEMP.MonochromeLineSegments(body_facade_points_1, line_color);
		let body_facade_line_segments_2 = TEMP.MonochromeLineSegments(body_facade_points_2, line_color);
		return TEMP.Composite([
			TEMP.Composite([base_monochrome_box, body_monochrome_box]),
			TEMP.Composite([body_facade_line_segments_1, body_facade_line_segments_2])
		]);
	}
	
	
	// Realizes a octagonal structure with square base and horizontal decorative lines at the facade.
	// The directions of decorative lines may be horizontal or rectangular, which is randomized at the point of creation.
	static MonochromeOctagonalStruct(ground_position, base_whd, body_whd, fill_color, line_color = THREE_AUX.getIntensified(fill_color, 1.5)) {
		let base_position = [ground_position[0], ground_position[1] + base_whd.h / 2, ground_position[2]];
		let body_position = [ground_position[0], ground_position[1] + base_whd.h + body_whd.h / 2, ground_position[2]];
		let base_monochrome_box = TEMP.MonochromeBox(base_position, base_whd, THREE_AUX.getIntensified(fill_color, 0.7));
		let body_r = body_whd.w / (2 * Math.cos(Math.PI / 8));
		let body_monochrome_cylinder = TEMP.MonochromeCylinder(body_position, new RHN(body_r, body_whd.h, 8), fill_color);
		let body_facade_points_1 = [];
		let body_facade_points_2 = [];
		const OFFSET_1 = 0.1;
		const OFFSET_2 = 0.02;
		
		if (Math.random() < 0.5) {
			
			let body_facade_r_1 = body_r + OFFSET_1;
			let body_facade_r_2 = body_r + OFFSET_2;	
			for (let h = ground_position[1] + base_whd.h; h <= ground_position[1] + base_whd.h + body_whd.h; h += 3) {
				for (let rad = Math.PI / 8; rad < Math.PI * 2; rad += Math.PI * 2 / 8) {
					let rad_2 = rad + Math.PI * 2 / 8;
					body_facade_points_1.push(
						new THREE.Vector3(
							ground_position[0] + body_facade_r_1 * Math.cos(rad), h, ground_position[2] + body_facade_r_1 * Math.sin(rad)),
						new THREE.Vector3(
							ground_position[0] + body_facade_r_1 * Math.cos(rad_2), h, ground_position[2] + body_facade_r_1 * Math.sin(rad_2)));
					body_facade_points_2.push(
						new THREE.Vector3(
							ground_position[0] + body_facade_r_2 * Math.cos(rad), h, ground_position[2] + body_facade_r_2 * Math.sin(rad)),
						new THREE.Vector3(
							ground_position[0] + body_facade_r_2 * Math.cos(rad_2), h, ground_position[2] + body_facade_r_2 * Math.sin(rad_2)));
				}
			}
		
		} else {
			
			let body_facade_r_1 = body_r + OFFSET_1;
			let body_facade_r_2 = body_r + OFFSET_2;
			for (let rad = Math.PI / 8; rad < Math.PI * 2; rad += Math.PI * 2 / 8) {
				let rad_2 = rad + Math.PI * 2 / 8;
				for (let h = ground_position[1] + base_whd.h; h <= ground_position[1] + base_whd.h + body_whd.h; h += 12) {
					body_facade_points_1.push(
						new THREE.Vector3(
							ground_position[0] + body_facade_r_1 * Math.cos(rad), h, ground_position[2] + body_facade_r_1 * Math.sin(rad)),
						new THREE.Vector3(
							ground_position[0] + body_facade_r_1 * Math.cos(rad_2), h, ground_position[2] + body_facade_r_1 * Math.sin(rad_2)));
					body_facade_points_2.push(
						new THREE.Vector3(
							ground_position[0] + body_facade_r_2 * Math.cos(rad), h, ground_position[2] + body_facade_r_2 * Math.sin(rad)),
						new THREE.Vector3(
							ground_position[0] + body_facade_r_2 * Math.cos(rad_2), h, ground_position[2] + body_facade_r_2 * Math.sin(rad_2)));
				}
				let h_top = ground_position[1] + base_whd.h + body_whd.h;
				body_facade_points_1.push(
					new THREE.Vector3(
						ground_position[0] + body_facade_r_1 * Math.cos(rad), h_top, ground_position[2] + body_facade_r_1 * Math.sin(rad)),
					new THREE.Vector3(
						ground_position[0] + body_facade_r_1 * Math.cos(rad_2), h_top, ground_position[2] + body_facade_r_1 * Math.sin(rad_2)));
				body_facade_points_2.push(
					new THREE.Vector3(
						ground_position[0] + body_facade_r_2 * Math.cos(rad), h_top, ground_position[2] + body_facade_r_2 * Math.sin(rad)),
					new THREE.Vector3(
						ground_position[0] + body_facade_r_2 * Math.cos(rad_2), h_top, ground_position[2] + body_facade_r_2 * Math.sin(rad_2)));
			}
			
			let body_perimeter = body_r * Math.sin(Math.PI / 8) * 16;
			let n_line = Math.ceil(body_r * Math.sin(Math.PI / 8) * 2 / 3) * 8 - 8;
			let rad_between = 2 * Math.PI / n_line;
			for (let rad = 0; rad < Math.PI * 2; rad += rad_between) {
				let rad_dev = rad % (Math.PI / 4);
				rad_dev = (rad_dev < Math.PI / 8) ? rad_dev : (rad_dev - Math.PI / 4);
				let r_ratio = Math.cos(Math.PI / 8) / Math.cos(rad_dev);
				let r_1 = body_r * r_ratio + OFFSET_1;
				let r_2 = body_r * r_ratio + OFFSET_2;				
				body_facade_points_1.push(
					new THREE.Vector3(
						ground_position[0] + r_1 * Math.cos(rad), ground_position[1] + base_whd.h,
						ground_position[2] + r_1 * Math.sin(rad)),
					new THREE.Vector3(
						ground_position[0] + r_1 * Math.cos(rad), ground_position[1] + base_whd.h + body_whd.h,
						ground_position[2] + r_1 * Math.sin(rad)));
				body_facade_points_2.push(
					new THREE.Vector3(
						ground_position[0] + r_2 * Math.cos(rad), ground_position[1] + base_whd.h,
						ground_position[2] + r_2 * Math.sin(rad)),
					new THREE.Vector3(
						ground_position[0] + r_2 * Math.cos(rad), ground_position[1] + base_whd.h + body_whd.h,
						ground_position[2] + r_2 * Math.sin(rad)));
			}
			
		}
			
		let body_facade_line_segments_1 = TEMP.MonochromeLineSegments(body_facade_points_1, line_color);
		let body_facade_line_segments_2 = TEMP.MonochromeLineSegments(body_facade_points_2, line_color);
		return TEMP.Composite([
			TEMP.Composite([base_monochrome_box, body_monochrome_cylinder]),
			TEMP.Composite([body_facade_line_segments_1, body_facade_line_segments_2])
		]);
	}
	
	
	// Realizes a circular structure with square base and horizontal decorative lines at the facade.
	static MonochromeCircularStruct(ground_position, base_whd, body_whd, fill_color, line_color = THREE_AUX.getIntensified(fill_color, 1.5)) {
		let base_position = [ground_position[0], ground_position[1] + base_whd.h / 2, ground_position[2]];
		let body_position = [ground_position[0], ground_position[1] + base_whd.h + body_whd.h / 2, ground_position[2]];
		let base_monochrome_box = TEMP.MonochromeBox(base_position, base_whd, THREE_AUX.getIntensified(fill_color, 0.7));
		let body_r = body_whd.w / 2;
		let body_monochrome_cylinder = TEMP.MonochromeCylinder(body_position, new RHN(body_r, body_whd.h, 64), fill_color);
		let body_facade_points_1 = [];
		let body_facade_points_2 = [];
		const OFFSET_1 = 0.1;
		const OFFSET_2 = 0.02;
		let body_facade_r_1 = body_r + OFFSET_1;
		let body_facade_r_2 = body_r + OFFSET_2;
		
		if (Math.random() < 0.5) {
			
			for (let h = ground_position[1] + base_whd.h; h <= ground_position[1] + base_whd.h + body_whd.h; h += 3) {
				for (let rad = Math.PI / 64; rad < Math.PI * 2; rad += Math.PI * 2 / 64) {
					let rad_2 = rad + Math.PI * 2 / 64;
					body_facade_points_1.push(
						new THREE.Vector3(
							ground_position[0] + body_facade_r_1 * Math.cos(rad), h, ground_position[2] + body_facade_r_1 * Math.sin(rad)),
						new THREE.Vector3(
							ground_position[0] + body_facade_r_1 * Math.cos(rad_2), h, ground_position[2] + body_facade_r_1 * Math.sin(rad_2)));
					body_facade_points_2.push(
						new THREE.Vector3(
							ground_position[0] + body_facade_r_2 * Math.cos(rad), h, ground_position[2] + body_facade_r_2 * Math.sin(rad)),
						new THREE.Vector3(
							ground_position[0] + body_facade_r_2 * Math.cos(rad_2), h, ground_position[2] + body_facade_r_2 * Math.sin(rad_2)));
				}
			}
			
		} else {
			
			let n_line = Math.floor(2 * Math.PI * body_r / 3);
			let rad_between = 2 * Math.PI / n_line;
			for (let rad = rad_between / 2; rad < Math.PI * 2; rad += rad_between) {
				body_facade_points_1.push(
					new THREE.Vector3(
						ground_position[0] + body_facade_r_1 * Math.cos(rad), ground_position[1] + base_whd.h,
						ground_position[2] + body_facade_r_1 * Math.sin(rad)),
					new THREE.Vector3(
						ground_position[0] + body_facade_r_1 * Math.cos(rad), ground_position[1] + base_whd.h + body_whd.h,
						ground_position[2] + body_facade_r_1 * Math.sin(rad)));
				body_facade_points_2.push(
					new THREE.Vector3(
						ground_position[0] + body_facade_r_2 * Math.cos(rad), ground_position[1] + base_whd.h,
						ground_position[2] + body_facade_r_2 * Math.sin(rad)),
					new THREE.Vector3(
						ground_position[0] + body_facade_r_2 * Math.cos(rad), ground_position[1] + base_whd.h + body_whd.h,
						ground_position[2] + body_facade_r_2 * Math.sin(rad)));
			}
		
		}
			
			
		let body_facade_line_segments_1 = TEMP.MonochromeLineSegments(body_facade_points_1, line_color);
		let body_facade_line_segments_2 = TEMP.MonochromeLineSegments(body_facade_points_2, line_color);
		return TEMP.Composite([
			TEMP.Composite([base_monochrome_box, body_monochrome_cylinder]),
			TEMP.Composite([body_facade_line_segments_1, body_facade_line_segments_2])
		]);
	}
	
	
	static ClassicalStructA(ground_position, base_whd, body_whd, fill_color,
		line_color = THREE_AUX.getIntensified(fill_color, 1.5)) {
		
		const LEVEL_H = 12;
		body_whd.h -= body_whd.h % 12;
		
		let base_position = [ground_position[0], ground_position[1] + base_whd.h / 2, ground_position[2]];
		let body_position = [ground_position[0], ground_position[1] + base_whd.h + body_whd.h / 2, ground_position[2]];
		let base_monochrome_box = TEMP.MonochromeBox(base_position, base_whd, THREE_AUX.getIntensified(fill_color, 0.7));
		let body_monochrome_box = TEMP.MonochromeBox(body_position, body_whd, fill_color);
		
		const PILLAR_DIM = new WHD(base_whd.w / 20, base_whd.h + body_whd.h, base_whd.d / 20);
		let pillar_offset = body_whd.w / 2;
		let pillar_positions = [
			[ground_position[0] - pillar_offset, ground_position[1] + (base_whd.h + body_whd.h) / 2, ground_position[2] - pillar_offset],
			[ground_position[0] - pillar_offset, ground_position[1] + (base_whd.h + body_whd.h) / 2, ground_position[2] + pillar_offset],
			[ground_position[0] + pillar_offset, ground_position[1] + (base_whd.h + body_whd.h) / 2, ground_position[2] - pillar_offset],
			[ground_position[0] + pillar_offset, ground_position[1] + (base_whd.h + body_whd.h) / 2, ground_position[2] + pillar_offset]
		];
		let pillar_boxes = [];
		for (let position of pillar_positions) {
			pillar_boxes.push(TEMP.MonochromeBox(position, PILLAR_DIM, line_color));
		}
		
		const ARCHITRAVE_TOP_DIM = new WHD(body_whd.w + PILLAR_DIM.w / 2, 0.2, body_whd.d + PILLAR_DIM.d / 2);
		const ARCHITRAVE_MID_DIM = new WHD(body_whd.w + PILLAR_DIM.w / 2, 0.6, body_whd.d + PILLAR_DIM.d / 2);
		const ARCHITRAVE_BOTTOM_DIM = new WHD(body_whd.w + PILLAR_DIM.w / 2, 0.2, body_whd.d + PILLAR_DIM.d / 2);
		let architrave_h = ARCHITRAVE_TOP_DIM.h + ARCHITRAVE_MID_DIM.h + ARCHITRAVE_BOTTOM_DIM.h;
		let architrave_boxes = [];
		
		let WINDOW_OFFSET_1 = 0.1;
		let WINDOW_OFFSET_2 = 0.02;
		let window_points = [];
		let N_SPACE_HORIZONTAL = 9;
		let N_SPACE_VERTICAL = 5;
		let space_x = (body_whd.w - PILLAR_DIM.w) / N_SPACE_HORIZONTAL;
		let space_y = (LEVEL_H - architrave_h) / N_SPACE_VERTICAL;
		let window_style = randint(1, 2);
		
		// Creates architraves and windows over each layer.
		for (let y = ground_position[1] + base_whd.h + LEVEL_H; y <= ground_position[1] + base_whd.h + body_whd.h; y += LEVEL_H) {
			
			// Creates architraves.
			let architrave_top_position = [ground_position[0], y - ARCHITRAVE_TOP_DIM.h / 2, ground_position[2]];
			let architrave_mid_position = [ground_position[0], y - ARCHITRAVE_TOP_DIM.h - ARCHITRAVE_MID_DIM.h / 2, ground_position[2]];
			let architrave_bottom_position = [ground_position[0],
				y - ARCHITRAVE_TOP_DIM.h - ARCHITRAVE_MID_DIM.h - ARCHITRAVE_BOTTOM_DIM.h / 2, ground_position[2]];
			architrave_boxes.push(TEMP.MonochromeBox(architrave_top_position, ARCHITRAVE_TOP_DIM, line_color),
				TEMP.MonochromeBox(architrave_mid_position, ARCHITRAVE_MID_DIM, THREE_AUX.getIntensified(fill_color, 0.7)),
				TEMP.MonochromeBox(architrave_bottom_position, ARCHITRAVE_BOTTOM_DIM, line_color));
			
			// Create windows.
			if (window_style === 1) {
				
				for (let y_2 = y - LEVEL_H + 2 * space_y; y_2 < y - architrave_h; y_2 += 2 * space_y) {
					for (let x = ground_position[0] - body_whd.w / 2 + PILLAR_DIM.w / 2 + space_x;
						x < ground_position[0] + body_whd.w / 2 - PILLAR_DIM.w / 2 - space_x; x += 2 * space_x) {
						for (let z of [
							ground_position[2] - body_whd.d / 2 - WINDOW_OFFSET_1,
							ground_position[2] - body_whd.d / 2 - WINDOW_OFFSET_2,
							ground_position[2] + body_whd.d / 2 + WINDOW_OFFSET_1,
							ground_position[2] + body_whd.d / 2 + WINDOW_OFFSET_2
							]) {
							window_points.push(
								new THREE.Vector3(x, y_2, z), new THREE.Vector3(x + space_x, y_2, z),
								new THREE.Vector3(x + space_x, y_2, z), new THREE.Vector3(x + space_x, y_2 - space_y, z),
								new THREE.Vector3(x + space_x, y_2 - space_y, z), new THREE.Vector3(x, y_2 - space_y, z),
								new THREE.Vector3(x, y_2 - space_y, z), new THREE.Vector3(x, y_2, z));
						}
					}
					for (let z = ground_position[2] - body_whd.d / 2 + PILLAR_DIM.d / 2 + space_x;
						z < ground_position[2] + body_whd.d / 2 - PILLAR_DIM.d / 2 - space_x; z += 2 * space_x) {
						for (let x of [
							ground_position[0] - body_whd.w / 2 - WINDOW_OFFSET_1,
							ground_position[0] - body_whd.w / 2 - WINDOW_OFFSET_2,
							ground_position[0] + body_whd.w / 2 + WINDOW_OFFSET_1,
							ground_position[0] + body_whd.w / 2 + WINDOW_OFFSET_2
							]) {
							window_points.push(
								new THREE.Vector3(x, y_2, z), new THREE.Vector3(x, y_2, z + space_x),
								new THREE.Vector3(x, y_2, z + space_x), new THREE.Vector3(x, y_2 - space_y, z + space_x),
								new THREE.Vector3(x, y_2 - space_y, z + space_x), new THREE.Vector3(x, y_2 - space_y, z),
								new THREE.Vector3(x, y_2 - space_y, z), new THREE.Vector3(x, y_2, z));
						}
					}
				
				}
				
			} else {
					
				let y_upper = y - architrave_h - 1;
				let y_lower = y - LEVEL_H + 1; 
				for (let x = ground_position[0] - body_whd.w / 2 + PILLAR_DIM.w / 2 + space_x;
					x < ground_position[0] + body_whd.w / 2 - PILLAR_DIM.w / 2 - space_x; x += 2 * space_x) {
					for (let z of [
						ground_position[2] - body_whd.d / 2 - WINDOW_OFFSET_1,
						ground_position[2] - body_whd.d / 2 - WINDOW_OFFSET_2,
						ground_position[2] + body_whd.d / 2 + WINDOW_OFFSET_1,
						ground_position[2] + body_whd.d / 2 + WINDOW_OFFSET_2
						]) {
						window_points.push(
							new THREE.Vector3(x, y_upper, z), new THREE.Vector3(x + space_x, y_upper, z),
							new THREE.Vector3(x + space_x, y_upper, z), new THREE.Vector3(x + space_x, y_lower , z),
							new THREE.Vector3(x + space_x, y_lower, z), new THREE.Vector3(x, y_lower, z),
							new THREE.Vector3(x, y_lower, z), new THREE.Vector3(x, y_upper, z));
					}
				}
				for (let z = ground_position[2] - body_whd.d / 2 + PILLAR_DIM.d / 2 + space_x;
					z < ground_position[2] + body_whd.d / 2 - PILLAR_DIM.d / 2 - space_x; z += 2 * space_x) {
					for (let x of [
						ground_position[0] - body_whd.w / 2 - WINDOW_OFFSET_1,
						ground_position[0] - body_whd.w / 2 - WINDOW_OFFSET_2,
						ground_position[0] + body_whd.w / 2 + WINDOW_OFFSET_1,
						ground_position[0] + body_whd.w / 2 + WINDOW_OFFSET_2
						]) {
						window_points.push(
							new THREE.Vector3(x, y_upper, z), new THREE.Vector3(x, y_upper, z + space_x),
							new THREE.Vector3(x, y_upper, z + space_x), new THREE.Vector3(x, y_lower, z + space_x),
							new THREE.Vector3(x, y_lower, z + space_x), new THREE.Vector3(x, y_lower, z),
							new THREE.Vector3(x, y_lower, z), new THREE.Vector3(x, y_upper, z));
					}
				}	
					
			}
			
		}
		
		let window_line_segments = TEMP.MonochromeLineSegments(window_points, line_color);
		
		// Creates roof.
		let roof_style = randint(1, 2);
		let roof = null;
		if (roof_style === 1) {
			let roof_dim = new WHD(body_whd.w + PILLAR_DIM.w, base_whd.w / 2, body_whd.w + PILLAR_DIM.w);
			let roof_position = [ground_position[0], ground_position[1] + base_whd.h + body_whd.h + roof_dim.h / 2,
				ground_position[2]];
			roof = TEMP.MonochromePyramid(roof_position, roof_dim, fill_color);
		} else if (roof_style === 2) {
			let roof_position = [ground_position[0], ground_position[1] + base_whd.h + body_whd.h + base_whd.w / 4, ground_position[2]];
			roof = TEMP.MonochromeCone(roof_position, new RHN(body_whd.w / (Math.cos(Math.PI / 8) * 2), base_whd.w / 2, 8), fill_color);
		}
		
		return TEMP.Composite([
			TEMP.Composite([base_monochrome_box, body_monochrome_box]),
			TEMP.Composite(pillar_boxes.concat(architrave_boxes).concat([roof, window_line_segments]))
		]);
	
	}
			
	
	static ClassicalStructB(ground_position, base_whd, body_whd, fill_color,
		line_color = THREE_AUX.getIntensified(fill_color, 1.5)) {
		
		const WINDOW_H = 2;
		body_whd.h -= body_whd.h % (WINDOW_H * 2) + WINDOW_H;
		
		let base_position = [ground_position[0], ground_position[1] + base_whd.h / 2, ground_position[2]];
		let body_position = [ground_position[0], ground_position[1] + base_whd.h + body_whd.h / 2, ground_position[2]];
		let base_monochrome_box = TEMP.MonochromeBox(base_position, base_whd, THREE_AUX.getIntensified(fill_color, 0.7));
		let body_monochrome_box = TEMP.MonochromeBox(body_position, body_whd, fill_color);
		
		let WINDOW_OFFSET_1 = 0.1;
		let WINDOW_OFFSET_2 = 0.02;
		let window_points = [];
		let N_SPACE_HORIZONTAL = 9;
		let window_style = randint(1, 2);
		
		// Creates architraves and windows over each layer.
		for (let y = ground_position[1] + base_whd.h + 2 * WINDOW_H; y < ground_position[1] + base_whd.h + body_whd.h;
			y += 2 * WINDOW_H) {
			
			// Create windows.
			if (window_style === 1) {
				
				for (let x = ground_position[0] - body_whd.w / 2 + WINDOW_H;
					x < ground_position[0] + body_whd.w / 2 - WINDOW_H; x += 2 * WINDOW_H) {
					for (let z of [
						ground_position[2] - body_whd.d / 2 - WINDOW_OFFSET_1,
						ground_position[2] - body_whd.d / 2 - WINDOW_OFFSET_2,
						ground_position[2] + body_whd.d / 2 + WINDOW_OFFSET_1,
						ground_position[2] + body_whd.d / 2 + WINDOW_OFFSET_2
						]) {
						window_points.push(
							new THREE.Vector3(x, y, z), new THREE.Vector3(x + WINDOW_H, y, z),
							new THREE.Vector3(x + WINDOW_H, y, z), new THREE.Vector3(x + WINDOW_H, y - WINDOW_H, z),
							new THREE.Vector3(x + WINDOW_H, y - WINDOW_H, z), new THREE.Vector3(x, y - WINDOW_H, z),
							new THREE.Vector3(x, y - WINDOW_H, z), new THREE.Vector3(x, y, z));
					}
				}
				for (let z = ground_position[2] - body_whd.d / 2 + WINDOW_H;
					z < ground_position[2] + body_whd.d / 2 - WINDOW_H; z += 2 * WINDOW_H) {
					for (let x of [
						ground_position[0] - body_whd.w / 2 - WINDOW_OFFSET_1,
						ground_position[0] - body_whd.w / 2 - WINDOW_OFFSET_2,
						ground_position[0] + body_whd.w / 2 + WINDOW_OFFSET_1,
						ground_position[0] + body_whd.w / 2 + WINDOW_OFFSET_2
						]) {
						window_points.push(
							new THREE.Vector3(x, y, z), new THREE.Vector3(x, y, z + WINDOW_H),
							new THREE.Vector3(x, y, z + WINDOW_H), new THREE.Vector3(x, y - WINDOW_H, z + WINDOW_H),
							new THREE.Vector3(x, y - WINDOW_H, z + WINDOW_H), new THREE.Vector3(x, y - WINDOW_H, z),
							new THREE.Vector3(x, y - WINDOW_H, z), new THREE.Vector3(x, y, z));
					}
				}
				
			} else {
					
				for (let z of [
					ground_position[2] - body_whd.d / 2 - WINDOW_OFFSET_1,
					ground_position[2] - body_whd.d / 2 - WINDOW_OFFSET_2,
					ground_position[2] + body_whd.d / 2 + WINDOW_OFFSET_1,
					ground_position[2] + body_whd.d / 2 + WINDOW_OFFSET_2
					]) {
					window_points.push(
						new THREE.Vector3(ground_position[0] - body_whd.w / 2 + WINDOW_H, y, z),
						new THREE.Vector3(ground_position[0] + body_whd.w / 2 - WINDOW_H, y, z),
						new THREE.Vector3(ground_position[0] + body_whd.w / 2 - WINDOW_H, y, z),
						new THREE.Vector3(ground_position[0] + body_whd.w / 2 - WINDOW_H, y - WINDOW_H, z),
						new THREE.Vector3(ground_position[0] + body_whd.w / 2 - WINDOW_H, y - WINDOW_H, z),
						new THREE.Vector3(ground_position[0] - body_whd.w / 2 + WINDOW_H, y - WINDOW_H, z),
						new THREE.Vector3(ground_position[0] - body_whd.w / 2 + WINDOW_H, y - WINDOW_H, z),
						new THREE.Vector3(ground_position[0] - body_whd.w / 2 + WINDOW_H, y, z));
				}
				for (let x of [
					ground_position[0] - body_whd.w / 2 - WINDOW_OFFSET_1,
					ground_position[0] - body_whd.w / 2 - WINDOW_OFFSET_2,
					ground_position[0] + body_whd.w / 2 + WINDOW_OFFSET_1,
					ground_position[0] + body_whd.w / 2 + WINDOW_OFFSET_2
					]) {
					window_points.push(
						new THREE.Vector3(x, y, ground_position[2] - body_whd.w / 2 + WINDOW_H),
						new THREE.Vector3(x, y, ground_position[2] + body_whd.w / 2 - WINDOW_H),
						new THREE.Vector3(x, y, ground_position[2] + body_whd.w / 2 - WINDOW_H),
						new THREE.Vector3(x, y - WINDOW_H, ground_position[2] + body_whd.w / 2 - WINDOW_H),
						new THREE.Vector3(x, y - WINDOW_H, ground_position[2] + body_whd.w / 2 - WINDOW_H),
						new THREE.Vector3(x, y - WINDOW_H, ground_position[2] - body_whd.w / 2 + WINDOW_H),
						new THREE.Vector3(x, y - WINDOW_H, ground_position[2] - body_whd.w / 2 + WINDOW_H),
						new THREE.Vector3(x, y, ground_position[2] - body_whd.w / 2 + WINDOW_H));
				}
					
			}
			
		}
		
		let window_line_segments = TEMP.MonochromeLineSegments(window_points, line_color);
		
		// Creates architraves.
		const ARCHITRAVE_TOP_DIM = new WHD(body_whd.w + 2, 0.2, body_whd.d + 2);
		const ARCHITRAVE_MID_DIM = new WHD(body_whd.w + 1, 0.6, body_whd.d + 1);
		const ARCHITRAVE_BOTTOM_DIM = new WHD(body_whd.w, 0.2, body_whd.d);
		let architrave_h = ARCHITRAVE_TOP_DIM.h + ARCHITRAVE_MID_DIM.h + ARCHITRAVE_BOTTOM_DIM.h;
		
		let architrave_top_position = [ground_position[0],
			ground_position[1] + base_whd.h + body_whd.h + architrave_h - ARCHITRAVE_TOP_DIM.h / 2,
			ground_position[2]];
		let architrave_mid_position = [ground_position[0],
			ground_position[1] + base_whd.h + body_whd.h + architrave_h - ARCHITRAVE_TOP_DIM.h - ARCHITRAVE_MID_DIM.h / 2,
			ground_position[2]];
		let architrave_bottom_position = [ground_position[0],
			ground_position[1] + base_whd.h + body_whd.h + ARCHITRAVE_BOTTOM_DIM.h / 2, ground_position[2]];
		let architrave_boxes = [
			TEMP.MonochromeBox(architrave_top_position, ARCHITRAVE_TOP_DIM, line_color),
			TEMP.MonochromeBox(architrave_mid_position, ARCHITRAVE_MID_DIM, THREE_AUX.getIntensified(fill_color, 0.7)),
			TEMP.MonochromeBox(architrave_bottom_position, ARCHITRAVE_BOTTOM_DIM, line_color)
		];
		
		return TEMP.Composite([
			TEMP.Composite([base_monochrome_box, body_monochrome_box]),
			TEMP.Composite(architrave_boxes.concat([window_line_segments]))
		]);
	
	}
	
	
};



class ENV {
	
	static floor_material = new THREE.MeshLambertMaterial({ color: 0x808080 });
	
	static coat_material = new THREE.MeshLambertMaterial({ color: 0x404040 });
	static light_material = new THREE.MeshLambertMaterial({ color: 0xFFFF80 });
	static base_geometry = new THREE.CylinderBufferGeometry(0.2, 0.4, 0.5, 64);
	static body_geometry = new THREE.CylinderBufferGeometry(0.2, 0.2, 4, 64);
	static lamp_base_geometry = new THREE.CylinderBufferGeometry(0.3, 0.3, 0.02, 64);
	static lamp_geometry = new THREE.CylinderBufferGeometry(0.3, 0.2, 0.5, 64);
	static lamp_top_geometry = new THREE.CylinderBufferGeometry(0.4, 0.4, 0.02, 64);


	static Lamp(ground_position) {
				
		let base = new THREE.Mesh(ENV.base_geometry, ENV.coat_material);
		base.position.set(ground_position[0], 0.25, ground_position[2]);
		
		let body = new THREE.Mesh(ENV.body_geometry, ENV.coat_material);
		body.position.set(ground_position[0], 2.5, ground_position[2]);
		
		let lamp_base = new THREE.Mesh(ENV.lamp_base_geometry, ENV.coat_material);
		lamp_base.position.set(ground_position[0], 4.5, ground_position[2]);
		
		let lamp = new THREE.Mesh(ENV.lamp_geometry, ENV.light_material);
		lamp.position.set(ground_position[0], 4.75, ground_position[2]);
		
		let lamp_top = new THREE.Mesh(ENV.lamp_top_geometry, ENV.coat_material);
		lamp_top.position.set(ground_position[0], 5.0, ground_position[2]);
		
		return TEMP.Composite([base, body, lamp_base, lamp, lamp_top, /*lamp_light*/]);
	
	}


	// For optimization purposes, one floor instance is created that spans through the entire scene.
	static Floor(ground_position, whd) {
		
		let floor_geometry = new THREE.BoxBufferGeometry(whd.w, whd.h, whd.d);
		let floor = new THREE.Mesh(floor_geometry, ENV.floor_material);
		floor.position.set(ground_position[0], ground_position[1] + whd.h / 2, ground_position[2]);
		return floor;
	
	}
		
	
	static Avenue(ground_position, whd) {
		
		// Creates floor.
		//let floor_geometry = new THREE.BoxBufferGeometry(whd.w, whd.h, whd.d);
		//let floor = new THREE.Mesh(floor_geometry, ENV.floor_material);
		//floor.position.set(...ground_position);
		
		// Creates markings on floors.
		let mark_positions = THREE_AUX.toVector3Array([
			[ground_position[0] - whd.w / 2 + 1, ground_position[1] + whd.h + 0.01, ground_position[2] - whd.d / 2 + 1],
			[ground_position[0] - whd.w / 2 + 1, ground_position[1] + whd.h + 0.01, ground_position[2] + whd.d / 2 - 1],
			[ground_position[0] - whd.w / 2 + 1, ground_position[1] + whd.h + 0.01, ground_position[2] + whd.d / 2 - 1],
			[ground_position[0] + whd.w / 2 - 1, ground_position[1] + whd.h + 0.01, ground_position[2] + whd.d / 2 - 1],
			[ground_position[0] + whd.w / 2 - 1, ground_position[1] + whd.h + 0.01, ground_position[2] + whd.d / 2 - 1],
			[ground_position[0] + whd.w / 2 - 1, ground_position[1] + whd.h + 0.01, ground_position[2] - whd.d / 2 + 1],
			[ground_position[0] + whd.w / 2 - 1, ground_position[1] + whd.h + 0.01, ground_position[2] - whd.d / 2 + 1],
			[ground_position[0] - whd.w / 2 + 1, ground_position[1] + whd.h + 0.01, ground_position[2] - whd.d / 2 + 1],
		]);
		let mark_line_segments = TEMP.MonochromeLineSegments(mark_positions, 0xE0E0E0);
		
		// Creates four lamps at the corners of the avenue.
		let lamp_ground_positions = [
			[ground_position[0] - whd.w / 2 + 1, ground_position[1], ground_position[2] - whd.d / 2 + 1],
			[ground_position[0] - whd.w / 2 + 1, ground_position[1], ground_position[2] + whd.d / 2 - 1],
			[ground_position[0] + whd.w / 2 - 1, ground_position[1], ground_position[2] - whd.d / 2 + 1],
			[ground_position[0] + whd.w / 2 - 1, ground_position[1], ground_position[2] + whd.d / 2 - 1]
		];
		let lamps = lamp_ground_positions.map((position) => ENV.Lamp(position));
		
		return TEMP.Composite([mark_line_segments].concat(lamps));
	
	}

}




class THREE_AUX {

// Constructs an array of THREE.Vector3 instances from a array of 3-dimensional arrays.
	static toVector3Array(vectors) {
		let three_vectors = [];
		for (let vector of vectors) {
			three_vectors.push(new THREE.Vector3(...vector));
		}
		return three_vectors;
	}
	
	static fromRGBToHex(color_rgb) {
		return color_rgb[0] * (256 ** 2) + color_rgb[1] * 256 + color_rgb[2];
	}
	
	static fromHexToRGB(color_hex) {
		return [
			Math.floor(color_hex / (256 ** 2)),
			Math.floor((color_hex % (256 ** 2)) / 256),
			color_hex % 256
		];
	}
	
	static getIntensified(color_hex, intensity) {
		let color_rgb = THREE_AUX.fromHexToRGB(color_hex);
		return THREE_AUX.fromRGBToHex(color_rgb.map((elem) => Math.floor(Math.min(elem * intensity, 255))));
	}
	
}