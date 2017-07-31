
var scores, roundScore, activePlayer, gameState, diceRoll, winScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameState) {
        var dice = Math.floor(Math.random() * 6) + 1;

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            diceRoll.shift();
            diceRoll.push(dice);
            if (diceRoll[0] == 6 && diceRoll[1] == 6) {
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameState) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        scores[activePlayer] >= winScore ? (
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!',
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'),
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'),
            diceNone(),
            gameState = false
        ) : nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    diceRoll = [0, 0];
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceNone();
}

function diceNone() {
    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameState = true;
    diceRoll = [0, 0];
    winScore = document.querySelector('.win-score').value;
    winScore == 0 ? winScore = 100 : winScore = winScore ;

    diceNone();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
