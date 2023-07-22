<template>
  <q-layout view="hhh lpR fFf">
    <q-header elevated class="bg-white text-black q-py-lg">
      <q-toolbar style="max-width: 1600px" class="center">
        <q-toolbar-title style="max-width: 1600px" class="center text-h5">
          <a style="width: 25%" @click="goHome()" class="logo text-primary" href="/">
            <q-avatar square>
              <img src="logo.png" alt="BookWise Logo" />
            </q-avatar>
            VidDigest
          </a>
        </q-toolbar-title>
        <a href="#/feedback" class="feedbackBtn">
          <q-chip
            clickable
            no-caps
            rounded
            label="Feedback"
            class="feedbackBtn"
            outline
            color="primary"
          />
        </a>
        <!-- <q-btn
          flat
          round
          color="secondary"
          icon="account_circle"
          class="account"
        >
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <div class="row no-wrap q-pa-md">
              <div class="column q-mt-sm" style="width: 125px">
                <a href="#/subscribe" class="center nodecor" style="width: 100%"
                  ><q-chip
                    clickable
                    class="text-subtitle1 q-mb-md premiumChip"
                    style="width: 95%"
                    ><div class="center">Premium</div></q-chip
                  ></a
                >
                <a href="#/history" class="center nodecor" style="width: 100%"
                  ><q-chip
                    clickable
                    outline
                    class="text-subtitle1 bigFont q-mb-md"
                    style="width: 95%"
                    ><div class="center">History</div></q-chip
                  ></a
                >
                <a href="#/settings" class="center nodecor" style="width: 100%"
                  ><q-chip
                    clickable
                    outline
                    class="text-subtitle1 bigFont q-mb-md"
                    style="width: 95%"
                    ><div class="center">Settings</div></q-chip
                  ></a
                >
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img v-if="photoURL" :src="photoURL" alt="Profile Picture" />
                  <q-icon v-else name="face" size="72px" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ displayName }}
                </div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                  @click="logout"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
        <a href="#/signin" class="signinBtn">
          <q-chip
            clickable
            no-caps
            rounded
            label="Sign In"
            class="signinBtn"
            outline
            color="secondary"
          />
        </a> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>

export default {
  //name: "BookSummaryPage",
  data() {
    return {
    }
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&family=Golos+Text&display=swap");
body {
  font-family: "Golos Text", sans-serif;
}
.center {
  margin: 0 auto;
}
.logo {
  cursor: pointer;
  font-family: "Fira Sans", sans-serif;
  text-decoration: none;
}
.bigFont {
  font-family: "Fira Sans", sans-serif;
  color: black;
  text-decoration: none;
}
.signinBtn {
  font-family: "Fira Sans", sans-serif;
  text-decoration: none;
}
.premiumChip {
  background: linear-gradient(90deg, #4084e6, #ff0970);
  color: white;
  font-family: "Fira Sans", sans-serif;
}
.feedbackBtn {
  font-family: "Fira Sans", sans-serif;
  text-decoration: none;
}
.nodecor {
  text-decoration: none;
}
</style>
