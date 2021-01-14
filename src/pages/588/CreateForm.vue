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
            <div class="col-6 bg-grey-2" style="overflow: auto;">
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
              <q-card style="margin-bottom: 30px">
                <q-card-section>
                  <q-input
                    filled
                    v-model="formName"
                    label="Вопрос *"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Введите вопрос!'
                    ]"
                  ></q-input>
                  <q-select
                    v-model="questionType"
                    :options="questionTypes"
                    label="Тип вопроса"
                  />
                  <q-option-group
                    :options="options2"
                    label="Notifications"
                    type="radio"
                    v-model="group"
                  />
                  <q-option-group
                    :options="options2"
                    label="Notifications"
                    type="checkbox"
                    v-model="group"
                  />
                  <q-select
                    v-model="model"
                    :options="options2"
                    label="Тип вопроса"
                  />
                  <q-input
                    filled
                    v-model="text"
                    placeholder="Краткий ответ"
                    readonly
                  />
                  <q-input
                    v-model="text"
                    filled
                    type="textarea"
                    placeholder="Развёрнутый ответ"
                    readonly
                  />
                </q-card-section>
                <q-input v-model="text" />
              </q-card>
              <q-card style="margin-bottom: 30px">
                <q-card-section>
                  <q-input
                    filled
                    v-model="formName"
                    label="Вопрос *"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Введите вопрос!'
                    ]"
                  ></q-input>
                  <q-select
                    v-model="questionType"
                    :options="questionTypes"
                    label="Тип вопроса"
                  />
                  <div v-if="questionType === 'Один из списка'">
                    <q-btn
                      round
                      style="background: #FF0080; color: white"
                      icon="add"
                      @click="addRadioInput"
                    />
                    <ul style="list-style-type:none">
                      <li
                        v-for="(input, index) in radioInputs"
                        v-bind:key="index"
                      >
                        <q-input
                          v-model="input.one"
                          placeholder="Вариант ответа"
                          ><template v-slot:prepend>
                            <q-icon name="radio_button_unchecked" /> </template
                        ><template v-slot:append>
                            <q-btn
                          round
                          style="color: grey"
                          icon="close"
                          @click="deleteRadioInput(index)"
                        /> </template
                        ></q-input>
                      </li>
                    </ul>
                  </div>
                  <div v-if="questionType === 'Несколько из списка'">
                    <q-input v-model="text" placeholder="Вариант ответа"
                      ><template v-slot:prepend>
                        <q-icon name="check_box_outline_blank" /> </template
                    ></q-input>
                    <q-input v-model="text" placeholder="Вариант ответа"
                      ><template v-slot:prepend>
                        <q-icon name="check_box_outline_blank" /> </template
                    ></q-input>
                  </div>
                  <div v-if="questionType === 'Раскрывающийся список'">
                    <q-input v-model="text" placeholder="Вариант ответа"
                      ><template v-slot:prepend> 1 </template></q-input
                    >
                    <q-input v-model="text" placeholder="Вариант ответа"
                      ><template v-slot:prepend> 2 </template></q-input
                    >
                  </div>
                  <div v-if="questionType === 'Текст (строка)'">
                    <q-input
                      filled
                      v-model="text"
                      placeholder="Краткий ответ"
                      readonly
                    />
                  </div>
                  <div v-if="questionType === 'Текст (абзац)'">
                    <q-input
                      v-model="text"
                      filled
                      type="textarea"
                      placeholder="Развёрнутый ответ"
                      readonly
                    />
                  </div>
                </q-card-section>
              </q-card>
              <q-btn
                round
                style="background: #FF0080; color: white"
                icon="add"
              />
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
      formName: "",
      desc: "",
      questionType: "Один из списка",
      questionTypes: [
        "Один из списка",
        "Несколько из списка",
        "Раскрывающийся список",
        "Текст (строка)",
        "Текст (абзац)"
      ],
      radioInputs: [],
      group: null,
      options2: [
        { label: "Battery too low", value: "bat" },
        { label: "Friend request", value: "friend", color: "green" },
        { label: "Picture uploaded", value: "upload", color: "red" }
      ],
      model: null,
      text: ""
    };
  },
  methods: {
    addRadioInput() {
      this.radioInputs.push({
        one: ""
      });
    },
    deleteRadioInput(index) {
        this.radioInputs.splice(index,1)
      }
  }
};
</script>
