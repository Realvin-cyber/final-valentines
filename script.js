document.addEventListener("DOMContentLoaded", function() {
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const message = document.getElementById("message");
    const bgMusic = document.getElementById("bg-music");
    const noResponse = document.getElementById("no-response");
    const noMessage = document.getElementById("no-message");
    const noGif = document.getElementById("no-gif");

    const giphyApiKey = '1yAOmWH5uSPMwVCPz9DG6W0ukBqCDlXE'; // Replace with your GIPHY API key
    const randomMessages = [
        "Oh no! Don't break my heart! 💔",
        "Are you sure? 😢",
        "Please reconsider! 🥺",
        "You're missing out! 😞",
        "Give love a chance! ❤️"
    ];

    let moveCount = 0;

    yesBtn.addEventListener("click", function() {
        message.classList.remove("hidden");
        noResponse.classList.add("hidden");
        startConfetti();
        bgMusic.play();
    });

    noBtn.addEventListener("click", function() {
        displayRandomNoResponse();
    });

    function displayRandomNoResponse() {
        const randomIndex = Math.floor(Math.random() * randomMessages.length);
        noMessage.textContent = randomMessages[randomIndex];
        fetchRandomGif().then(gifUrl => {
            noGif.src = gifUrl;
            noResponse.classList.remove("hidden");
        });
    }

    async function fetchRandomGif() {
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}&tag=crying&rating=g`);
        const data = await response.json();
        return data.data.images.original.url;
    }

    function startConfetti() {
        const canvas = document.getElementById("confetti");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.classList.remove("hidden");

        const particles = [];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 5 + 2,
                d: Math.random() * Math.PI * 2
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "pink";
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
                ctx.fill();
            });

            update();
            requestAnimationFrame(draw);
        }

        function update() {
            particles.forEach(p => {
                p.y += Math.cos(p.d) + 1 + p.r / 2;
                p.x += Math.sin(p.d) * 2;

                if (p.y > canvas.height) {
                    p.y = -10;
                    p.x = Math.random() * canvas.width;
                }
            });
        }

        draw();
    }
});
