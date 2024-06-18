<template>
  <div class="help-page">
    <AppNavbar />
    <div class="help-container">
      <div
        class="help-header d-flex justify-content-between align-items-center py-5"
      >
        <div class="help-title">
          <h1 class="display-4"><strong>Help Center</strong></h1>
          <p class="lead">
            Find answers to your questions and learn how to use MealMastery
          </p>
        </div>
        <div class="help-image">
          <img src="@/assets/FAQ.png" alt="Help" class="img-fluid" />
        </div>
      </div>
      <div
        class="help-container d-flex align-items-center justify-content-center"
      >
        <div class="container mt-5">
          <b-row class="justify-content-center">
            <b-col cols="12" xl="8" class="mb-4">
              <b-accordion id="accordion-1" flush>
                <b-card no-body>
                  <b-card-header
                    header-tag="header"
                    role="tab"
                    class="w-100 p-0 d-flex align-items-center justify-content-between"
                  >
                    <b-button
                      block
                      v-b-toggle.accordion-1-1
                      variant="link"
                      class="text-left w-100 py-3 d-flex justify-content-between align-items-center"
                    >
                      Getting Started
                      <b-icon-chevron-down
                        :class="{ 'rotate-icon': isOpen1 }"
                      ></b-icon-chevron-down>
                    </b-button>
                  </b-card-header>
                  <b-collapse
                    id="accordion-1-1"
                    accordion="accordion-1"
                    role="tabpanel"
                    @show="isOpen1 = true"
                    @hide="isOpen1 = false"
                  >
                    <b-card-body>
                      <p>
                        <strong>How to Register:</strong> Click on the "Sign Up"
                        button on the top right corner and fill in your details
                        to create a new account.
                      </p>
                      <p>
                        <strong>How to Login:</strong> Click on the "Login"
                        button on the top right corner and enter your email and
                        password to access your account.
                      </p>
                      <p>
                        <strong>Basic Navigation:</strong> Use the navigation
                        bar to access recipes, meal planning, and your favorite
                        recipes.
                      </p>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body>
                  <b-card-header
                    header-tag="header"
                    role="tab"
                    class="w-100 p-0 d-flex align-items-center justify-content-between"
                  >
                    <b-button
                      block
                      v-b-toggle.accordion-1-2
                      variant="link"
                      class="text-left w-100 py-3 d-flex justify-content-between align-items-center"
                    >
                      Key Features
                      <b-icon-chevron-down
                        :class="{ 'rotate-icon': isOpen2 }"
                      ></b-icon-chevron-down>
                    </b-button>
                  </b-card-header>
                  <b-collapse
                    id="accordion-1-2"
                    accordion="accordion-1"
                    role="tabpanel"
                    @show="isOpen2 = true"
                    @hide="isOpen2 = false"
                  >
                    <b-card-body>
                      <p>
                        <strong>Searching for Recipes:</strong> Use the search
                        bar to find recipes based on ingredients, cuisine, or
                        meal type.
                      </p>
                      <p>
                        <strong>Adding Recipes to Favorites:</strong> Click the
                        heart icon on a recipe to add it to your favorites for
                        easy access later.
                      </p>
                      <p>
                        <strong>Meal Planning:</strong> Use the meal planning
                        feature to organize your meals for the week. Add recipes
                        to your meal plan and get a shopping list automatically
                        generated.
                      </p>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body>
                  <b-card-header
                    header-tag="header"
                    role="tab"
                    class="w-100 p-0 d-flex align-items-center justify-content-between"
                  >
                    <b-button
                      block
                      v-b-toggle.accordion-1-3
                      variant="link"
                      class="text-left w-100 py-3 d-flex justify-content-between align-items-center"
                    >
                      Account Management
                      <b-icon-chevron-down
                        :class="{ 'rotate-icon': isOpen3 }"
                      ></b-icon-chevron-down>
                    </b-button>
                  </b-card-header>
                  <b-collapse
                    id="accordion-1-3"
                    accordion="accordion-1"
                    role="tabpanel"
                    @show="isOpen3 = true"
                    @hide="isOpen3 = false"
                  >
                    <b-card-body>
                      <p>
                        <strong>Editing Your Profile:</strong> Go to your
                        profile page and click "Edit Profile" to update your
                        personal information.
                      </p>
                      <p>
                        <strong>Changing Your Password:</strong> Go to your
                        profile page and click "Edit Password" to change your
                        account password.
                      </p>
                      <p>
                        <strong>Deleting Your Account:</strong> If you wish to
                        delete your account, please contact our support team for
                        assistance.
                      </p>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body>
                  <b-card-header
                    header-tag="header"
                    role="tab"
                    class="w-100 p-0 d-flex align-items-center justify-content-between"
                  >
                    <b-button
                      block
                      v-b-toggle.accordion-1-4
                      variant="link"
                      class="text-left w-100 py-3 d-flex justify-content-between align-items-center"
                    >
                      Frequently Asked Questions
                      <b-icon-chevron-down
                        :class="{ 'rotate-icon': isOpen4 }"
                      ></b-icon-chevron-down>
                    </b-button>
                  </b-card-header>
                  <b-collapse
                    id="accordion-1-4"
                    accordion="accordion-1"
                    role="tabpanel"
                    @show="isOpen4 = true"
                    @hide="isOpen4 = false"
                  >
                    <b-card-body>
                      <p>
                        <strong
                          >Q: What should I do if I forget my password?</strong
                        ><br />A: Click on the "Forgot Password" link on the
                        login page and follow the instructions to reset your
                        password.
                      </p>
                      <p>
                        <strong
                          >Q: How do I report a problem or give
                          feedback?</strong
                        ><br />A: You can contact our support team via email at
                        <a href="mailto:support@mealmastery.com"
                          >support@mealmastery.com</a
                        >.
                      </p>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body>
                  <b-card-header
                    header-tag="header"
                    role="tab"
                    class="w-100 p-0 d-flex align-items-center justify-content-between"
                  >
                    <b-button
                      block
                      v-b-toggle.accordion-1-5
                      variant="link"
                      class="text-left w-100 py-3 d-flex justify-content-between align-items-center"
                    >
                      Contact Support
                      <b-icon-chevron-down
                        :class="{ 'rotate-icon': isOpen5 }"
                      ></b-icon-chevron-down>
                    </b-button>
                  </b-card-header>
                  <b-collapse
                    id="accordion-1-5"
                    accordion="accordion-1"
                    role="tabpanel"
                    @show="isOpen5 = true"
                    @hide="isOpen5 = false"
                  >
                    <b-card-body>
                      <p>
                        If you need further assistance, please contact our
                        support team at
                        <a href="mailto:support@mealmastery.com"
                          >support@mealmastery.com</a
                        >. We are here to help!
                      </p>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </b-accordion>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name: "HelpPage",
  components: {
    AppNavbar,
    AppFooter,
  },
  data() {
    return {
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,
      isOpen5: false,
    };
  },
};
</script>

<style scoped>
.help-header {
  background-color: #ffc107;
  color: white;
  padding: 20px;
}

.help-title {
  flex: 1;
}

.help-image {
  flex: 1;
}

.help-section {
  margin-bottom: 40px;
}

.help-section h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

.help-section ul {
  list-style-type: none;
  padding: 0;
}

.help-section ul li {
  margin-bottom: 10px;
}

.help-section ul li strong {
  color: #555;
}

.help-section p {
  font-size: 16px;
  line-height: 1.5;
  color: #555;
}

.help-section a {
  color: #ffc107;
}

.b-card-header {
  cursor: pointer;
}

.rotate-icon {
  transition: transform 0.3s ease;
  transform: rotate(180deg);
}
</style>
