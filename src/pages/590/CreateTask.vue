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
                <li v-for="(task, index) in tasks" v-bind:key="index">
                  <q-card style="margin-bottom: 30px">
                    <q-card-section>
                      <q-select
                        v-model="task.taskType"
                        :options="taskTypes"
                        label="Тип задания"
                      />
                      <div v-if="task.taskType === 'Теория'">
                        <br />
                        <q-input
                          v-model="task.theory"
                          filled
                          type="textarea"
                          placeholder="Теория"
                        />
                      </div>
                      <div v-if="task.taskType !== 'Теория'">
                        <br />
                        <q-input
                          filled
                          v-model="task.task"
                          label="Вопрос *"
                          lazy-rules
                          :rules="[
                            val => (val && val.length > 0) || 'Введите вопрос!'
                          ]"
                        ></q-input>
                        <div v-if="task.taskType === '2 столбца'">
                          <div
                            class="fit row wrap justify-center items-start content-start"
                          >
                            <div class="col" style="overflow: auto"></div>
                            <div
                              class="col offset-1"
                              style="overflow: auto"
                            ></div>
                          </div>
                          <ul style="list-style-type:none; padding: 0">
                            <li
                              v-for="(input, i) in task.answers"
                              v-bind:key="i"
                            >
                              <div
                                class="fit row wrap justify-center items-start content-start"
                              >
                                <div class="col" style="overflow: auto">
                                  <q-input
                                    v-model="input.col1"
                                    placeholder="Слово"
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
                                    v-model="input.col2"
                                    placeholder="Окончание"
                                    @input="
                                      changeListElement(task.answers, i, index)
                                    "
                                    ><template v-slot:after>
                                      <div v-if="task.answers.length == 1">
                                        <q-btn
                                          round
                                          style="color: grey"
                                          icon="close"
                                          size="xs"
                                          disable
                                        />
                                      </div>
                                      <div v-if="task.answers.length > 1">
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
                          </ul>
                        </div>
                        <div v-if="task.taskType === 'Падежи'">
                          <div
                            class="fit row wrap justify-center items-start content-start"
                          >
                            <div class="col" style="overflow: auto">
                              <q-input
                                v-model="case1"
                                placeholder="Падеж"
                              ></q-input>
                            </div>
                            <div class="col offset-1" style="overflow: auto">
                              <q-input
                                v-model="case2"
                                placeholder="Падеж"
                              ></q-input>
                            </div>
                            <div class="col offset-1" style="overflow: auto">
                              <q-input
                                v-model="case3"
                                placeholder="Падеж"
                              ></q-input>
                            </div>
                          </div>
                          <ul style="list-style-type:none; padding: 0">
                            <li
                              v-for="(input, i) in task.answers"
                              v-bind:key="i"
                            >
                              <div
                                class="fit row wrap justify-center items-start content-start"
                              >
                                <div class="col" style="overflow: auto">
                                  <q-input
                                    v-model="input.col1"
                                    placeholder="Слово"
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
                                    v-model="input.col2"
                                    placeholder="Ответ"
                                  ></q-input>
                                </div>
                                <div
                                  class="col offset-1"
                                  style="overflow: auto"
                                >
                                  <q-input
                                    v-model="input.col3"
                                    placeholder="Ответ"
                                    @input="
                                      changeListElement(task.answers, i, index)
                                    "
                                    ><template v-slot:after>
                                      <div v-if="task.answers.length == 1">
                                        <q-btn
                                          round
                                          style="color: grey"
                                          icon="close"
                                          size="xs"
                                          disable
                                        />
                                      </div>
                                      <div v-if="task.answers.length > 1">
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
                          </ul>
                        </div>
                        <div v-if="task.taskType === 'Абзац'">
                          <br />
                          <q-input
                            v-model="task.paragraph"
                            filled
                            type="textarea"
                            placeholder="Текст"
                          />
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <div
                        class="fit row wrap justify-end items-start content-start"
                      >
                        <div v-if="tasks.length == 1">
                          <q-btn
                            round
                            style="color: grey"
                            icon="delete_forever"
                            size="s"
                            disable
                          />
                        </div>
                        <div v-if="tasks.length > 1">
                          <q-btn
                            round
                            style="color: grey"
                            icon="delete_forever"
                            size="s"
                            @click="deleteTask(index)"
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
                    @click="addTask"
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
      tasks: [
        {
          taskID: new Date().getTime(),
          taskType: '2 столбца',
          task: '',
          answers: [{ col1: '', col2: '', col3: '', col4: '' }],
          theory: '',
          paragraph: ''
        }
      ],
      case1: 'Именительный падеж',
      case2: 'Родительный падеж',
      case3: 'Творительный падеж',
      taskTypes: ['Теория', '2 столбца', 'Падежи', 'Абзац']
    };
  },
  mounted() {
    this.id = this._uid;
  },
  methods: {
    deleteInputRow(taskIndex, answerIndex) {
      this.tasks[taskIndex].answers.splice(answerIndex, 1);
    },
    changeListElement(array, indexOfAnswer, indexOfTask) {
      if (array.length - indexOfAnswer == 1) {
        this.tasks[indexOfTask].answers.push({
          col1: '',
          col2: '',
          col3: '',
          col4: ''
        });
      }
    },
    addTask() {
      this.tasks.push({
        taskID: new Date().getTime(),
        taskType: '2 столбца',
        task: '',
        answers: [{ col1: '', col2: '', col3: '', col4: '' }],
        theory: '',
        paragraph: ''
      });
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    save() {
      console.log('Save');
      console.log('Tasks', this.tasks);
    }
  }
};
</script>
