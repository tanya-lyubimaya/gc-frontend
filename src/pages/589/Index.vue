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
              <q-stepper v-model="step" vertical color="primary" animated>
                <q-step
                  :name="1"
                  title="Назначение"
                  caption="Выбор LMS и курса"
                  icon="settings"
                  :done="step > 1"
                >
                  <div
                    class="fit row wrap justify-start items-start content-start"
                    style="overflow: hidden;"
                  >
                    <div class="col-4">
                      <q-select
                        outlined
                        v-model="chosenLMS"
                        :options="LMStypes"
                        label="LMS"
                      />
                      <br />
                      <q-select
                        outlined
                        v-model="chosenCourse"
                        :options="courses"
                        label="Выберите курс"
                      />
                    </div>
                  </div>
                  <q-stepper-navigation>
                    <div v-if="chosenCourse === ''">
                      <q-btn
                        @click="step = 2"
                        color="primary"
                        label="Далее"
                        disable
                      />
                    </div>
                    <div v-if="chosenCourse != ''">
                      <q-btn @click="step = 2" color="primary" label="Далее" />
                    </div>
                  </q-stepper-navigation>
                </q-step>
                <q-step
                  :name="2"
                  title="Вопросы"
                  caption="Добавление вопросов для грейдера"
                  icon="question_answer"
                  :done="step > 2"
                >
                  <div
                    class="fit row wrap justify-start items-start content-start"
                    style="overflow: hidden;"
                  >
                    <div class="col-6">
                      <ul style="list-style-type:none; padding: 0">
                        <li
                          v-for="(question, index) in chosenQuestions"
                          v-bind:key="index"
                        >
                          <q-card style="margin-bottom: 30px">
                            <q-card-section>
                              <q-select
                                v-model="question.label"
                                :options="questions"
                                label="Вопрос"
                              />
                            </q-card-section>
                            <q-card-section>
                              <q-badge color="secondary">
                                Коэффициент вопроса: (0.5 - 10)
                              </q-badge>
                              <q-slider
                                v-model="question.coefficient"
                                :min="0.5"
                                :max="10"
                                :step="0.5"
                                snap
                                label
                                color="primary"
                              />
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
                        <div
                          class="row wrap justify-end items-start content-start"
                        >
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
                  <q-stepper-navigation>
                    <q-btn @click="step = 3" color="primary" label="Далее" />
                    <q-btn
                      flat
                      @click="step = 1"
                      color="primary"
                      label="Назад"
                      class="q-ml-sm"
                    />
                  </q-stepper-navigation>
                </q-step>
                <q-step
                  :name="3"
                  title="Технологии"
                  caption="Выбор технологии и шаблона"
                  icon="build"
                  :done="step > 3"
                >
                  <div
                    class="fit row wrap justify-start items-start content-start"
                    style="overflow: hidden;"
                  >
                    <div class="col-4">
                      <q-select
                        outlined
                        v-model="chosenTechnology"
                        :options="technologies"
                        label="Технология"
                      />
                      <br />
                      <q-select
                        outlined
                        v-model="chosenTemplate"
                        :options="templates"
                        label="Код шаблона"
                      />
                      <br />
                      <q-badge color="secondary">
                        Коэффициент: (0.5 - 10)
                      </q-badge>
                      <q-slider
                        v-model="coefficient"
                        :min="0.5"
                        :max="10"
                        :step="0.5"
                        snap
                        label
                        color="primary"
                      />
                    </div>
                  </div>
                  <q-stepper-navigation>
                    <q-btn @click="step = 4" color="primary" label="Далее" />
                    <q-btn
                      flat
                      @click="step = 2"
                      color="primary"
                      label="Назад"
                      class="q-ml-sm"
                    />
                  </q-stepper-navigation>
                </q-step>
                <q-step
                  :name="4"
                  title="Файлы"
                  caption="Загрузка необходимых файлов"
                  icon="attach_file"
                  :done="step > 4"
                >
                  <div
                    class="fit row wrap justify-start items-start content-start"
                    style="overflow: hidden;"
                  >
                    <div class="col-4">
                      <div v-if="this.hasInputFiles">
                        <q-file
                          :value="inputFiles"
                          @input="updateInputFiles"
                          label="Выберите входные файлы"
                          outlined
                          multiple
                          clearable
                          style="max-width: 400px"
                        >
                          <template v-slot:file="{ index, file }">
                            <q-chip class="full-width q-my-xs">
                              <div class="ellipsis relative-position">
                                {{ file.name }}
                              </div>
                              <q-tooltip>
                                {{ file.name }}
                              </q-tooltip>
                            </q-chip>
                          </template>
                        </q-file>
                      </div>
                      <br />
                      <div v-if="this.hasOutputFiles">
                        <q-file
                          :value="outputFiles"
                          @input="updateOutputFiles"
                          label="Выберите выходные файлы"
                          outlined
                          multiple
                          clearable
                          style="max-width: 400px"
                        >
                          <template v-slot:file="{ index, file }">
                            <q-chip class="full-width q-my-xs">
                              <div class="ellipsis relative-position">
                                {{ file.name }}
                              </div>
                              <q-tooltip>
                                {{ file.name }}
                              </q-tooltip>
                            </q-chip>
                          </template>
                        </q-file>
                      </div>
                      <br />
                      <div v-if="this.hasAdditionalFiles">
                        <q-file
                          :value="additionalFiles"
                          @input="updateAdditionalFiles"
                          label="Выберите дополнительные файлы"
                          outlined
                          multiple
                          clearable
                          style="max-width: 400px"
                        >
                          <template v-slot:file="{ index, file }">
                            <q-chip class="full-width q-my-xs">
                              <div class="ellipsis relative-position">
                                {{ file.name }}
                              </div>
                              <q-tooltip>
                                {{ file.name }}
                              </q-tooltip>
                            </q-chip>
                          </template>
                        </q-file>
                      </div>
                    </div>
                  </div>
                  <q-stepper-navigation>
                    <q-btn color="primary" label="Готово" />
                    <q-btn
                      flat
                      @click="step = 3"
                      color="primary"
                      label="Назад"
                      class="q-ml-sm"
                    />
                  </q-stepper-navigation>
                </q-step>
              </q-stepper>
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
      step: 1,
      LMStypes: ["Google Classroom", "LMS 2", "LMS 3"],
      chosenLMS: "Google Classroom",
      courses: ["Программирование 2021", "Курс 2", "Курс 3"],
      chosenCourse: "",
      questions: [
        {
          questionID: new Date().getTime(),
          label: "Вопрос 1"
        },
        {
          questionID: new Date().getTime(),
          label: "Вопрос 2"
        },
        {
          questionID: new Date().getTime(),
          label: "Вопрос 3"
        }
      ],
      chosenQuestions: [],
      hasInputFiles: true,
      hasOutputFiles: true,
      hasAdditionalFiles: true,
      inputFiles: null,
      outputFiles: null,
      additionalFiles: null,
      technologies: ["FFmpeg", "ImageMagick", "ONVIF", "GStreamer", "Python"],
      chosenTechnology: "FFmpeg",
      templates: ["side_by_side", "Template 2", "Template 3"],
      chosenTemplate: "side_by_side",
      coefficient: 5
    };
  },
  mounted() {
    this.chosenQuestions.push({
      label: this.questions[0].label,
    });
  },
  computed: {
    isUploading() {
      return this.uploading !== null;
    },

    canUpload() {
      return (
        this.inputFiles !== null &&
        this.outputFiles !== null &&
        this.additionalFiles !== null
      );
    }
  },
  methods: {
    addQuestion() {
      this.chosenQuestions.push(this.questions[0]);
      console.log(this.chosenQuestions);
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },

    updateInputFiles(files) {
      this.inputFiles = files;
      this.uploadProgress = (files || []).map(file => ({
        error: false,
        color: "green-2",
        percent: 0,
        icon:
          file.type.indexOf("video/") === 0
            ? "movie"
            : file.type.indexOf("image/") === 0
            ? "photo"
            : file.type.indexOf("audio/") === 0
            ? "audiotrack"
            : "insert_drive_file"
      }));
    },
    updateOutputFiles(files) {
      this.outputFiles = files;
      this.uploadProgress = (files || []).map(file => ({
        error: false,
        color: "green-2",
        percent: 0,
        icon:
          file.type.indexOf("video/") === 0
            ? "movie"
            : file.type.indexOf("image/") === 0
            ? "photo"
            : file.type.indexOf("audio/") === 0
            ? "audiotrack"
            : "insert_drive_file"
      }));
    },
    updateAdditionalFiles(files) {
      this.additionalFiles = files;
      this.uploadProgress = (files || []).map(file => ({
        error: false,
        color: "green-2",
        percent: 0,
        icon:
          file.type.indexOf("video/") === 0
            ? "movie"
            : file.type.indexOf("image/") === 0
            ? "photo"
            : file.type.indexOf("audio/") === 0
            ? "audiotrack"
            : "insert_drive_file"
      }));
    }
  }
};
</script>
