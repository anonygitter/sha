document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector("input");
    const output = document.querySelector("p");
    const button = document.querySelector("button");

    button.addEventListener("click", async function () {
        const text = input.value;
        if (text.trim() === "") {
            return;
        }

        let hashValue = await sha256Iterations(text, 1000);

        output.textContent = hashValue;

        // Copy to clipboard
        copyToClipboard(text);
    });

    function copyToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }

    // SHA-256 hash function with iterations
    async function sha256Iterations(input, iterations) {
        const textEncoder = new TextEncoder();
        const data = textEncoder.encode(input);

        let hashBuffer = data;

        for (let i = 0; i < iterations; i++) {
            hashBuffer = await crypto.subtle.digest('SHA-256', hashBuffer);
        }

        // Convert hash ArrayBuffer to hex string
        const hashArray = new Uint8Array(hashBuffer);
        const hashHex = Array.from(hashArray)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');

        return hashHex;
    }
});
