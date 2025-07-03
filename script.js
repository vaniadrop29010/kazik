class Casino {
    constructor() {
        this.balance = 1000;
        this.selectedBet = null;
        this.selectedBetType = null;
        this.gameInProgress = false;
        
        // Блэкджек
        this.deck = [];
        this.playerHand = [];
        this.dealerHand = [];
        this.blackjackInProgress = false;
        
        this.initializeEventListeners();
        this.updateBalance();
    }

    initializeEventListeners() {
        // Слот машина
        document.getElementById('spin-btn').addEventListener('click', () => this.playSlots());
        
        // Рулетка
        document.querySelectorAll('.bet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectBet(e.target.dataset.type));
        });
        document.getElementById('spin-roulette').addEventListener('click', () => this.playRoulette());
        
        // Блэкджек
        document.getElementById('deal-btn').addEventListener('click', () => this.dealBlackjack());
        document.getElementById('hit-btn').addEventListener('click', () => this.hit());
        document.getElementById('stand-btn').addEventListener('click', () => this.stand());
    }

    updateBalance() {
        document.getElementById('balance').textContent = this.balance;
    }

    addToLog(message) {
        const log = document.getElementById('log');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
        log.insertBefore(entry, log.firstChild);
        
        // Ограничиваем количество записей
        if (log.children.length > 10) {
            log.removeChild(log.lastChild);
        }
    }

    // СЛОТ МАШИНА
    playSlots() {
        const bet = parseInt(document.getElementById('slot-bet').value);
        if (bet > this.balance) {
            alert('Недостаточно средств!');
            return;
        }

        this.balance -= bet;
        this.updateBalance();

        const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣'];
        const reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];

        // Анимация вращения
        reels.forEach(reel => {
            reel.style.animation = 'none';
            reel.offsetHeight; // Trigger reflow
            reel.style.animation = 'spin 1s ease-in-out';
        });

        setTimeout(() => {
            const results = [];
            reels.forEach(reel => {
                const symbol = symbols[Math.floor(Math.random() * symbols.length)];
                reel.textContent = symbol;
                results.push(symbol);
            });

            this.checkSlotWin(results, bet);
        }, 1000);
    }

    checkSlotWin(results, bet) {
        let winAmount = 0;
        
        if (results[0] === results[1] && results[1] === results[2]) {
            // Три одинаковых
            if (results[0] === '💎') winAmount = bet * 10;
            else if (results[0] === '7️⃣') winAmount = bet * 8;
            else if (results[0] === '🔔') winAmount = bet * 6;
            else winAmount = bet * 4;
        } else if (results[0] === results[1] || results[1] === results[2] || results[0])
class Casino {
    constructor() {
        this.balance = 1000;
        this.selectedBet = null;
        this.selectedBetType = null;
        this.gameInProgress = false;
        
        // Блэкджек
        this.deck = [];
        this.playerHand = [];
        this.dealerHand = [];
        this.blackjackInProgress = false;
        
        this.initializeEventListeners();
        this.updateBalance();
    }

    initializeEventListeners() {
        // Слот машина
        document.getElementById('spin-btn').addEventListener('click', () => this.playSlots());
        
        // Рулетка
        document.querySelectorAll('.bet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectBet(e.target.dataset.type));
        });
        document.getElementById('spin-roulette').addEventListener('click', () => this.playRoulette());
        
        // Блэкджек
        document.getElementById('deal-btn').addEventListener('click', () => this.dealBlackjack());
        document.getElementById('hit-btn').addEventListener('click', () => this.hit());
        document.getElementById('stand-btn').addEventListener('click', () => this.stand());
    }

    updateBalance() {
        document.getElementById('balance').textContent = this.balance;
    }

    addToLog(message) {
        const log = document.getElementById('log');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
        log.insertBefore(entry, log.firstChild);
        
        // Ограничиваем количество записей
        if (log.children.length > 10) {
            log.removeChild(log.lastChild);
        }
    }

    // СЛОТ МАШИНА
    playSlots() {
        const bet = parseInt(document.getElementById('slot-bet').value);
        if (bet > this.balance) {
            alert('Недостаточно средств!');
            return;
        }

        this.balance -= bet;
        this.updateBalance();

        const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣'];
        const reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];

        // Анимация вращения
        reels.forEach(reel => {
            reel.style.animation = 'none';
            reel.offsetHeight; // Trigger reflow
            reel.style.animation = 'spin 1s ease-in-out';
        });

        setTimeout(() => {
            const results = [];
            reels.forEach(reel => {
                const symbol = symbols[Math.floor(Math.random() * symbols.length)];
                reel.textContent = symbol;
                results.push(symbol);
            });

            this.checkSlotWin(results, bet);
        }, 1000);
    }

    checkSlotWin(results, bet) {
        let winAmount = 0;
        
        if (results[0] === results[1] && results[1] === results[2]) {
            // Три одинаковых
            if (results[0] === '💎') winAmount = bet * 10;
            else if (results[0] === '7️⃣') winAmount = bet * 8;
            else if (results[0] === '🔔') winAmount = bet * 6;
            else winAmount = bet * 4;
        } else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
            // Два одинаковых
            winAmount = bet * 2;
        }

        if (winAmount > 0) {
            this.balance += winAmount;
            this.updateBalance();
            this.addToLog(`Слоты: Выигрыш ${winAmount} монет! ${results.join(' ')}`);
        } else {
            this.addToLog(`Слоты: Проигрыш ${bet} монет. ${results.join(' ')}`);
        }
    }

    // РУЛЕТКА
    selectBet(betType) {
        document.querySelectorAll('.bet-btn').forEach(btn => btn.classList.remove('selected'));
        document.querySelector(`[data-type="${betType}"]`).classList.add('selected');
        this.selectedBetType = betType;
        document.getElementById('selected-bet').textContent = `Выбрано: ${this.getBetName(betType)}`;
    }

    getBetName(betType) {
        const names = {
            'red': 'Красное',
            'black': 'Черное',
            'even': 'Четное',
            'odd': 'Нечетное'
        };
        return names[betType];
    }

    playRoulette() {
        if (!this.selectedBetType) {
            alert('Выберите тип ставки!');
            return;
        }

        const bet = parseInt(document.getElementById('roulette-bet').value);
        if (bet > this.balance) {
            alert('Недостаточно средств!');
            return;
        }

        this.balance -= bet;
        this.updateBalance();

        const wheel = document.getElementById('roulette-wheel');
        const randomRotation = Math.floor(Math.random() * 360) + 1440; // Минимум 4 оборота
        wheel.style.transform = `rotate(${randomRotation}deg)`;

        setTimeout(() => {
            const winningNumber = Math.floor(Math.random() * 37); // 0-36
            const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(winningNumber);
            const isBlack = winningNumber !== 0 && !isRed;
            const isEven = winningNumber !== 0 && winningNumber % 2 === 0;
            const isOdd = winningNumber !== 0 && winningNumber % 2 === 1;

            let won = false;
            if (this.selectedBetType === 'red' && isRed) won = true;
            if (this.selectedBetType === 'black' && isBlack) won = true;
            if (this.selectedBetType === 'even' && isEven) won = true;
            if (this.selectedBetType === 'odd' && isOdd) won = true;

            if (won) {
                const winAmount = bet * 2;
                this.balance += winAmount;
                this.updateBalance();
                this.addToLog(`Рулетка: Выигрыш ${winAmount} монет! Число: ${winningNumber}`);
            } else {
                this.addToLog(`Рулетка: Проигрыш ${bet} монет. Число: ${winningNumber}`);
            }
        }, 3000);
    }

    // БЛЭКДЖЕК
    createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.deck = [];
        
        for (let suit of suits) {
            for (let rank of ranks) {
                this.deck.push({ suit, rank });
            }
        }
        
        // Перемешиваем колоду
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    getCardValue(card) {
        if (card.rank === 'A') return 11;
        if (['J', 'Q', 'K'].includes(card.rank)) return 10;
        return parseInt(card.rank);
    }

    calculateHandValue(hand) {
        let value = 0;
        let aces = 0;
        
        for (let card of hand) {
            if (card.rank === 'A') {
                aces++;
                value += 11;
            } else if (['J', 'Q', 'K'].includes(card.rank)) {
                value += 10;
            } else {
                value += parseInt(card.rank);
            }
        }
        
        // Обрабатываем тузы
        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }
        
        return value;
    }

    drawCard() {
        return this.deck.pop();
    }

    displayCard(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = `${card.rank}${card.suit}`;
        return cardElement;
    }

    updateScores() {
        document.getElementById('player-score').textContent = this.calculateHandValue(this.playerHand);
        document.getElementById('dealer-score').textContent = this.calculateHandValue(this.dealerHand);
    }

    dealBlackjack() {
        const bet = parseInt(document.getElementById('blackjack-bet').value);
        if (bet > this.balance) {
            alert('Недостаточно средств!');
            return;
        }

        this.balance -= bet;
        this.updateBalance();
        this.blackjackBet = bet;

        this.createDeck();
        this.playerHand = [];
        this.dealerHand = [];
        this.blackjackInProgress = true;

        // Очищаем руки
        document.getElementById('player-hand').innerHTML = '';
        document.getElementById('dealer-hand').innerHTML = '';
        document.getElementById('blackjack-result').textContent = '';

        // Раздаем карты
        this.playerHand.push(this.drawCard());
        this.dealerHand.push(this.drawCard());
        this.playerHand.push(this.drawCard());
        this.dealerHand.push(this.drawCard());

        // Показываем карты игрока
        this.playerHand.forEach(card => {
            document.getElementById('player-hand').appendChild(this.displayCard(card));
        });

        // Показываем только первую карту дилера
        document.getElementById('dealer-hand').appendChild(this.displayCard(this.dealerHand[0]));
        const hiddenCard = document.createElement('div');
        hiddenCard.className = 'card';
        hiddenCard.textContent = '?';
        hiddenCard.style.background = '#333';
        hiddenCard.style.color = 'white';
        document.getElementById('dealer-hand').appendChild(hiddenCard);

        this.updateScores();
        document.getElementById('dealer-score').textContent = this.getCardValue(this.dealerHand[0]);

        // Проверяем на блэкджек
        if (this.calculateHandValue(this.playerHand) === 21) {
            this.stand();
        } else {
            document.getElementById('deal-btn').disabled = true;
            document.getElementById('hit-btn').disabled = false;
            document.getElementById('stand-btn').disabled = false;
        }
    }

    hit() {
        this.playerHand.push(this.drawCard());
        document.getElementById('player-hand').appendChild(this.displayCard(this.playerHand[this.playerHand.length - 1]));
        
        const playerScore = this.calculateHandValue(this.playerHand);
        this.updateScores();
        
        if (playerScore > 21) {
            this.endBlackjack('Перебор! Дилер выигрывает.');
        } else if (playerScore === 21) {
            this.stand();
        }
    }

    stand() {
        // Показываем скрытую карту дилера
        document.getElementById('dealer-hand').innerHTML = '';
        this.dealerHand.forEach(card => {
            document.getElementById('dealer-hand').appendChild(this.displayCard(card));
        });

        // Дилер берет карты до 17
        while (this.calculateHandValue(this.dealerHand) < 17) {
            this.dealerHand.push(this.drawCard());
            document.getElementById('dealer-hand').appendChild(this.displayCard(this.dealerHand[this.dealerHand.length - 1]));
        }

        this.updateScores();

        const playerScore = this.calculateHandValue(this.playerHand);
        const dealerScore = this.calculateHandValue(this.dealerHand);

        let result = '';
        if (dealerScore > 21) {
            result = 'Дилер перебрал! Вы выиграли!';
            this.balance += this.blackjackBet * 2;
        } else if (playerScore > dealerScore) {
            result = 'Вы выиграли!';
            this.balance += this.blackjackBet * 2;
        } else if (playerScore === dealerScore) {
            result = 'Ничья!';
            this.balance += this.blackjackBet;
        } else {
            result = 'Дилер выиграл!';
        }

        this.endBlackjack(result);
    }

    endBlackjack(result) {
        document.getElementById('blackjack-result').textContent = result;
        document.getElementById('deal-btn').disabled = false;
        document.getElementById('hit-btn').disabled = true;
        document.getElementById('stand-btn').disabled = true;
        this.blackjackInProgress = false;
        this.updateBalance();
        this.addToLog(`Блэкджек: ${result}`);
    }
}
// Запускаем казино
const casino = new Casino()
