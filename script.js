document.addEventListener('DOMContentLoaded', () => {
  const pages = Array.from(document.querySelectorAll('.form-page'));
  const totalPages = 7;
  let current = 1;

  function showPage(n) {
    pages.forEach(p => p.classList.toggle('active', +p.dataset.page === n));
    document.getElementById('current-page').textContent = n;
  }

  // Next buttons
  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (current === 5) {
        computeScoreAndRender();
        current = 6;
      } else if (current < totalPages) {
        current++;
      }
      showPage(current);
    });
  });

  // Back buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (current > 1) current--;
      showPage(current);
    });
  });

  // Resume yes/no toggle
  document.querySelectorAll('input[name="hasResume"]').forEach(r => {
    r.addEventListener('change', () => {
      const upload = document.getElementById('upload-section');
      const tip = document.getElementById('no-resume-tip');
      if (r.value === 'no' && r.checked) {
        upload.style.display = 'none';
        tip.style.display = 'block';
      } else {
        upload.style.display = 'block';
        tip.style.display = 'none';
      }
    });
  });

  // Compute a random score 1–5 (replace with real logic)
  function computeScoreAndRender() {
    const score = Math.ceil(Math.random() * 5);
    document.getElementById('score-graphic').textContent = score + '/5';
  }

  // Download basic audit stub
  document.getElementById('download-report').addEventListener('click', () => {
    alert('Your basic audit PDF would download now.');
  });

  // Upgrade CTA
  document.getElementById('upgrade-btn').addEventListener('click', () => {
    window.location.href = '/subscribe.html';
  });

  // Initialize
  showPage(current);
});
