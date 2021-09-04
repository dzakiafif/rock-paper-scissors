const player1Choice = document.querySelectorAll('[data-player1]');
const player2Choice = document.querySelectorAll('[data-player2]');
let match = document.querySelector('.match');
let versus = document.createElement('h2');
versus.textContent = 'VS';
match.appendChild(versus);
let case1 = document.createElement('img');
case1.setAttribute('id', 'case1');
case1.setAttribute('src', './frontend/assets/images/case1.jpg');
match.appendChild(case1);
let case2 = document.createElement('img');
case2.setAttribute('id', 'case2');
case2.setAttribute('src', './frontend/assets/images/case2.jpg');
match.appendChild(case2);
let case3 = document.createElement('img');
case3.setAttribute('id', 'case3');
case3.setAttribute('src', './frontend/assets/images/case3.jpg');
match.appendChild(case3);

Array.from(document.querySelectorAll('.match img')).forEach(function (val) {
  val.style.display = 'none';
});

// console.log(document.querySelector('.token').textContent);

player2Choice.forEach((el, i) => {
    el.classList.add('hide');
})

player1Choice.forEach((el, i) => {
    el.addEventListener('click', (e) => {
        fetch('/api/create-user-history', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${document.querySelector('.token').textContent}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                room: document.querySelector('.room').textContent,
                player1: document.querySelector('.player1').textContent,
                player1Choose: e.target.dataset.player1,
            })
        }).then((res) => res.json())
        .then((response) => {

            if(response.status === 200) {
                player1Choice.forEach((val, key) => {
                    val.classList.add('hide');
                })
            }

        }).catch((err) => {
            console.log(err);
        })
    })
})


fetch(`/api/show-user-history-room/${document.querySelector('.room').textContent}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${document.querySelector('.token').textContent}`,
        'Content-Type': 'application/json'
    },
}).then((res) => res.json())
.then((response) => {
    if(response.status === 200) {
        
    }
})