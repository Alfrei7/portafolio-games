document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const scale = 10;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    let snake;
    let fruit;
    let gameOver = false;

    function setup() {
        snake = new Snake();
        fruit = new Fruit();
        fruit.pickLocation();

        window.setInterval(() => {
            if (!gameOver) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                fruit.draw();
                snake.update();
                snake.draw();

                snake.checkCollision();
            }
        }, 100);
    }

    setup();

    window.addEventListener("keydown", (event) => {
        const direction = event.key.replace("Arrow", "");
        snake.changeDirection(direction);
    });

    document.getElementById("restartButton").addEventListener("click", () => {
        snake = new Snake();
        fruit = new Fruit();
        fruit.pickLocation();
        gameOver = false;
        document.getElementById("overlay").classList.add("hidden");
    });

    function Snake() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        this.total = 0;
        this.tail = [];

        this.draw = () => {
            ctx.fillStyle = "#61C14E";

            for (let i = 0; i < this.tail.length; i++) {
                ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
            }

            ctx.fillRect(this.x, this.y, scale, scale);
        };

        this.update = () => {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }

            this.tail[this.total - 1] = { x: this.x, y: this.y };

            this.x += this.xSpeed;
            this.y += this.ySpeed;

            if (this.x >= canvas.width) {
                this.x = 0;
            }

            if (this.y >= canvas.height) {
                this.y = 0;
            }

            if (this.x < 0) {
                this.x = canvas.width - scale;
            }

            if (this.y < 0) {
                this.y = canvas.height - scale;
            }

            // Actualizar la puntuación cuando la serpiente come una fruta
            if (this.eat(fruit)) {
                fruit.pickLocation(); // Elige una nueva ubicación para la fruta
            }
        };

        this.changeDirection = (direction) => {
            switch (direction) {
                case "Up":
                    if (this.ySpeed !== scale * 1) {
                        this.xSpeed = 0;
                        this.ySpeed = -scale * 1;
                    }
                    break;
                case "Down":
                    if (this.ySpeed !== -scale * 1) {
                        this.xSpeed = 0;
                        this.ySpeed = scale * 1;
                    }
                    break;
                case "Left":
                    if (this.xSpeed !== scale * 1) {
                        this.xSpeed = -scale * 1;
                        this.ySpeed = 0;
                    }
                    break;
                case "Right":
                    if (this.xSpeed !== -scale * 1) {
                        this.xSpeed = scale * 1;
                        this.ySpeed = 0;
                    }
                    break;
            }
        };

        this.eat = (fruit) => {
            if (this.x === fruit.x && this.y === fruit.y) {
                this.total++;
                return true;
            }
            return false;
        };

        this.checkCollision = () => {
            for (let i = 0; i < this.tail.length; i++) {
                if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                    this.total = 0;
                    this.tail = [];
                    gameOver = true;
                    document.getElementById("overlay").classList.remove("hidden");
                    document.getElementById("gameOverText").innerText = "Game Over";
                }
            }
        };
    }

    function Fruit() {
        this.x;
        this.y;

        this.pickLocation = () => {
            this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale;
            this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        };

        this.draw = () => {
            ctx.fillStyle = "#FF2400";
            ctx.fillRect(this.x, this.y, scale, scale);
        };
    }
});