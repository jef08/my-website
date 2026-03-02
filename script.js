const canvas = document.getElementById("starNet"); 
const ctx = canvas.getContext("2d"); //get the 2d drawing surface//
const stars=[];
const STAR_COUNT=300; //total stars//
const mouse = { x: null, y:null};

const allWindows = document.querySelectorAll('#skyline .building-wrap div');

setInterval(() => {
  allWindows.forEach(win => {
    if(Math.random() > 0.5) win.style.background = "#f5d76e";
    else win.style.background = "#333";
  });
}, 500);

window.addEventListener("mousemove", e => {
    mouse.x=e.clientX;
    mouse.y=e.clientY;
});

function resizeCanvas() { //resize canvas to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stars.length = 0;
    for (let i=0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * canvas.width, //x = random starting points
        y: Math.random() * canvas.height, //y = random starting points 
        vx: (Math.random()-0.5) * 0.1 , //velocity
        vy:(Math.random()-0.5) * 0.05,
        r: Math.random() * 1.5+.5, //radius of the star
        opacity: Math.random() * 0.5 + 0.3, //random opacity
        glow: Math.random()*5+2,
    })
}
}

window.addEventListener("resize", resizeCanvas); //make resizing responsive
resizeCanvas();

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    stars.forEach(star=> {
        star.x += star.vx; //move stars around based on their velocity
        star.y += star.vy;

        if (star.x < 0) star.x=canvas.width; 
        if (star.x > canvas.width) star.x=0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x,star.y, star.r, 0, Math.PI * 2);
        ctx.shadowBlur = star.glow;
        ctx.shadowColor='rgba(242, 252, 255, 0.7)'
        ctx.fillStyle = `rgba(197, 240, 255, ${star.opacity})`;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        const dxMouse = star.x - mouse.x;
        const dyMouse = star.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);

        if(distMouse < 100) {
            star.x += dxMouse * .001;
            star.y += dyMouse * .001;
        }
    })
    requestAnimationFrame(animate);
}

animate();