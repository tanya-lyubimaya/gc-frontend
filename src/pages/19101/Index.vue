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
                :options="questions2"
                label="Выберите дополнительный вопрос"
              />
              </q-card-section>
              <q-card-section>
              <ul style="list-style-type:none; padding: 0">
                <li v-for="(question, index) in questions2" v-bind:key="index">
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
                        <br>
                          <q-input
                            v-model="answer.value"
                            label="Ответ"
                            stack-label
                            filled
                          ></q-input>
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
                        </li>
                        <div
                          class="row wrap justify-end items-start content-start"
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
                  </q-card>
                </li>
                <div class="row wrap justify-center items-start content-start">
                  <q-btn
                    color="primary"
                    label="Добавить вопрос"
                    @click="addQuestion()"
                  />
                </div>
              </ul>
              <q-btn color="primary" label="Сохранить" @click="save()" />
              </q-card-section>
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
    save() {
      console.log("Save");
    }
  }
};
</script>
