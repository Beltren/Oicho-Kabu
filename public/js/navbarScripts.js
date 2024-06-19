document.addEventListener('DOMContentLoaded', () => {
    const qrCodeModal = document.getElementById('qr-code-modal');
    const closeQrCodeModal = document.getElementById('close-qr-code-modal');

    document.getElementById('connect-button').addEventListener('click', async () => {
        const response = await fetch('/ip/v4');
        const data = await response.json();
        const ipAddress = data.ip;
        const port = data.port;
        const qrUrl = `http://${ipAddress}:${port}/players-page`;

        new QRCode(document.getElementById("qr-code"), {
            text: qrUrl,
            width: 256, // Increase width
            height: 256 // Increase height
        });

        qrCodeModal.style.display = 'block';
    });

    closeQrCodeModal.onclick = () => {
        qrCodeModal.style.display = 'none';
        document.getElementById('qr-code').innerHTML = ''; // Clear the QR code
    };
});
