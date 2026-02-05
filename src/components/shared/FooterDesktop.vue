<template>
  <footer class="footer-wrapper mt-5">
    <div class="footer-box d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-3">
        <!-- <img src="/logo.svg" class="footer-logo" /> -->
        <span class="copy">© 2026 Nemovník, s.r.o.</span>
      </div>

      <div class="links d-flex gap-3">
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Security</a>
        <a href="#">Contact Support</a>
      </div>

      <div class="social d-flex gap-2">
        <!-- <img src="/icons/facebook.svg" class="icon" />
        <img src="/icons/instagram.svg" class="icon" /> -->
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-box {
  background: white;
  padding: 20px;
  border-radius: 18px;
  box-shadow: var(--soft-shadow);
}
.copy {
  color: #777;
  font-size: 0.9rem;
}
.links a {
  color: var(--text-primary);
  font-weight: 600;
  text-decoration: none;
}
.icon {
  width: 24px;
  height: 24px;
}
</style>
