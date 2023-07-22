<template>
  <h1 class="text-red">hello</h1>
  <div class="q-mt-lg summaryDiv">
    <q-card class="summary-card">
      <q-card-section>
        <div class="text-h6">Summary</div>
      </q-card-section>
      <q-card-section>
        <div class="text-body1 summaryText">{{ this.summary }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      OPENAI_API_KEY: "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",
      summary: "",
      response: "",
    };
  },
  mounted() {
    this.getTranscript(window.location.href);
  },
  methods: {
    async completionCall(input) {
      // Your existing completionCall logic
    },
    getTranscript(videoLink) {
      // Your existing getTranscript logic
    },
  },
};
</script>
