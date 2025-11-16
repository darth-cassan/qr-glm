let qrcode = null;

document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const downloadBtn = document.getElementById('downloadBtn');
    const errorDiv = document.getElementById('error');
    
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
    
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 3000);
    }
    
    function generateQRCode() {
        const url = urlInput.value.trim();
        
        if (!url) {
            showError('Please enter a URL');
            return;
        }
        
        let finalUrl = url;
        if (!isValidUrl(url)) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                finalUrl = 'https://' + url;
            } else {
                showError('Please enter a valid URL');
                return;
            }
        }
        
        if (!isValidUrl(finalUrl)) {
            showError('Please enter a valid URL');
            return;
        }
        
        errorDiv.classList.add('hidden');
        
        const qrcodeDiv = document.getElementById('qrcode');
        qrcodeDiv.innerHTML = '';
        
        qrcode = new QRCode(qrcodeDiv, {
            text: finalUrl,
            width: 256,
            height: 256,
            colorDark: '#2d3748',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        
        setTimeout(() => {
            qrcodeContainer.classList.remove('hidden');
        }, 100);
    }
    
    function downloadQRCode() {
        const canvas = document.querySelector('#qrcode canvas');
        if (!canvas) {
            showError('Please generate a QR code first');
            return;
        }
        
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
    }
    
    generateBtn.addEventListener('click', generateQRCode);
    
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });
    
    downloadBtn.addEventListener('click', downloadQRCode);
    
    urlInput.focus();
});