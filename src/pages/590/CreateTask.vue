<template>
  <q-page padding>
    <div id="q-app">
      <div class="flex flex-center column">
        <div
          class="col-6 bg-grey-2"
          style="min-height: 100%; width: 100%; padding: 1%;"
        >
          <div
            id="parent"
            class="fit row wrap justify-center items-start content-start"
            style="overflow: hidden;"
          >
            <div class="col-6" style="overflow: auto; min-width: 442px">
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
                      <q-select
                        v-model="question.questionType"
                        :options="questionTypes"
                        label="Тип задания"
                      />
                      <div v-if="question.questionType === 'Теория'">
                          <br>
                        <q-input
                          v-model="textarea"
                          filled
                          type="textarea"
                          placeholder="Теория"
                        />
                      </div>
                      <div v-if="question.questionType === 'Практика'">
                        <q-select
                          v-model="question.checkType"
                          :options="checkTypes"
                          label="Тип проверки"
                        />
                        <br>
                        <q-input
                          filled
                          v-model="question.question"
                          label="Вопрос *"
                          lazy-rules
                          :rules="[
                            val => (val && val.length > 0) || 'Введите вопрос!'
                          ]"
                        ></q-input>
                      <div v-if="question.checkType === 'Тип проверки 1'">
                        <ul style="list-style-type:none; padding: 0">
                          <li
                            v-for="(input, i) in question.answers"
                            v-bind:key="i"
                          >
                            <q-input
                              v-model="input.value"
                              placeholder="Вариант ответа"
                              @focus="
                                focusOnListElement(question.answers, i, index)
                              "
                              ><template v-slot:before>
                                <q-icon
                                  name="radio_button_unchecked"
                                /> </template
                              ><template v-slot:after>
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
                                    @click="deleteInputRow(index, i)"
                                  />
                                </div> </template
                            ></q-input>
                          </li>
                          <br />
                          <div
                            class="fit row wrap justify-start items-start content-start"
                          ></div>
                        </ul>
                      </div>
                      <div
                        v-if="question.checkType === 'Тип проверки 2'"
                      >
                        <ul style="list-style-type:none; padding: 0">
                          <li
                            v-for="(input, i) in question.answers"
                            v-bind:key="i"
                          >
                            <q-input
                              v-model="input.value"
                              placeholder="Вариант ответа"
                              @focus="
                                focusOnListElement(question.answers, i, index)
                              "
                              ><template v-slot:before>
                                <q-icon
                                  name="check_box_outline_blank"
                                /> </template
                              ><template v-slot:after>
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
                                    @click="deleteInputRow(index, i)"
                                  />
                                </div> </template
                            ></q-input>
                          </li>
                          <br />
                          <div
                            class="fit row wrap justify-start items-start content-start"
                          ></div>
                        </ul>
                      </div>
                      </div>
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
      formName: '',
      desc: '',
      questions: [
        {
          questionID: new Date().getTime(),
          questionType: 'Теория',
          question: '',
          checkType: '',
          answers: [{ value: '' }]
        }
      ],
      questionTypes: ['Теория', 'Практика'],
      checkTypes: ['Тип проверки 1', 'Тип проверки 2'],
      text: '',
      textarea: ''
    };
  },
  mounted() {
    this.id = this._uid;
  },
  methods: {
    deleteInputRow(questionIndex, answerIndex) {
      this.questions[questionIndex].answers.splice(answerIndex, 1);
    },
    focusOnListElement(array, indexOfAnswer, indexOfQuestion) {
      if (array.length - indexOfAnswer == 1) {
        this.questions[indexOfQuestion].answers.push({ value: '' });
      }
    },
    addQuestion() {
      this.questions.push({
        questionID: new Date().getTime(),
        questionType: 'Практика',
        question: '',
        answers: [{ value: '' }]
      });
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
    save() {
      console.log('Save');
      console.log('Questions', this.questions);
    }
  }
};
</script>