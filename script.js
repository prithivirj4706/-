document.addEventListener('DOMContentLoaded', () => {
    // 1. Heart Particles
    const heartContainer = document.getElementById('particles-container');
    const createHeart = () => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.color = '#ff4d6d';
        heart.style.animation = `floatUp ${Math.random() * 5 + 10}s linear forwards`;
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 15000);
    };
    setInterval(createHeart, 500);

    // 2. Lock System
    const today = new Date();
    // For testing Day 8: const today = new Date('Feb 14, 2026');
    const curDay = today.getDate();
    const curMonth = today.getMonth();

    const checkLocks = () => {
        document.querySelectorAll('.invitation-card').forEach(card => {
            const section = card.closest('.day-section');
            const targetDate = parseInt(section.dataset.date);
            const targetMonth = parseInt(section.dataset.month);

            const isUnlocked = (curMonth > targetMonth) || (curMonth === targetMonth && curDay >= targetDate);
            if (isUnlocked) card.classList.remove('locked');
        });
    };
    checkLocks();

    // 3. Interactions
    const modal = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const proposalOverlay = document.getElementById('proposal-container');
    const celebOverlay = document.getElementById('celebration-overlay');
    const toast = document.getElementById('toast');

    const showToast = () => {
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 3000);
    };

    document.querySelectorAll('.invitation-card').forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('locked')) {
                showToast();
                return;
            }

            const day = card.dataset.day;
            if (day === '8') {
                proposalOverlay.style.display = 'flex';
            } else {
                const content = document.getElementById(`msg-${day}`).innerHTML;
                modalBody.innerHTML = content;
                modal.style.display = 'flex';
            }
        });
    });

    document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    // 4. THE PROPOSAL LOGIC (Like the GitHub repo)
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const proposalGif = document.getElementById('proposal-gif');
    const proposalQuestion = document.getElementById('proposal-question');

    let noClickCount = 0;
    const noMessages = [
        "No... 💔",
        "Are you sure? 🥺",
        "Really sure?? 😭",
        "Pookie please... 🧸",
        "Don't do this to me... 🥺",
        "I'm gonna cry... 😭",
        "You're breaking my heart! 💔",
        "Kutachi, please say YES! 🦁",
        "Okay, I give up... (just kidding, click yes!)"
    ];

    noBtn.addEventListener('click', () => {
        noClickCount++;

        // 1. Move the No button or change text
        if (noClickCount < noMessages.length) {
            noBtn.innerText = noMessages[noClickCount];
        }

        // 2. Make the YES button BIGGER
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (currentSize * 1.4) + 'px';
        yesBtn.style.padding = (parseFloat(window.getComputedStyle(yesBtn).padding) * 1.2) + 'px';

        // 3. Change GIF to something sad
        proposalGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHI1bm9uN3Nqbm9uN3Nqbm9uN3Nqbm9uN3Nqbm9uN3Nqbm9uJnB0PW0mY3Q9Zw/T9uDekxxOoGQqyRBjw/giphy.gif";
    });

    yesBtn.addEventListener('click', () => {
        proposalOverlay.style.display = 'none';
        celebOverlay.style.display = 'flex';

        // Final heart burst in console for fun
        console.log("%c ❤️ I LOVE YOU KUTACHI ❤️ ", "color: #ff4d6d; font-size: 30px; font-weight: bold;");
    });
});
