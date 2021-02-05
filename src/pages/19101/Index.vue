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
                    emit-value
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section>
                          <q-item-label v-html="scope.opt.value" />
                          <q-item-label caption>{{
                            scope.opt.label
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <br />
                  <q-select
                    v-model="chosenQuestion"
                    :options="questions"
                    label="Выберите дополнительный вопрос"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section>
                          <q-item-label v-html="scope.opt.label" />
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-card-section>
                <q-card-section>
                  <ul style="list-style-type:none; padding: 0">
                    <li
                      v-for="(question, index) in questions"
                      v-bind:key="index"
                    >
                      <div v-if="question.label == chosenQuestion.label">
                        <q-card style="margin-bottom: 30px">
                          <q-card-section>
                            <q-input
                              v-model="question.label"
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
                                        <div
                                          v-if="question.answers.length == 1"
                                        >
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
                              <div v-if="questions.length == 1">
                                <q-btn
                                  round
                                  style="color: grey"
                                  icon="delete_forever"
                                  size="s"
                                  disable
                                />
                              </div>
                              <div v-if="questions.length > 1">
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
                    <div v-if="this.showAddQuestion">
                      <q-card-section>
                        <q-input
                          v-model="newQuestion.label"
                          label="Вопрос"
                          stack-label
                        ></q-input>
                        <ul style="list-style-type:none; padding: 0">
                          <li
                            v-for="(answer, i) in newQuestion.answers"
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
                                    <div v-if="newQuestion.answers.length == 1">
                                      <q-btn
                                        round
                                        style="color: grey"
                                        icon="close"
                                        size="xs"
                                        disable
                                      />
                                    </div>
                                    <div v-if="newQuestion.answers.length > 1">
                                      <q-btn
                                        round
                                        style="color: grey"
                                        icon="close"
                                        size="xs"
                                        @click="deleteAnswerOfNewQuestion(i)"
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
                              @click="addAnswerToNewQuestion()"
                            />
                          </div>
                        </ul>
                      </q-card-section>
                    </div>
                    <div
                      class="row wrap justify-center items-start content-start"
                    >
                      <div v-if="!showAddQuestion && chosenTask">
                        <q-btn
                          color="primary"
                          label="Добавить вопрос"
                          @click="addQuestion()"
                        />
                      </div>
                      <div v-if="!showAddQuestion && !chosenTask">
                        <q-btn
                          color="primary"
                          label="Добавить вопрос"
                          disable
                        />
                      </div>
                      <div v-if="showAddQuestion">
                        <q-btn
                          color="primary"
                          label="Сохранить"
                          @click="saveNewQuestion()"
                        />
                      </div>
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
      tasks: [],
      chosenTask: null,
      questions: [
        {
          label: "Вопрос 1",
          answers: [{ value: "Ответ 1", grade: 0 }]
        }
      ],
      chosenQuestion: "",
      showAddQuestion: false,
      newQuestion: {
        label: "Новый вопрос",
        answers: [{ value: "Ответ 1", grade: 0 }]
      }
    };
  },
  mounted() {
    this.$axios
      .get("http://194.67.113.251:5000/tasks", { withCredentials: false })
      .then(res => {
        this.tasks = res.data.map(opt => ({
          attempts: opt.attempts,
          classroom_id: opt.classroom_id,
          course: opt.course,
          course_id: opt.course_id,
          deadline: opt.deadline,
          label: opt.description,
          grader_id: opt.grader_id,
          id: opt.id,
          mode: opt.mode,
          value: opt.name,
          solution_filename: opt.solution_filename,
          start: opt.start,
          technology: opt.technology
        }));
        console.log(res.data);
        console.log(this.tasks);
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
  },
  methods: {
    addAnswer(questionIndex) {
      this.questions[questionIndex].answers.push({
        value: "",
        grade: 0
      });
    },
    addAnswerToNewQuestion() {
      this.newQuestion.answers.push({
        value: "",
        grade: 0
      });
    },
    addQuestion() {
      this.showAddQuestion = true;
      console.log(this.chosenQuestion);
    },
    deleteAnswer(indexOfAnswer, indexOfQuestion) {
      this.questions[indexOfQuestion].answers.splice(indexOfAnswer, 1);
    },
    deleteAnswerOfNewQuestion(indexOfAnswer) {
      this.newQuestion.answers.splice(indexOfAnswer, 1);
    },
    deleteQuestion(indexOfQuestion) {
      this.questions.splice(indexOfQuestion, 1);
      //this.questions.splice(indexOfQuestion, 1);
    },
    saveNewQuestion() {
      this.questions.push({
        label: this.newQuestion.label,
        answers: this.newQuestion.answers.slice()
      });
      (this.newQuestion.label = "Новый вопрос"),
        (this.newQuestion.answers = [{ value: "Ответ 1", grade: 0 }]);
      this.showAddQuestion = false;
    },
    save() {
      console.log("Save");
    }
  }
};
</script>
