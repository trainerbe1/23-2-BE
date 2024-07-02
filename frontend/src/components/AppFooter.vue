<template>
  <footer class="bg-warning text-dark py-4 mt-auto">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-3 mb-md-0">
          <h5 class="footer-brand">MealMastery</h5>
          <div class="social-media">
            <a href="https://www.facebook.com" class="social-icon">
              <img
                src="@/assets/facebook.svg"
                alt="Facebook"
                width="24"
                height="24"
              />
            </a>
            <a href="https://www.whatsapp.com" class="social-icon">
              <img
                src="@/assets/whatsapp.svg"
                alt="WhatsApp"
                width="24"
                height="24"
              />
            </a>
            <a href="https://www.youtube.com" class="social-icon">
              <img
                src="@/assets/youtube.svg"
                alt="YouTube"
                width="24"
                height="24"
              />
            </a>
            <a href="https://www.instagram.com" class="social-icon">
              <img
                src="@/assets/instagram.svg"
                alt="Instagram"
                width="24"
                height="24"
              />
            </a>
          </div>
        </div>
        <div class="col-md-2 mb-3 mb-md-0">
          <h6 class="footer-title">Company</h6>
          <ul class="list-unstyled">
            <li><a href="#" class="text-dark">About Us</a></li>
          </ul>
        </div>
        <div class="col-md-2 mb-3 mb-md-0">
          <h6 class="footer-title">Support</h6>
          <ul class="list-unstyled">
            <li><a href="#" class="text-dark">Help Center</a></li>
            <li><a href="#" class="text-dark">Contact Us</a></li>
            <li><a href="#" class="text-dark">FAQs</a></li>
          </ul>
        </div>
        <div class="col-md-2 mb-3 mb-md-0">
          <h6 class="footer-title">Legal</h6>
          <ul class="list-unstyled">
            <li><a href="#" class="text-dark">Terms of Service</a></li>
            <li><a href="#" class="text-dark">Privacy Policy</a></li>
            <li><a href="#" class="text-dark">Cookie Policy</a></li>
            <li><a href="#" class="text-dark">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col text-center">
          <p class="mb-0">©2024 MealMastery. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.footer-brand {
  font-family: "Pacifico", cursive;
  color: black;
}
.social-media {
  margin-top: 10px;
}
.social-icon {
  margin-right: 8px;
}

.social-icon:last-child {
  margin-right: 0;
}
.footer-title {
  font-weight: bold;
}
@media (max-width: 767px) {
  .footer-title {
    text-align: center;
  }
  .social-media {
    text-align: center;
  }
  .list-unstyled{
    text-align: center;
  }
}
</style>
