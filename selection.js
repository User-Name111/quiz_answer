const questions = [
    "1",
    "2",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12"
];

const choices = [
    ["1","2","3"],
    ["1","2","3"],
    ["1","2","3"],
    ["1","2","3"],
    ["1","2","3"],
    ["1","2","3"],
    ["1","2","3"],
    ["1","2","3"],
    ["1","2","3"],
    ["1","2","3"],
    ["1","2","3"]
];

const correctAnswers = [
    3, 
    2, 
    3,
    3,
    2,
    3,
    1,
    3,
    1,
    3,
    3
];

// 통계 정보를 저장할 배열 초기화
const statistics = Array.from({ length: questions.length }, () => ({ total: 0, selected: [0, 0, 0] }));

function updateStatistics(questionIndex, choiceIndex) {
    statistics[questionIndex].total++;
    statistics[questionIndex].selected[choiceIndex]++;
    
    // 통계 정보 표시
    displayStatistics(questionIndex);
}

function displayStatistics(questionIndex) {
    const statsContainer = document.getElementById(`stats${questionIndex}`);
    statsContainer.innerHTML = `<p>`;

    const statsItemContainer = document.createElement('div');
    statsItemContainer.classList.add('stats-container');

    const total = statistics[questionIndex].total;
    for (let j = 0; j < statistics[questionIndex].selected.length; j++) {
        const ratio = (statistics[questionIndex].selected[j] / total) * 100 || 0;
        const isCorrect = (j + 1 === correctAnswers[questionIndex]);
        const lowerCorrectRate = (j + 1 === correctAnswers[questionIndex] && ratio < 33.3);

        const styleClass = (lowerCorrectRate) ? 'lower-correct-rate' : '';
        statsItemContainer.innerHTML += `
            <p class="stats-item ${styleClass}">
                ${j + 1}: ${ratio.toFixed(2)}%
                ${isCorrect ? ' (정답)' : ''}
            </p>`;
    }

    // 정답률을 정답률이 더 앞에 나오도록 표시
    statsItemContainer.innerHTML += `<p><strong>답변 수:</strong> ${total}</p>`;

    statsContainer.appendChild(statsItemContainer);
}

function toggleStatistics() {
    const statsContainers = document.querySelectorAll('.stats-container');
    const buttonText = document.querySelector('button');

    statsContainers.forEach(container => {
        container.style.display = (container.style.display === 'none') ? 'flex' : 'none';
    });

    buttonText.textContent = (buttonText.textContent === '통계 보이기') ? '통계 숨기기' : '통계 보이기';
}

for (let i = 0; i < questions.length; i++) {
    document.write(`<div class="question-container">`);
    document.write(`<p>${questions[i]}</p>`);

    for (let j = 0; j < choices[i].length; j++) {
        const buttonId = `q${i + 1}c${j + 1}`;
        document.write(`
            <button id="${buttonId}" onclick="updateStatistics(${i}, ${j});">${choices[i][j]}</button>
        `);
    }

    // 각 질문에 대한 통계를 표시할 컨테이너 추가
    document.write(`<div id="stats${i}"></div>`);
    document.write(`</div>`);
}