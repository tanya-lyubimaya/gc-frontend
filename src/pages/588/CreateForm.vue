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
                    v-model="text"
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
                    v-model="model"
                    :options="options"
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
                  <q-input filled v-model="text" placeholder="Краткий ответ" readonly />
                  <q-input v-model="text" filled type="textarea" placeholder="Развёрнутый ответ" readonly />
                </q-card-section>
                <q-input v-model="text" />
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
      text: "",
      model: null,
      options: [
        "Один из списка",
        "Несколько из списка",
        "Раскрывающийся список",
        "Текст (строка)",
        "Текст (абзац)"
      ],
      group: null,
      options2: [
        { label: "Battery too low", value: "bat" },
        { label: "Friend request", value: "friend", color: "green" },
        { label: "Picture uploaded", value: "upload", color: "red" }
      ]
    };
  }
};
</script>
