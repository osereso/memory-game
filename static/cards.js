const CARD_COVER = "fa-react";
const ALL_CARD_FRONT = ["fa-twitter", "fa-viber", "fa-twitter", "fa-facebook-messenger", "fa-rocketchat", "fa-discord",
    "fa-skype", "fa-slack", "fa-snapchat", "fa-weixin", "fa-linkedin", "fa-line", "fa-github",
    "fa-git-square", "fa-facebook-f", "fa-pinterest", "fa-spotify", "fa-youtube", "fa-safari", "fa-modx"];
let canClick = true;

window.onload = function () {
    let all_cards = document.getElementsByClassName('icons');
    let fronts = initCardFronts(ALL_CARD_FRONT, all_cards.length);
    for (let i = 0; i < all_cards.length; i++) {
        all_cards[i].addEventListener('click', function () {
            if (canClick && this.classList.contains(CARD_COVER)) {
                flipCard(this, fronts[i]);
                clickCounter++;
                let flippedCards = document.getElementsByClassName('flipped');
                if (flippedCards.length === 2) {
                    if (checkCards(flippedCards)) {
                        matchCards(flippedCards);
                        checkWin();
                    }
                    else {
                        canClick = false;
                        setTimeout(function () {
                            flipBackCards(flippedCards, fronts);
                            canClick = true;
                        }, 1500);
                    }
                }
            }

        });
    }
};

function checkCards(cards) {
    let same = true;
    let i = 1;
    while (i < cards.length && same) {
        for (let j = 0; j < cards[i].classList.length; j++) {
            if (!cards[i - 1].classList.contains(cards[i].classList[j])) {
                same = false;
                break;
            }
        }
        i++;
    }
    return same
}

function checkWin() {
    let allCard = document.getElementsByClassName('icons');
    let paired = document.getElementsByClassName('paired');
    if (paired.length === allCard.length) {
        alert('You won!');
        location.reload();
    }
}

function matchCards(cards) {
    while (cards.length) {
        cards[0].classList.add('paired');
        cards[0].classList.remove('flipped');
    }
}

function flipCard(card, front_img) {
    card.classList.add(front_img);
    card.classList.add('flipped');
    card.classList.remove(CARD_COVER);
}

function flipBackCards(cards, fronts) {
    let all_cards = document.getElementsByClassName('icons');
    let flipped = [];
    for (let i = 0; i < all_cards.length; i++) {
        let classes = all_cards[i].classList;
        if (classes.contains('flipped')) {
            flipped.push(i)
        }
    }
    let i = 0;
   while (cards.length) {
        cards[0].classList.add(CARD_COVER);
        cards[0].classList.remove(fronts[flipped[i]], 'flipped');
        i++;
   }
}

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function initCardFronts(frontCards, numberOfCards) {
    let fronts = frontCards;
    shuffle(fronts);
    fronts = fronts.slice(0, numberOfCards / 2);
    let tmp = [];
    for (let i = 0; i < fronts.length; i++) {
        tmp.push(fronts[i]);
        tmp.push(fronts[i]);
    }
    shuffle(tmp);
    fronts = tmp;
    return fronts;
}

let clickCounter = 0;

