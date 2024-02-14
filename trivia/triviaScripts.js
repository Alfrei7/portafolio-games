document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion = 0;
    let errors = 0;

    const questions = [
        {
            question: "¿Qué lenguaje se utiliza para estilizar páginas web?",
            answers: ["CSS", "JavaScript", "HTML"],
            correctAnswer: "JavaScript"
        },
        {
            question: "¿Cuál de las siguientes etiquetas se utiliza para definir una lista no ordenada?",
            answers: ["ul", "ol", "li"],
            correctAnswer: "<ul>"
        },
        {
            question: "¿Qué función se utiliza en JavaScript para imprimir algo en la consola del navegador?",
            answers: ["console.log()", "print()", "debug()"],
            correctAnswer: "console.log()"
        },
        {
            question: "¿Cuál de los siguientes es un framework popular de JavaScript?",
            answers: ["React", "Bootstrap", "jQuery"],
            correctAnswer: "React"
        },
        {
            question: "¿Cuál de los siguientes no es un selector de CSS?",
            answers: ["#id", "&", ".class"],
            correctAnswer: "&"
        }
    ];

    function showQuestion(index) {
        const question = questions[index];
        const questionElem = document.querySelector('.question');
        questionElem.innerHTML = `
            <p>Pregunta ${index + 1}: ${question.question}</p>
            <div class="answers">
                ${question.answers.map(answer => `<button class="answer">${answer}</button>`).join('')}
            </div>
        `;

        document.querySelectorAll('.answer').forEach(button => {
            button.addEventListener('click', (e) => {
                const selectedAnswer = e.target.innerText;
                if (selectedAnswer === question.correctAnswer) {
                    e.target.classList.add('correct');
                    showMessage('¡Respuesta correcta!', 'success');
                    setTimeout(() => {
                        e.target.classList.remove('correct');
                        currentQuestion++;
                        if (currentQuestion < questions.length) {
                            showQuestion(currentQuestion);
                        } else {
                            showMessage('¡Has completado todas las preguntas con éxito!', 'success');
                            // Aquí podrías mostrar el resultado final o reiniciar el juego
                            currentQuestion = 0;
                            errors = 0;
                            showQuestion(currentQuestion);
                        }
                    }, 1000);
                } else {
                    e.target.classList.add('incorrect');
                    errors++;
                    document.getElementById('error').innerText = `Errores: ${errors}`;
                    if (errors >= 2) {
                        showMessage('Has alcanzado el límite de errores. ¡Intenta con la siguiente pregunta!', 'error');
                        errors = 0;
                        currentQuestion++;
                        if (currentQuestion < questions.length) {
                            showQuestion(currentQuestion);
                        } else {
                            showMessage('¡Has completado todas las preguntas con éxito!', 'success');
                            // Aquí podrías mostrar el resultado final o reiniciar el juego
                            currentQuestion = 0;
                            errors = 0;
                            showQuestion(currentQuestion);
                        }
                    }
                    setTimeout(() => {
                        e.target.classList.remove('incorrect');
                    }, 1000);
                }
            });
        });
    }

    function showMessage(message, type) {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message', type);
        messageContainer.innerText = message;
        document.body.appendChild(messageContainer);
        setTimeout(() => {
            messageContainer.remove();
        }, 3000);
    }

    showQuestion(currentQuestion);
});

