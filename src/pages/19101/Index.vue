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
            <div class="col-12" style="overflow: auto; padding: 30px">
              <q-card>
                <q-card-section>
                  <q-select
                    v-model="chosenTask"
                    :options="tasks"
                    label="Выберите задание в Classroom"
                  />
                  <br />
                  <q-select
                    v-model="chosenQuestion"
                    :options="questions"
                    label="Выберите дополнительный вопрос"
                  />
                </q-card-section>
                <q-card-section>
                  <ul style="list-style-type:none; padding: 0">
                    <li
                      v-for="(question, index) in questions2"
                      v-bind:key="index"
                    >
                    <div v-if="question.question === chosenQuestion">
                      <q-card style="margin-bottom: 30px">
                        <q-card-section>
                          <q-input
                            v-model="question.question"
                            label="Вопрос"
                            stack-label
                          ></q-input>
                          <ul style="list-style-type:none; padding: 0">
                            <li
                              v-for="(answer, i) in question.answers"
                              v-bind:key="i"
                            >
                              <br />
                              <div
                                class="fit row wrap justify-start items-start content-start"
                                style="overflow: hidden;"
                              >
                                <div class="col-4">
                                  <q-input
                                    v-model="answer.value"
                                    label="Ответ"
                                    stack-label
                                    filled
                                    ><template v-slot:before>
                                      <div v-if="question.answers.length == 1">
                                        <q-btn
                                          round
                                          style="color: grey"
                                          icon="close"
                                          size="xs"
                                          disable
                                        />
                                      </div>
                                      <div v-if="question.answers.length > 1">
                                        <q-btn
                                          round
                                          style="color: grey"
                                          icon="close"
                                          size="xs"
                                          @click="deleteAnswer(i, index)"
                                        />
                                      </div>
                                    </template>
                                  </q-input>
                                </div>
                                <div class="col-2 offset-1">
                                  <q-badge color="secondary">
                                    Количество баллов
                                  </q-badge>
                                  <q-slider
                                    v-model="answer.grade"
                                    :min="0"
                                    :max="10"
                                    :step="0.5"
                                    snap
                                    label
                                    color="primary"
                                  />
                                </div>
                              </div>
                            </li>
                            <br />
                            <div
                              class="row wrap justify-start items-start content-start"
                            >
                              <q-btn
                                round
                                style="background: #FF0080; color: white"
                                icon="add"
                                @click="addAnswer(index)"
                              />
                            </div>
                          </ul>
                        </q-card-section>
                        <q-card-section>
                          <div
                            class="fit row wrap justify-end items-start content-start"
                          >
                            <div v-if="questions2.length == 1">
                              <q-btn
                                round
                                style="color: grey"
                                icon="delete_forever"
                                size="s"
                                disable
                              />
                            </div>
                            <div v-if="questions2.length > 1">
                              <q-btn
                                round
                                style="color: grey"
                                icon="delete_forever"
                                size="s"
                                @click="deleteQuestion(index)"
                              />
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                      </div>
                    </li>
                    <div
                      class="row wrap justify-center items-start content-start"
                    >
                      <q-btn
                        color="primary"
                        label="Добавить вопрос"
                        @click="addQuestion()"
                      />
                    </div>
                  </ul>
                </q-card-section>
              </q-card>
              <br />
              <div
                class="fit row wrap justify-end items-start content-start"
                style="overflow: hidden;"
              >
                <q-btn color="primary" label="Сохранить" @click="save()" />
              </div>
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
      tasks: ["Задание 1", "Задание 2", "Задание 3"],
      chosenTask: "",
      questions: ["Вопрос 1", "Вопрос 2", "Вопрос 3"],
      questions2: [
        {
          question: "Вопрос 1",
          answers: [{ value: "Ответ 1", grade: 0 }]
        }
      ],
      chosenQuestion: ""
    };
  },
  /*mounted() {
    this.$axios
      .get("http://194.67.113.251:5000/questions/")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        this.$q.notify({
          position: this.notificationsPos,
          icon: "warning",
          type: "negative",
          multiLine: true,
          message: "Ошибка"
        });
      });
  },*/
  methods: {
    addAnswer(questionIndex) {
      this.questions2[questionIndex].answers.push({
        value: "",
        grade: 0
      });
    },
    addQuestion() {
      this.questions2.push({
        question: "",
        answers: [{ value: "Ответ 1", grade: 0 }]
      });
    },
    deleteAnswer(indexOfAnswer, indexOfQuestion) {
      this.questions2[indexOfQuestion].answers.splice(indexOfAnswer, 1);
    },
    deleteQuestion(indexOfQuestion) {
      this.questions2.splice(indexOfQuestion, 1);
    },
    save() {
      console.log("Save");
    }
  }
};
</script>
