/* ============================================================
   PHOTO SQUARE — File Upload Handler
   ============================================================ */

export class FileUploadManager {
  constructor() {
    this.file   = null;
    this.base64 = null;
    this.init();
  }

  init() {
    const zone      = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');

    if (!zone) return;

    // Click anywhere on zone → open file picker
    zone.addEventListener('click', () => fileInput && fileInput.click());

    // Keyboard: Enter / Space also opens picker
    zone.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput && fileInput.click();
      }
    });

    // File input change
    if (fileInput) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files[0]) this.handleFile(fileInput.files[0]);
      });
    }

    // Drag & Drop
    zone.addEventListener('dragenter', e => { e.preventDefault(); });
    zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', e => {
      if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
    });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const f = e.dataTransfer.files[0];
      if (f) this.handleFile(f);
    });
  }

  handleFile(file) {
    const MAX = 20 * 1024 * 1024;
    const OK  = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff'];

    if (!OK.includes(file.type)) {
      alert('Please upload a JPG, PNG, WebP, or TIFF image.');
      return;
    }
    if (file.size > MAX) {
      alert('File is too large. Maximum size is 20 MB.');
      return;
    }

    this.file = file;
    const reader = new FileReader();
    reader.onload = e => {
      this.base64 = e.target.result;
      this.showPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  showPreview(dataUrl) {
    const zone       = document.getElementById('uploadZone');
    const previewImg = document.getElementById('previewImg');

    if (previewImg) previewImg.src = dataUrl;
    if (zone)       zone.classList.add('has-photo');

    // Fire event so dashboard can unlock tools
    document.dispatchEvent(new CustomEvent('photo-uploaded', {
      detail: { file: this.file, base64: this.base64 }
    }));
  }

  getBase64() { return this.base64; }
  getFile()   { return this.file;   }
}
