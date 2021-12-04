const Star = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.size = 10;
}

const context = document.querySelector('canvas').getContext('2d');

let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;

let translate_x = width / 2;
let translate_y = height / 2;
let mouse_move_x = translate_x;
let z_vel = 5;

let stars = new Array();
let MAX_DEPTH = 7500;
let starCount = 500;

for (i = 0; i < starCount; i++) {
	stars[i] = new Star(Math.random() * width, 
						Math.random() * height, 
						i * (MAX_DEPTH / starCount));
}



function loop() {

	requestAnimationFrame(loop);

	height = document.documentElement.clientHeight;
	width = document.documentElement.clientWidth;

	context.canvas.width = width;
	context.canvas.height = height;

	translate_x = width / 2;
	translate_y = height / 2;


	context.fillStyle = "black";
	context.fillRect(0, 0, width, height);

	//static stars
	// for (let i = stars.length - 1; i > -1; i--) {
	// 	let star = stars[i]

	// 	star_x_shift = star.x;
	// 	star_y_shift = star.y;

	// 	context.fillStyle = `rgb(50, 50, 50)`;
	// 	context.beginPath();
	// 	context.arc(star_x_shift, star_y_shift, 2, 0, Math.PI * 2);
	// 	context.fill();
	// }

	//moving stars
	for (let i = stars.length - 1; i > -1; i--) {

		let star = stars[i]

		let FIELD_OF_VIEW = (width + height) / 2;

		let star_x = (star.x - mouse_move_x) / (star.z / FIELD_OF_VIEW) + mouse_move_x;
		let star_y = (star.y - translate_y) / (star.z / FIELD_OF_VIEW) + translate_y;

		let scale = FIELD_OF_VIEW / (FIELD_OF_VIEW + star.z);
		let color = Math.floor(scale * 256);

		star.z -= z_vel;

		if (star.z < 0) {

			stars.push(stars.splice(i, 1)[0]);
			star.z = MAX_DEPTH;
			continue;
		}

		context.fillStyle = `rgb(${color}, ${color}, ${color})`;
		context.beginPath();
		context.arc(star_x, star_y, star.size * scale, 0, Math.PI * 2);
		context.fill();
	}

}

loop();

//mouse control speed and shift direction

document.addEventListener("mousemove", event => {
		mouse_move_x = translate_x - ((event.offsetX - (width / 2)) / 10);
		z_vel = 3 + (event.offsetY / 40);
});