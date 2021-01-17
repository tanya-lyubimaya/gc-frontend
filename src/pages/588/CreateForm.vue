<template>
  <q-page padding>
    <div id="q-app">
      <div class="flex flex-center column">
        <div
          class="row bg-grey-2"
          style="min-height: 100%; width: 80%; padding: 24px;"
        >
          <div
            id="parent"
            class="fit row wrap justify-center items-start content-start"
            style="overflow: hidden;"
          >
            <div class="col-6 bg-grey-2" style="overflow: auto; padding: 30px">
              <q-card style="margin-bottom: 30px">
                <q-card-section>
                  <q-input
                    filled
                    v-model="formName"
                    label="Новая форма *"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Введите название формы!'
                    ]"
                  ></q-input>
                  <q-input
                    v-model="desc"
                    label="Описание"
                    stack-label
                  ></q-input>
                </q-card-section>
              </q-card>
              <ul style="list-style-type:none; padding: 0">
                <li v-for="(question, index) in questions" v-bind:key="index">
                  <q-card style="margin-bottom: 30px">
                    <q-card-section>
                      <q-input
                        filled
                        v-model="question.question"
                        label="Вопрос *"
                        lazy-rules
                        :rules="[
                          val => (val && val.length > 0) || 'Введите вопрос!'
                        ]"
                      ></q-input>
                      <q-select
                        v-model="question.questionType"
                        :options="questionTypes"
                        label="Тип вопроса"
                        color="pink"
                      />
                      <div v-if="question.questionType === 'Один из списка'">
                        <ul style="list-style-type:none; padding: 0">
                          <li
                            v-for="(input, i) in question.answers"
                            v-bind:key="i"
                          >
                            <q-input
                              v-model="input.value"
                              placeholder="Вариант ответа"
                              @focus="focusOnListElement(question.answers, i, index)"
                              ><template v-slot:prepend>
                                <q-icon
                                  name="radio_button_unchecked"
                                /> </template
                              ><template v-slot:after>
                                <q-btn
                                  round
                                  style="color: grey"
                                  icon="close"
                                  size="xs"
                                  @click="deleteInputRow(index, i)"
                                /> </template
                            ></q-input>
                          </li>
                          <br />
                          <div
                            class="fit row wrap justify-start items-start content-start"
                          >
                          </div>
                        </ul>
                      </div>
                      <div
                        v-if="question.questionType === 'Несколько из списка'"
                      >
                        <ul style="list-style-type:none; padding: 0">
                          <li
                            v-for="(input, i) in question.answers"
                            v-bind:key="i"
                          >
                            <q-input
                              v-model="input.value"
                              placeholder="Вариант ответа"
                              @focus="focusOnListElement(question.answers, i, index)"
                              ><template v-slot:prepend>
                                <q-icon
                                  name="check_box_outline_blank"
                                /> </template
                              ><template v-slot:append>
                                <q-btn
                                  round
                                  style="color: grey"
                                  icon="close"
                                  size="xs"
                                  @click="deleteInputRow(index, i)"
                                /> </template
                            ></q-input>
                          </li>
                          <br />
                          <div
                            class="fit row wrap justify-start items-start content-start"
                          >
                          </div>
                        </ul>
                      </div>
                      <div
                        v-if="question.questionType === 'Раскрывающийся список'"
                      >
                        <ul style="list-style-type:none; padding: 0">
                          <li
                            v-for="(input, i) in question.answers"
                            v-bind:key="i"
                          >
                            <q-input
                              v-model="input.value"
                              placeholder="Вариант ответа"
                              @focus="focusOnListElement(question.answers, i, index)"
                              ><template v-slot:prepend> {{ i + 1 }} </template
                              ><template v-slot:append>
                                <q-btn
                                  round
                                  style="color: grey"
                                  icon="close"
                                  size="xs"
                                  @click="deleteInputRow(index, i)"
                                /> </template
                            ></q-input>
                          </li>
                          <br />
                          <div
                            class="fit row wrap justify-start items-start content-start"
                          >
                          </div>
                        </ul>
                      </div>
                      <div v-if="question.questionType === 'Текст (строка)'">
                        <br />
                        <q-input
                          filled
                          v-model="text"
                          placeholder="Краткий ответ"
                          readonly
                        />
                      </div>
                      <div v-if="question.questionType === 'Текст (абзац)'">
                        <br />
                        <q-input
                          v-model="textarea"
                          filled
                          type="textarea"
                          placeholder="Развёрнутый ответ"
                          readonly
                        />
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <div
                        class="fit row wrap justify-end items-start content-start"
                      >
                        <q-btn
                          round
                          style="color: grey"
                          icon="delete_forever"
                          size="s"
                          @click="deleteQuestion(index)"
                        />
                      </div>
                    </q-card-section>
                  </q-card>
                </li>
                <div class="row wrap justify-end items-start content-start">
                  <q-btn
                    round
                    style="background: #FF0080; color: white"
                    icon="add"
                    @click="addQuestion"
                  />
                </div>
              </ul>
            </div>
          </div>
          <div class="fit row wrap justify-center items-start content-start">
            <q-btn label="Сохранить" color="blue" @click="save" />
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
      formName: "",
      desc: "",
      questions: [
        {
          questionType: "Один из списка",
          question: "",
          answers: [{ value: "" }]
        }
      ],
      questionTypes: [
        "Один из списка",
        "Несколько из списка",
        "Раскрывающийся список",
        "Текст (строка)",
        "Текст (абзац)"
      ],
      text: "",
      textarea: ""
    };
  },
  methods: {
    deleteInputRow(questionIndex, answerIndex) {
      this.questions[questionIndex].answers.splice(answerIndex, 1);
    },
    focusOnListElement(array, indexOfAnswer, indexOfQuestion) {
      if (array.length - indexOfAnswer == 1) {
        this.questions[indexOfQuestion].answers.push({ value: "" });
      }
    },
    addQuestion() {
      this.questions.push({
        questionType: "Один из списка",
        question: "",
        answers: [{ value: "" }]
      });
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
    save() {
      console.log("Save");
      console.log("Questions", this.questions);
    }
  }
};
</script>
