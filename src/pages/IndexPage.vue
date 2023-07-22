<template>
  <q-page class="flex flex-center column" padding>
    <img
      alt="VidDigest Logo"
      src="logo.png"
      style="width: 200px; height: 200px; margin-bottom: 25px;"
    />
    <h2
      class="bigFont text-h3 q-mb-lg text-center"
      style="font-weight: bold; margin-top: 0"
    >
      Master Youtube Videos in Minutes
    </h2>
    <q-form style="width: 100%; max-width: 650px" class="form">
      <q-input
        rounded
        outlined
        v-model="input"
        label="Enter Youtube Video Link"
        style="width: 100%; max-width: 650px"
        class="input-container"
      >
        <template v-slot:append>
          <q-btn
            flat
            class="arrow"
            icon="chevron_right"
            round
            type="submit"
            @click="getTranscript(input)"
          />
        </template>
      </q-input>
    </q-form>
    <div class="loading">
      <q-spinner-dots color="primary" size="50px" style="margin-top: 20px" />
    </div>
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
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      transcript: "",
      input: "",
      OPENAI_API_KEY: "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",
      summary: "",
      response: "",
    };
  },
  mounted() {
    //console.log("IndexPage mounted");
  },
  methods: {
    async completionCall(input) {
      let messages = [];
      messages.push({ role: "user", content: input });

      const apiKey = this.OPENAI_API_KEY;
      const apiEndpoint = "https://api.openai.com/v1/chat/completions"; // Update the endpoint according to the API version you're using

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      const data = {
        model: "gpt-4", // USE THIS MODEL FOR NOW FOR FASTER RESPONSES
        messages: messages,
      };

      let attempts = 3;
      let success = false;

      while (attempts > 0 && !success) {
        try {
          const response = await axios.post(apiEndpoint, data, { headers });
          const completion = response.data;
          this.response = completion.choices[0].message.content;
          messages.push({
            role: completion.choices[0].message.role,
            content: this.response,
          });
          console.log(this.response);
          success = true;
        } catch (error) {
          console.error("API call failed:", error);
          attempts--;
          if (attempts > 0) {
            console.log("Retrying... attempts left:", attempts);
          }
        }
      }

      if (!success) {
        console.error("Failed after 3 attempts");
        // Handle the case when all attempts fail
      }
    },
    getTranscript(videoLink) {
      document.querySelector(".summaryDiv").style.display = "none";
      document.querySelector(".loading").style.display = "block";
      const videoId = videoLink.split("v=")[1];
      axios
        .get(`http://127.0.0.1:5000/transcript?video_id=${videoId}`)
        .then((response) => {
          const transcriptArray = response.data;
          this.transcriptText = transcriptArray
            .map((entry) => entry.text)
            .join(" ");
          console.log(this.transcriptText);
          this.completionCall(
            "Please summarize this video, be in-depth: " + this.transcriptText
          ).then(() => {
            //console.log("Done");
            document.querySelector(".summaryDiv").style.display = "block";
            document.querySelector(".loading").style.display = "none";
            this.summary = this.response;
          });
        })
        .catch((error) => {
          document.querySelector(".loading").style.display = "none";
          console.error("Error fetching transcript:", error);
        });
    },
  },
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&family=Golos+Text&display=swap");
.center {
  margin: 0 auto;
}
.bigFont {
  font-family: "Fira Sans", sans-serif;
  color: black;
  text-decoration: none;
}
.input-container .arrow {
  cursor: pointer;
  transition: 0.4s all;
}
.input-container:hover .arrow {
  color: #000;
}
.summaryDiv {
  display: none;
}
.loading {
  display: none;
}
.summary-card {
  width: 100%;
  max-width: 650px;
}
.summaryText {
  line-height: 1.5;
  white-space: pre-wrap;
}
</style>
