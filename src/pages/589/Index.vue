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
                  icon="create_new_folder"
                  :done="step > 2"
                >
                  <ul style="list-style-type:none; padding: 0">
                    <li
                      v-for="(question, index) in questions"
                      v-bind:key="index"
                    >
                      <q-card style="margin-bottom: 30px">
                        <q-card-section>
                          <q-input
                            filled
                            v-model="question.question"
                            label="Вопрос *"
                            lazy-rules
                            :rules="[
                              val =>
                                (val && val.length > 0) || 'Введите вопрос!'
                            ]"
                          ></q-input>
                          <br />
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
                    <div class="row wrap justify-end items-start content-start">
                      <q-btn
                        round
                        style="background: #FF0080; color: white"
                        icon="add"
                        @click="addQuestion"
                      />
                    </div>
                  </ul>
                  <q-stepper-navigation>
                    <q-btn @click="step = 4" color="primary" label="Далее" />
                    <q-btn
                      flat
                      @click="step = 1"
                      color="primary"
                      label="Back"
                      class="q-ml-sm"
                    />
                  </q-stepper-navigation>
                </q-step>
                <q-step :name="4" title="Шаблоны" icon="add_comment">
                  <q-file
                    :value="inputFiles"
                    @input="updateInputFiles"
                    label="Выберите входные файлы"
                    outlined
                    multiple
                    :clearable="!isUploading"
                    style="max-width: 400px"
                  >
                    <template v-slot:file="{ index, file }">
                      <q-chip
                        class="full-width q-my-xs"
                        :removable="
                          isUploading && uploadProgress[index].percent < 1
                        "
                        square
                        @remove="cancelFile(index)"
                      >
                        <q-linear-progress
                          class="absolute-full full-height"
                          :value="uploadProgress[index].percent"
                          :color="uploadProgress[index].color"
                          track-color="grey-2"
                        />

                        <q-avatar>
                          <q-icon :name="uploadProgress[index].icon" />
                        </q-avatar>

                        <div class="ellipsis relative-position">
                          {{ file.name }}
                        </div>

                        <q-tooltip>
                          {{ file.name }}
                        </q-tooltip>
                      </q-chip>
                    </template>

                    <template v-slot:after v-if="canUpload">
                      <q-btn
                        color="primary"
                        dense
                        icon="cloud_upload"
                        round
                        @click="upload"
                        :disable="!canUpload"
                        :loading="isUploading"
                      />
                    </template>
                  </q-file>
                  <q-file
                    :value="outputFiles"
                    @input="updateOutputFiles"
                    label="Выберите выходные файлы"
                    outlined
                    multiple
                    :clearable="!isUploading"
                    style="max-width: 400px"
                  >
                    <template v-slot:file="{ index, file }">
                      <q-chip
                        class="full-width q-my-xs"
                        :removable="
                          isUploading && uploadProgress[index].percent < 1
                        "
                        square
                        @remove="cancelFile(index)"
                      >
                        <q-linear-progress
                          class="absolute-full full-height"
                          :value="uploadProgress[index].percent"
                          :color="uploadProgress[index].color"
                          track-color="grey-2"
                        />

                        <q-avatar>
                          <q-icon :name="uploadProgress[index].icon" />
                        </q-avatar>

                        <div class="ellipsis relative-position">
                          {{ file.name }}
                        </div>

                        <q-tooltip>
                          {{ file.name }}
                        </q-tooltip>
                      </q-chip>
                    </template>

                    <template v-slot:after v-if="canUpload">
                      <q-btn
                        color="primary"
                        dense
                        icon="cloud_upload"
                        round
                        @click="upload"
                        :disable="!canUpload"
                        :loading="isUploading"
                      />
                    </template>
                  </q-file>
                  <q-file
                    :value="additionalFiles"
                    @input="updateAdditionalFiles"
                    label="Выберите дополнительнык файлы"
                    outlined
                    multiple
                    :clearable="!isUploading"
                    style="max-width: 400px"
                  >
                    <template v-slot:file="{ index, file }">
                      <q-chip
                        class="full-width q-my-xs"
                        :removable="
                          isUploading && uploadProgress[index].percent < 1
                        "
                        square
                        @remove="cancelFile(index)"
                      >
                        <q-linear-progress
                          class="absolute-full full-height"
                          :value="uploadProgress[index].percent"
                          :color="uploadProgress[index].color"
                          track-color="grey-2"
                        />

                        <q-avatar>
                          <q-icon :name="uploadProgress[index].icon" />
                        </q-avatar>

                        <div class="ellipsis relative-position">
                          {{ file.name }}
                        </div>

                        <q-tooltip>
                          {{ file.name }}
                        </q-tooltip>
                      </q-chip>
                    </template>

                    <template v-slot:after v-if="canUpload">
                      <q-btn
                        color="primary"
                        dense
                        icon="cloud_upload"
                        round
                        @click="upload"
                        :disable="!canUpload"
                        :loading="isUploading"
                      />
                    </template>
                  </q-file>
                  <q-stepper-navigation>
                    <q-btn color="primary" label="Finish" />
                    <q-btn
                      flat
                      @click="step = 2"
                      color="primary"
                      label="Back"
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
          question: "",
          coefficient: 0.5
        }
      ],
      uploadProgress: [],
      uploading: null,
      files: null,
      inputFiles: null,
      outputFiles: null,
      additionalFiles: null,

      question: "",
      desc: "",
      email: this.$q.sessionStorage.getItem("hse_email")
    };
  },
  computed: {
    isUploading() {
      return this.uploading !== null;
    },

    canUpload() {
      return this.files !== null;
    }
  },
  methods: {
    addQuestion() {
      this.questions.push({
        questionID: new Date().getTime(),
        question: "",
        coefficient: 0.5
      });
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
    cancelFile(index) {
      this.uploadProgress[index] = {
        ...this.uploadProgress[index],
        error: true,
        color: "orange-2"
      };
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
    },

    upload() {
      clearTimeout(this.uploading);

      const allDone = this.uploadProgress.every(
        progress => progress.percent === 1
      );

      this.uploadProgress = this.uploadProgress.map(progress => ({
        ...progress,
        error: false,
        color: "green-2",
        percent: allDone === true ? 0 : progress.percent
      }));

      this.__updateUploadProgress();
    },

    __updateUploadProgress() {
      let done = true;

      this.uploadProgress = this.uploadProgress.map(progress => {
        if (progress.percent === 1 || progress.error === true) {
          return progress;
        }

        const percent = Math.min(1, progress.percent + Math.random() / 10);
        const error = percent < 1 && Math.random() > 0.95;

        if (error === false && percent < 1 && done === true) {
          done = false;
        }

        return {
          ...progress,
          error,
          color: error === true ? "red-2" : "green-2",
          percent
        };
      });

      this.uploading =
        done !== true ? setTimeout(this.__updateUploadProgress, 300) : null;
    }
  },
  beforeDestroy() {
    clearTimeout(this.uploading);
  }
};
</script>
