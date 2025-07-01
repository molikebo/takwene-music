document.addEventListener("DOMContentLoaded", () => {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeSwitcher.textContent = '☀️';
        }
    }

    themeSwitcher.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeSwitcher.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeSwitcher.textContent = '☀️';
        }
    });
});
