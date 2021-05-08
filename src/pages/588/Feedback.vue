<template>
  <q-page padding>
    <div id="q-app">
      <div class="flex flex-center column">
        <div class="row" style="min-height: 100%; width: 80%; padding: 24px;">
          <div
            id="parent"
            class="fit row wrap justify-center items-start content-start"
            style="overflow: hidden;"
          >
            <div class="col-10" style="overflow: auto; padding: 30px">
              <q-card flat bordered style="margin-bottom: 30px">
                <q-card-section class="bg-primary text-white">
                  <div class="text-h6">Обратная связь</div>
                  <div class="text-subtitle2">Оставьте нам сообщение</div>
                </q-card-section>
                <div style="padding: 3%">
                <div style="overflow: auto">
                  <q-card-section>
                    <q-input filled v-model="email" type="email">
                      <template v-slot:before> <q-icon name="mail"/></template>
                    </q-input>
                  </q-card-section>
                </div>
                <div style="overflow: auto; width: 40%">
                  <q-card-section>
                    <q-select
                      outlined
                      v-model="chosenQuestionType"
                      :options="questionTypes"
                      label="Тема сообщения"
                    />
                  </q-card-section>
                </div>
                <q-card-section>
                  <q-input
                    filled
                    v-model="question"
                    placeholder="Заголовок *"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Введите заголовок!'
                    ]"
                  />
                  <br />
                  <q-input
                    v-model="desc"
                    filled
                    type="textarea"
                    placeholder="Развёрнутое описание"
                  />
                </q-card-section>
                <q-card-section>
                  <div
                    class="fit row wrap justify-center items-start content-start"
                  >
                    <q-btn label="Отправить" color="blue" @click="send(email, chosenQuestionType, question, desc)" />
                  </div>
                </q-card-section>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      questionTypes: ["Баг", "Улучшение", "Вопрос"],
      chosenQuestionType: "Баг",
      question: "",
      desc: "",
      email: this.$store.getters["user/userHSEEmail"]
    };
  },
  methods: {
    send(email, questionType, question, description) {}
  }
};
</script>
