/* ============================================================
   PHOTO SQUARE — Portal Auth
   ============================================================ */

const VALID_CREDENTIALS = { id: 'bubla', password: 'bublabubla' };

export function initAuth() {
  const loginView    = document.getElementById('portalLogin');
  const dashView     = document.getElementById('portalDashboard');
  const loginBtn     = document.getElementById('portalLoginBtn');
  const logoutBtn    = document.getElementById('portalLogoutBtn');
  const idInput      = document.getElementById('portalId');
  const passInput    = document.getElementById('portalPassword');
  const errorEl      = document.getElementById('loginError');

  if (!loginView) return;

  // Check existing session
  if (sessionStorage.getItem('ps-portal-auth') === 'true') {
    showDashboard();
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const id   = idInput ? idInput.value.trim() : '';
      const pass = passInput ? passInput.value : '';

      if (id === VALID_CREDENTIALS.id && pass === VALID_CREDENTIALS.password) {
        sessionStorage.setItem('ps-portal-auth', 'true');
        showDashboard();
      } else {
        showError();
      }
    });
  }

  // Allow Enter key
  [idInput, passInput].forEach(input => {
    if (input) input.addEventListener('keydown', e => {
      if (e.key === 'Enter') loginBtn && loginBtn.click();
    });
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('ps-portal-auth');
      dashView && dashView.classList.remove('active');
      loginView.style.display = 'flex';
      if (idInput) idInput.value = '';
      if (passInput) passInput.value = '';
    });
  }

  function showDashboard() {
    loginView.style.display = 'none';
    dashView && dashView.classList.add('active');
  }

  function showError() {
    if (errorEl) {
      errorEl.classList.add('show');
      errorEl.style.animation = 'none';
      requestAnimationFrame(() => {
        errorEl.style.animation = 'shake 0.5s ease-in-out';
      });
      setTimeout(() => errorEl.classList.remove('show'), 4000);
    }
  }
}
