'use strict';

const copyButton = document.getElementById('copy-link');
const toast = document.getElementById('toast');
let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

async function copyCurrentLink() {
  const label = copyButton.querySelector('span');
  try {
    await navigator.clipboard.writeText(window.location.href);
    label.textContent = '链接已复制';
    showToast('分享链接已复制到剪贴板');
    setTimeout(() => {
      label.textContent = '复制分享链接';
    }, 2200);
  } catch {
    showToast('请从浏览器地址栏复制分享链接');
  }
}

copyButton?.addEventListener('click', copyCurrentLink);

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
