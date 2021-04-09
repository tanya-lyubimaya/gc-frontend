<template>
  <q-page padding>
    <div class="row justify-center" v-if="!loading && !loading_error">
      <div class="col-md-6">
        <q-card>
          <q-img
            src="~assets/nvt-header-parallax.jpg"
            basic
          >
            <div class="absolute-bottom text-h5">
              Сетевые видеотехнологии
            </div>
          </q-img>
          <q-card-section>
            <q-list bordered class="rounded-borders fit">
              <q-item-label header>Оценки за разделы курса</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="red" text-color="white" icon="movie_creation"/>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">FFMPEG</q-item-label>
                  <q-item-label caption lines="1">
                    4 лабораторные работы по ffmpeg
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-chip square>
                    <q-avatar rounded color="green" text-color="white">9</q-avatar>
                    баллов
                  </q-chip>
                  <!--                    <span class="text-weight-bold">9/10</span>-->
                </q-item-section>
              </q-item>
              <q-expansion-item>
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar icon="videocam" color="primary" text-color="white"/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">ONVIF</q-item-label>
                    <q-item-label caption lines="1">
                      3 лабораторные работы по ONVIF
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-chip square>
                      <q-avatar rounded color="orange" text-color="white">1</q-avatar>
                      балл
                    </q-chip>
                  </q-item-section>
                </template>

                <q-card>
                  <q-card-section>
                    <q-item clickable v-ripple>
                      <q-item-section avatar>
                        <q-avatar color="red" text-color="white" icon="warning_amber"/>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label lines="1">ONVIF-1</q-item-label>
                        <q-item-label caption lines="1">
                          Непрерывное и абсолютное движение, фокус
                        </q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-chip square>
                          <q-avatar rounded color="red" text-color="white">0</q-avatar>
                          баллов
                        </q-chip>
                        <!--                    <span class="text-weight-bold">9/10</span>-->
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section avatar>
                        <q-avatar color="red" text-color="white" icon="warning_amber"/>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label lines="1">ONVIF-2</q-item-label>
                        <q-item-label caption lines="1">
                          Настройки изображения (Imaging)
                        </q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-chip square>
                          <q-avatar rounded color="red" text-color="white">0</q-avatar>
                          баллов
                        </q-chip>
                        <!--                    <span class="text-weight-bold">9/10</span>-->
                      </q-item-section>
                    </q-item>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator inset="item"/>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row justify-center" v-if="!loading && loading_error">
      <div class="col-md-6">
        <div class="q-pa-md q-gutter-md">
          <q-card class="q-pa-md text-center" flat bordered>
            <q-card-section>
              <div class="text-overline text-center">
                <q-icon name="warning" class="text-grey" style="font-size: 4rem;"/>
              </div>
              <div class="text-h5 q-mt-sm q-mb-xs">Ошибка</div>
              <p/>
              Не удалось получить данные с сервера.
              <p/>
              Попробуйте перезагрузить страницу или попробовать снова. Если проблема сохраняется длительное время,
              пожалуйста, обратитесь в техподдержку.<br>
            </q-card-section>
            <q-card-actions>
              <q-space/>
              <q-btn
                color="primary"
                label="Попробовать ещё раз"
                icon="refresh"
                @click="init()"
              />
              <q-space/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <q-inner-loading :showing="loading">
      <q-spinner-cube
        color="primary"
        size="4em"
      />
    </q-inner-loading>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      loading_error: false,
      tasks: [],
      stats: {
        "email": "aafyodorov@miem.hse.ru",
        "taiga_score": {
          "academic_score": 0,
          "application_score": 0,
          "operational_score": 12,
          "research_score": 0,
          "score": 12
        },
        "classroom_tasks": [
          {
            "task_name": "Аппаратные интерфейсы",
            "task_id": "297686484826",
            "mark": 100,
            "max_mark": 100,
            "passed": true
          },
          {
            "task_name": "ffmpeg-4",
            "task_id": "285725197154",
            "mark": 10,
            "max_mark": 10,
            "passed": true
          },
          {
            "task_name": "ffmpeg-2-1",
            "task_id": "247095020119",
            "mark": 0,
            "max_mark": 10,
            "passed": false
          },
          {
            "task_name": "ffmpeg-3",
            "task_id": "253730218145",
            "mark": 0,
            "max_mark": 10,
            "passed": false
          },
          {
            "task_name": "ffmpeg-2-2",
            "task_id": "247096586404",
            "mark": 0,
            "max_mark": 10,
            "passed": false
          },
          {
            "task_name": "ffmpeg-1",
            "task_id": "197226351637",
            "mark": 0,
            "max_mark": 10,
            "passed": false
          },
          {
            "task_name": "Аппаратные интерфейсы",
            "task_id": "297686484826",
            "mark": 100,
            "max_mark": 100,
            "passed": true
          },
          {
            "task_name": "ffmpeg-4",
            "task_id": "285725197154",
            "mark": 10,
            "max_mark": 10,
            "passed": true
          },
          {
            "task_name": "ffmpeg-2-1",
            "task_id": "247095020119",
            "mark": 0,
            "max_mark": 10,
            "passed": false
          },
          {
            "task_name": "ffmpeg-3",
            "task_id": "253730218145",
            "mark": 0,
            "max_mark": 10,
            "passed": false
          },
          {
            "task_name": "ffmpeg-2-2",
            "task_id": "247096586404",
            "mark": 0,
            "max_mark": 10,
            "passed": false
          },
          {
            "task_name": "ffmpeg-1",
            "task_id": "197226351637",
            "mark": 0,
            "max_mark": 10,
            "passed": false
          }
        ]
      }
    }
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {

    },
    async getStats() {
      const endpoint = "https://constructor.auditory.ru/nvt-stats-api/user";
      const params = {
        email: this.$q.sessionStorage.getItem('google_email');
      }
      try {
        let res = await this.$axios.get(endpoint, {params: params});
        this.loading_error = false;
      } catch (e) {
        this.loading_error = true;
        console.error(e);
      }
      this.loading = false;
    }
  }
}
</script>
