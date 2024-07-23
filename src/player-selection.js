document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            localStorage.setItem('playerType', type);
            window.location.href = 'results.html';
        });
    });
});
