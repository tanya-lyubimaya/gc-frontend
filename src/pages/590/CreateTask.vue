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
                          v-model="textarea2"
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
                                    placeholder="Вариант ответа"
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
                                    placeholder="Вариант ответа"
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
                        <div v-if="task.taskType === '3 столбца'">
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
                                    placeholder="Вариант ответа"
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
                                    placeholder="Вариант ответа"
                                  ></q-input>
                                </div>
                                <div
                                  class="col offset-1"
                                  style="overflow: auto"
                                >
                                  <q-input
                                    v-model="input.col3"
                                    placeholder="Вариант ответа"
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
                        <div v-if="task.taskType === 'Текстовое поле'">
                          <br />
                          <q-input
                            v-model="textarea"
                            filled
                            type="textarea"
                            placeholder="Развёрнутый ответ"
                            readonly
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
          answers: [{ col1: '', col2: '', col3: '' }]
        }
      ],
      taskTypes: ['Теория', '2 столбца', '3 столбца', 'Текстовое поле'],
      textarea: 'Ответ ученика...',
      textarea2: ''
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
        this.tasks[indexOfTask].answers.push({ col1: '', col2: '', col3: '' });
      }
    },
    addTask() {
      this.tasks.push({
        taskID: new Date().getTime(),
        taskType: '2 столбца',
        task: '',
        answers: [{ col1: '', col2: '', col3: '' }]
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