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
                        <q-stepper
                          v-model="step"
                          vertical
                          color="primary"
                          animated
                        >
                          <q-step
                            :name="1"
                            title="Выберите видео"
                            icon="done"
                            :done="step > 1"
                          >
                            <q-uploader
                              url="http://localhost:4444/upload"
                              style="max-width: 300px"
                            />
                            <q-stepper-navigation>
                              <q-btn
                                @click="videoLinkChosen()"
                                color="primary"
                                label="Continue"
                              />
                            </q-stepper-navigation>
                          </q-step>
                          <q-step
                            :name="2"
                            title="Создайте вопросы"
                            icon="settings"
                            :done="step > 2"
                          >
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
                                  <div
                                    class="col offset-1"
                                    style="overflow: auto"
                                  >
                                    <q-input
                                      v-model="input.value2"
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
                                  <div
                                    class="col offset-1"
                                    style="overflow: auto"
                                  >
                                    <q-input
                                      v-model="input.value3"
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
                                            @click="deleteInputRow(index, i)"
                                          />
                                        </div> </template
                                    ></q-input>
                                  </div>
                                </div>
                              </li>
                              <br />
                            </ul>
                            <q-stepper-navigation>
                              <q-btn
                                @click="step = 4"
                                color="primary"
                                label="Continue"
                              />
                              <q-btn
                                flat
                                @click="step = 1"
                                color="primary"
                                label="Back"
                                class="q-ml-sm"
                              />
                            </q-stepper-navigation>
                          </q-step>
                        </q-stepper>
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
          answers: [{ value: '', right: false, value2: '', value3: '' }]
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
      muted: true,
      step: 1,
      videoFile: null
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
          right: false,
          value2: '',
          value3: ''
        });
      }
    },
    addQuestion() {
      this.questions.push({
        questionID: new Date().getTime(),
        questionType: 'Один из списка',
        question: '',
        answers: [{ value: '', right: false, value2: '', value3: '' }]
      });
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
    videoLinkChosen() {
      this.step = 2;
      /*this.video.sources[0].src = 'http://localhost:4444/upload';
      //console.log(this.videoFile)
      //this.video.sources[0].src = this.videoFile;*/
    },
    getTimecode(indexOfQuestion, indexOfAnswer) {
      var myDate = new Date(this.$refs.myPlayer[0].currentTime() * 1000)
        .toISOString()
        .substr(11, 8);
      this.questions[indexOfQuestion].answers[indexOfAnswer].value3 = myDate;
    },
    save() {
      console.log('Save');
      console.log('Questions', this.questions);
    }
  }
};
</script>
