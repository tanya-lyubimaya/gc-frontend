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
            <div class="col-8" style="overflow: auto; min-width: 442px">
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
                                </div>
                                <q-checkbox
                                  v-if="showRightAnswers"
                                  v-model="input.right"
                                  color="green"/></template
                            ></q-input>
                          </li>
                          <br />
                          <div
                            class="fit row wrap justify-start items-start content-start"
                          ></div>
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
                                </div>
                                <q-checkbox
                                  v-if="showRightAnswers"
                                  v-model="input.right"
                                  color="green"/></template
                            ></q-input>
                          </li>
                          <br />
                          <div
                            class="fit row wrap justify-start items-start content-start"
                          ></div>
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
                              @focus="
                                focusOnListElement(question.answers, i, index)
                              "
                              ><template v-slot:before> {{ i + 1 }} </template
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
                                </div>
                                <q-checkbox
                                  v-if="showRightAnswers"
                                  v-model="input.right"
                                  color="green"/></template
                            ></q-input>
                          </li>
                          <br />
                          <div
                            class="fit row wrap justify-start items-start content-start"
                          ></div>
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
                      <div v-if="question.questionType === 'Видео'">
                        <br />
                        <q-media-player
                          ref="myPlayer"
                          type="video"
                          :muted="muted"
                          :autoplay="true"
                          :show-big-play-button="true"
                          :sources="video.sources"
                        >
                        </q-media-player>
                        <br />
                        <ul style="list-style-type:none; padding: 0">
                          <li
                            v-for="(input, i) in question.answers"
                            v-bind:key="i"
                          >
                            <div
                              class="fit row wrap justify-center items-start content-start"
                            >
                              <div class="col" style="overflow: auto">
                                <q-input
                                  v-model="input.value"
                                  placeholder="Вопрос"
                                  @focus="
                                    focusOnListElement(
                                      question.answers,
                                      i,
                                      index
                                    )
                                  "
                                  ><template v-slot:before>
                                    {{ i + 1 }}
                                  </template></q-input
                                >
                              </div>
                              <div class="col offset-1" style="overflow: auto">
                                <q-input
                                  v-model="input.value"
                                  placeholder="Ответ"
                                  @focus="
                                    focusOnListElement(
                                      question.answers,
                                      i,
                                      index
                                    )
                                  "
                                ></q-input>
                              </div>
                              <div class="col offset-1" style="overflow: auto">
                                <q-input
                                  v-model="input.value"
                                  placeholder="Таймкод"
                                  @focus="
                                    focusOnListElement(
                                      question.answers,
                                      i,
                                      index
                                    )
                                  "
                                  ><template v-slot:before>
                                    <q-btn
                                      round
                                      size="sm"
                                      icon="schedule"
                                      style="color: green"
                                      @click="getTimecode(index, i)"
                                      ><q-tooltip>
                                        Использовать текущее время на видео
                                      </q-tooltip></q-btn
                                    ></template
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
                              </div>
                            </div>
                          </li>
                          <br />
                        </ul>
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
                <q-toggle
                  v-model="showRightAnswers"
                  label="Отображать правильные ответы"
                />
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
      showRightAnswers: false,
      questions: [
        {
          questionID: new Date().getTime(),
          questionType: 'Один из списка',
          question: '',
          answers: [{ value: '', right: false }]
        }
      ],
      questionTypes: [
        'Один из списка',
        'Несколько из списка',
        'Раскрывающийся список',
        'Текст (строка)',
        'Текст (абзац)',
        'Видео'
      ],
      text: '',
      textarea: '',
      video: {
        label: 'Tears of Steel',
        sources: [
          {
            src:
              'http://ftp.nluug.nl/pub/graphics/blender/demo/movies/ToS/tears_of_steel_720p.mov',
            type: 'video/mp4'
          }
        ]
      },
      muted: true
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
        this.questions[indexOfQuestion].answers.push({
          value: '',
          right: false
        });
      }
    },
    addQuestion() {
      this.questions.push({
        questionID: new Date().getTime(),
        questionType: 'Один из списка',
        question: '',
        answers: [{ value: '', right: false }]
      });
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
    getTimecode(index, i) {
      console.log(this.$refs.myPlayer[0].currentTime());
    },
    save() {
      console.log('Save');
      console.log('Questions', this.questions);
    }
  }
};
</script>
