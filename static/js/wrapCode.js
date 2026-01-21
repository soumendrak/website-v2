const wrapText = document.getElementById('wrap-code-text').textContent.trim();
const unwrapText = document.getElementById('unwrap-code-text').textContent.trim();

document.querySelectorAll('pre:not(.mermaid)').forEach((block) => {
    const wrapBtn = document.createElement('button');
    wrapBtn.setAttribute('aria-label', wrapText);
    wrapBtn.setAttribute('title', wrapText);
    wrapBtn.className = 'wrap-code';

    // Find the code element
    const code = block.querySelector('code');

    wrapBtn.addEventListener('click', () => {
        const isWrapped = block.classList.toggle('wrapped');
        if (code) {
            code.classList.toggle('wrapped');
        }

        if (isWrapped) {
            wrapBtn.classList.add('unwrapping');
            wrapBtn.setAttribute('aria-label', unwrapText);
            wrapBtn.setAttribute('title', unwrapText);
        } else {
            wrapBtn.classList.remove('unwrapping');
            wrapBtn.setAttribute('aria-label', wrapText);
            wrapBtn.setAttribute('title', wrapText);
        }
    });

    block.prepend(wrapBtn);
});
