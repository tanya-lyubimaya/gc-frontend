<template>
  <q-page padding>
    <div class="row justify-center" v-if="!loading && !loading_error">
      <div class="col-md-6">
        <q-card>
          <q-img
            src="~assets/nvt-header-parallax.jpg"
          >
            <div class="absolute-bottom text-h5">
              Сетевые видеотехнологии
            </div>
          </q-img>
          <q-card-section>
            <q-list bordered class="rounded-borders fit">
              <q-item-label header>Оценки за разделы курса</q-item-label>
              <q-expansion-item>
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar icon="movie_creation" color="primary" text-color="white"/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">FFMPEG</q-item-label>
                    <q-item-label caption lines="1">
                      4 лабораторные работы по FFMPEG
                    </q-item-label>
                  </q-item-section>

                  <!--                  <q-item-section side>
                                      <q-chip square>
                                        <q-avatar rounded color="orange" text-color="white">1</q-avatar>
                                        балл
                                      </q-chip>
                                    </q-item-section>-->
                </template>

                <q-card>
                  <q-card-section>
                    <task-item
                      v-for="c_id in ['197226351637', '247095020119', '247096586404', '253730218145', '285725197154']"
                      :title="classroom_stats[c_id].title"
                      :description="classroom_stats[c_id].description"
                      :mark="classroom_stats[c_id].mark"
                      :max_mark="classroom_stats[c_id].max_mark"
                      :passed="classroom_stats[c_id].passed"
                      type="classroom"
                      :key="c_id"/>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item>
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar icon="videocam" color="grey" text-color="white"/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">ONVIF</q-item-label>
                    <q-item-label caption lines="1">
                      3 лабораторные работы по ONVIF
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-chip square>
                      <span class="text-subtitle">ожидается</span>
                    </q-chip>
                  </q-item-section>
                </template>

                <q-card>
                  <q-card-section>
                    <task-item
                      title="ONVIF-1"
                      description="Непрерывное и абсолютное движение, фокус"
                      color="grey"
                      custom_chip="ожидается"
                      custom_icon="videocam"
                    />
                    <task-item
                      title="ONVIF-2"
                      description="Настройки изображения (Imaging)"
                      color="grey"
                      custom_chip="ожидается"
                      custom_icon="videocam"
                    />
                    <task-item
                      title="ONVIF-3"
                      description="Вход/выход сигнализации и веселье"
                      color="grey"
                      custom_chip="ожидается"
                      custom_icon="videocam"
                    />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item>
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar icon="work" color="orange" text-color="white"/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">Треки</q-item-label>
                    <q-item-label caption lines="1">
                      Задания из треков
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-chip square>
                      <span class="text-subtitle">{{ taiga_stats.score }} {{ taigaScoreTitle }}</span>
                    </q-chip>
                  </q-item-section>
                </template>

                <q-card>
                  <q-card-section>
                    <task-item
                      title="Академический трек"
                      description="Углубленные задания"
                      type="taiga"
                      :mark="taiga_stats.academic_score"
                      custom_icon="assignment"
                    />
                    <task-item
                      title="Прикладной трек"
                      description="Актуальные профильные задачи"
                      type="taiga"
                      :mark="taiga_stats.application_score"
                      custom_icon="construction"
                    />
                    <task-item
                      title="Исследовательский трек"
                      description="Научно-исследовательская работа"
                      type="taiga"
                      :mark="taiga_stats.research_score"
                      custom_icon="library_books"
                    />
                    <task-item
                      title="Эксплуатационный трек"
                      description="Работа в медиацентре"
                      type="taiga"
                      :mark="taiga_stats.operational_score"
                      custom_icon="camera_indoor"
                    />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <task-item
                title="Итоговое задание"
                description="Итоговое задание по курсу"
                type="final_task"
                color="grey"
                custom_chip="ожидается"
                custom_icon="assignment_ind"
              />
<!--              <q-separator/>-->

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
import TaskItem from "components/nvt/TaskItem";

export default {
  components: {
    TaskItem
  },
  data() {
    return {
      loading: true,
      loading_error: false,
      classroom_stats: {},
      taiga_stats: {},
      stats: {}
    }
  },
  computed: {
    taigaScoreTitle() {
      if (!this.taiga_stats || this.taiga_stats.score === undefined)
        return '';

      return this.getTitle(this.taiga_stats.score, ["баллов", "балл", "баллов"])
    }
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      await this.getStats();
      setTimeout(() => {
        this.loading = false;
      }, 2000)
    },
    getTitle(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },
    async getStats() {
      const endpoint = "https://constructor.auditory.ru/nvt-stats-api/user";
      const params = {
        email: this.$q.sessionStorage.getItem('google_email')
      }
      try {
        let res = await this.$axios.get(endpoint, {params: params});
        this.stats = res.data
        let classroom_tasks_info = {
          "197226351637": {
            title: "FFMPEG-1",
            description: "Базовое кодирование видео",
          },
          "247095020119": {
            title: "FFMPEG-2-1",
            description: "Склейки",
          },
          "247096586404": {
            title: "FFMPEG-2-2",
            description: "Более веселые склейки",
          },
          "253730218145": {
            title: "FFMPEG-3",
            description: "Склейки с анимацией",
          },
          "285725197154": {
            title: "FFMPEG-4",
            description: "Синхронизация потоков с камеры и кодера",
          },
          "297686484826": {
            title: "Аппаратные интерфейсы",
            description: "Бонусный тест по материалам лекции",
          }
        }
        this.stats.classroom_tasks.forEach((task) => {
            let info = classroom_tasks_info[task['task_id']];
            if (info !== undefined) {
              info.mark = task.mark;
              info.max_mark = task.max_mark;
              info.task_name = task.task_name;
              info.task_id = task.task_id;
              info.passed = task.passed;
            }
          }
        )
        this.classroom_stats = classroom_tasks_info;
        this.taiga_stats = this.stats.taiga_score;
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
