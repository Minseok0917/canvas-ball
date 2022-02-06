const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const balls = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



ctx.beginPath();
ctx.fillStyle = "rgba(0,0,0,0.9)";
ctx.rect(0,0,canvas.width,canvas.height);
ctx.fill();


ctx.filter = 'blur(10px)';
ctx.fillStyle = '#fff';

ctx.beginPath();
ctx.arc(50,50,30,0,Math.PI*2);
ctx.fill();



ctx.beginPath();
ctx.arc(110,50,30,0,Math.PI*2);
ctx.fill();


const a = canvas.toDataURL();

let img = new Image();
img.src = a;
img.onload = () => {
	ctx.filter = 'contrast(20)';
	ctx.drawImage(img,0,0);
}




