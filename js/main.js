/**
 * WFM Bag Charm Workshop — Main JavaScript
 *
 * Handles:
 * - Form submission → Google Sheets (Apps Script POST)
 * - URL param parsing (?name= for invite flow, ?charm= for payment total)
 * - Share URL generation
 * - Copy-to-clipboard (bank account + share link)
 * - Success screen display
 * - Add-to-calendar (.ics generation)
 */

'use strict';

// =============================================
// CONFIG — Replace these with your real values
// =============================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9MuOzZNzf7WfPkKVbmekkitIj1sLnfwudiqmQidqmPSASaM0xvSELkFH6LnPMBioC/exec';

// Price is fixed: Rp 150.000 for 2 charms
const FIXED_PRICE = 150000;
const FIXED_CHARM_COUNT = '2';

// =============================================
// UTILITIES
// =============================================

/**
 * Get URL parameter value by name
 * @param {string} name
 * @returns {string|null}
 */
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/**
 * Capitalize first letter of a string
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format an IDR amount as "Rp 150.000"
 * @param {number} amount
 * @returns {string}
 */
function formatIDR(amount) {
  return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Generate share URL for a registrant
 * @param {string} name
 * @returns {string}
 */
function getShareUrl(name) {
  const base = getBaseUrl();
  const cleanName = encodeURIComponent(capitalize(name).trim());
  return `${base}invite.html?name=${cleanName}`;
}

/**
 * Get the base URL (origin + path, without filename)
 */
function getBaseUrl() {
  const path = window.location.pathname;
  const lastSlash = path.lastIndexOf('/');
  return window.location.origin + (lastSlash > 0 ? path.substring(0, lastSlash + 1) : path);
}

// =============================================
// INVITE FLOW — Populate invite banner on invite.html
// =============================================
function initInvitePage() {
  const inviterName = getUrlParam('name');
  if (!inviterName) return;

  const banner = document.getElementById('invite-banner');
  if (banner) {
    banner.textContent = `${capitalize(inviterName)} invited you to this event`;
    banner.style.display = 'block';
  }

  // Pre-fill referred_by hidden field
  const referredByField = document.getElementById('referred_by');
  if (referredByField) {
    referredByField.value = capitalize(inviterName);
  }

  // Update hero subline dynamically
  const heroSub = document.getElementById('hero-inviter-sub');
  if (heroSub) {
    heroSub.textContent = `${capitalize(inviterName)} thought you'd love this — a creative Friday morning of personalized paracord bag charm making, hosted by Women of Faith Ministries. 100% of net proceeds support WFM.`;
  }
}

// =============================================
// SUCCESS SCREEN — Populate share URL and payment total
// =============================================
function initSuccessScreen() {
  const name = getUrlParam('name');

  if (name) {
    const shareUrlInput = document.getElementById('share-url');
    if (shareUrlInput) {
      shareUrlInput.value = getShareUrl(name);
    }
  }

  // Payment total is fixed — Rp 150.000 — but allow ?charm= param to override display if needed
  const amountEl = document.getElementById('payment-amount');
  if (amountEl) {
    amountEl.textContent = formatIDR(FIXED_PRICE);
  }
}

function initInviteSuccessScreen() {
  // Same logic — share URL + payment total
  initSuccessScreen();
}

// =============================================
// COPY TO CLIPBOARD
// =============================================
function setupCopyButtons() {
  document.querySelectorAll('.btn-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-copy-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const originalText = btn.textContent;
      const successText = 'Copied!';

      const showSuccess = function () {
        btn.textContent = successText;
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2500);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(input.value).then(showSuccess).catch(function () {
          // Fallback
          input.select();
          document.execCommand('copy');
          showSuccess();
        });
      } else {
        input.select();
        document.execCommand('copy');
        showSuccess();
      }
    });
  });
}

