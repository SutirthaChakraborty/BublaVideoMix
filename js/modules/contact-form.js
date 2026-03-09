/* ============================================================
   PHOTO SQUARE — Contact Form
   ============================================================ */

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successEl = document.querySelector('.contact__success');

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const name    = form.querySelector('#name').value.trim();
    const phone   = form.querySelector('#phone').value.trim();
    const service = form.querySelector('#service').value;
    const message = form.querySelector('#message').value.trim();

    const text = encodeURIComponent(
      `Hi Photo Square! 📸\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\n${message ? 'Message: ' + message : ''}`
    );
    window.open(`https://wa.me/919832008268?text=${text}`, '_blank');

    form.reset();
    if (successEl) {
      successEl.classList.add('show');
      setTimeout(() => successEl.classList.remove('show'), 6000);
    }
  });

  // Real-time validation
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });
}

function validateField(field) {
  const group = field.closest('.form-group');
  if (!group) return true;

  let valid = true;
  const msgEl = group.querySelector('.error-msg');

  if (field.required && !field.value.trim()) {
    valid = false;
    if (msgEl) msgEl.textContent = 'This field is required.';
  } else if (field.type === 'tel' && field.value && !/^[0-9]{10}$/.test(field.value.trim())) {
    valid = false;
    if (msgEl) msgEl.textContent = 'Enter a valid 10-digit phone number.';
  } else if (field.name === 'name' && field.value && field.value.trim().length < 2) {
    valid = false;
    if (msgEl) msgEl.textContent = 'Name must be at least 2 characters.';
  }

  if (valid) {
    field.classList.remove('error');
    group.classList.remove('has-error');
  } else {
    field.classList.add('error');
    group.classList.add('has-error');
  }

  return valid;
}

function validateForm(form) {
  let allValid = true;
  form.querySelectorAll('input[required], select[required]').forEach(field => {
    if (!validateField(field)) allValid = false;
  });
  return allValid;
}