// =============================================
// FORM VALIDATION
// =============================================
function validateForm(form) {
  let valid = true;

  // Clear previous errors
  form.querySelectorAll('.form-group').forEach(function (group) {
    group.classList.remove('error');
  });

  // Required fields
  const requiredFields = [
    { id: 'name', message: 'Please enter your name.' },
    { id: 'whatsapp', message: 'Please enter your WhatsApp number so we can confirm your spot.' },
    { id: 'inviting_friend', message: 'Please let us know if you\'re inviting a friend.' }
  ];

  requiredFields.forEach(function (field) {
    const el = document.getElementById(field.id);
    if (!el) return;

    if (!el.value || !el.value.trim()) {
      showError(el, field.message);
      valid = false;
    }
  });

  // WhatsApp basic validation: at least 6 digits, allowing spaces, dashes, parens, plus
  const whatsappEl = document.getElementById('whatsapp');
  if (whatsappEl && whatsappEl.value) {
    const digits = whatsappEl.value.replace(/\D/g, '');
    if (digits.length < 6) {
      showError(whatsappEl, 'That doesn\'t look like a valid phone number.');
      valid = false;
    }
  }

  // Email format check if provided
  const emailEl = document.getElementById('email');
  if (emailEl && emailEl.value && emailEl.value.trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailEl.value.trim())) {
      showError(emailEl, 'Please enter a valid email address.');
      valid = false;
    }
  }

  return valid;
}

function showError(el, message) {
  const group = el.closest('.form-group');
  if (!group) return;
  group.classList.add('error');
  const errorEl = group.querySelector('.error-msg');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}

// =============================================
// FORM SUBMISSION → Google Sheets
// =============================================
async function submitToGoogleSheets(data) {
  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return true;
  } catch (err) {
    console.error('Form submission error:', err);
    return false;
  }
}

// =============================================
// FORM HANDLING
// =============================================
function setupForm() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('.btn-primary');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.classList.add('loading');

    const inviterName = getUrlParam('name');
    const nameValue = document.getElementById('name').value.trim();

    const formData = {
      name: nameValue,
      whatsapp: document.getElementById('whatsapp') ? document.getElementById('whatsapp').value.trim() : '',
      email: document.getElementById('email') ? document.getElementById('email').value.trim() : '',
      charmCount: FIXED_CHARM_COUNT,
      charmPrice: FIXED_PRICE,
      invitingFriend: document.querySelector('input[name="inviting_friend"]:checked')
        ? document.querySelector('input[name="inviting_friend"]:checked').value
        : '',
      referredBy: inviterName ? capitalize(inviterName) : '',
      inviteShareUrl: getShareUrl(nameValue)
    };

    const success = await submitToGoogleSheets(formData);

    submitBtn.textContent = originalBtnText;
    submitBtn.classList.remove('loading');

    if (success) {
      // Redirect to success screen with name param
      const base = getBaseUrl();
      const isInviteFlow = !!inviterName;
      const successPage = isInviteFlow ? 'invite-success.html' : 'success.html';
      const params = `name=${encodeURIComponent(nameValue)}`;
      window.location.href = `${base}${successPage}?${params}`;
    } else {
      alert('Something went wrong. Please try again or WhatsApp Lodi or Adrianne directly.');
    }
  });
}

// =============================================
// ADD TO CALENDAR — Google Calendar link
// =============================================
function setupCalendarButton() {
  const btn = document.getElementById('add-to-calendar');
  if (!btn) return;

  // Event details for Google Calendar
  const eventTitle = 'Charmingly Yours — WFM Bag Charm Workshop';
  const eventDetails = 'A hands-on Friday morning of crafting personalized paracord bag charms. Hosted by Women of Faith Ministries. 100% of net proceeds support WFM.';
  const eventLocation = 'SPH, UG Seminar Room';

  // Friday 20 November 2026, 10:00 AM – 1:00 PM (Jakarta time, UTC+7)
  // Google Calendar uses YYYYMMDDTHHMMSSZ format (UTC)
  // 10:00 WIB = 03:00 UTC, 13:00 WIB = 06:00 UTC
  const startUtc = '20261120T030000Z';
  const endUtc   = '20261120T060000Z';

  const googleCalendarUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent(eventTitle) +
    '&dates=' + startUtc + '/' + endUtc +
    '&details=' + encodeURIComponent(eventDetails) +
    '&location=' + encodeURIComponent(eventLocation);

  btn.setAttribute('href', googleCalendarUrl);
  btn.setAttribute('target', '_blank');
  btn.setAttribute('rel', 'noopener noreferrer');
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', function () {
  setupForm();
  setupCopyButtons();
  setupCalendarButton();
  initInvitePage();
  initSuccessScreen();
  initInviteSuccessScreen();
});
