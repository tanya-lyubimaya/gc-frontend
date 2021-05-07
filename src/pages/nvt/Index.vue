<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-md-6">
        <q-card>
          <q-img
            src="~assets/nvt-header-parallax.jpg"
          >
            <div class="absolute-bottom text-h5">
              Сетевые видеотехнологии
            </div>
          </q-img>
          <q-card-section v-if="lecturerView && !selectedStudent" class="text-center text-body1">
            <q-icon name="leaderboard" size="4em" color="grey"/>
            <p/>
            Для просмотра успеваемости, выберите нужного студента ниже или перейдите по ссылке на общую таблицу.
          </q-card-section>
          <q-inner-loading :showing="loading">
            <q-spinner-gears size="50px" color="primary"/>
          </q-inner-loading>
          <q-select
            class="fit q-pa-md"
            filled
            v-model="selectedStudent"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="Поиск по студентам"
            :options="options"
            @input="selectStudent"
            @filter="filterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Нет результатов
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-list bordered class="rounded-borders fit" v-if="!lecturerView && !loadingStats || (lecturerView && selectedStudent)">
            <q-item-label v-if="false" header>Оценки за разделы курса — {{ this.userFullName }}
            </q-item-label>
            <q-item v-if="!lecturerView">
              <q-item-section v-if="!searchMode">
                <q-item-label>Оценки за разделы курса</q-item-label>
              </q-item-section>
              <q-item-section v-else>
                <q-select
                  class="fit"
                  filled
                  v-model="selectedStudent"
                  clearable
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  label="Поиск по студентам"
                  :options="options"
                  @input="selectStudent"
                  @filter="filterFn"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Нет результатов
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-item-section>
              <q-item-section side>
                <q-btn v-if="!searchMode" flat color="primary" icon="search" @click="searchMode = true;"
                       label="Поиск по студентам" size="md"/>
                <q-btn v-else flat round color="primary" icon="clear" @click="exitSearchMode" size="md"/>
              </q-item-section>
            </q-item>
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
                    :title="getClassroomTask(c_id).title"
                    :description="getClassroomTask(c_id).description"
                    :mark="getClassroomTask(c_id).mark"
                    :max_mark="getClassroomTask(c_id).max_mark"
                    :passed="getClassroomTask(c_id).passed"
                    type="classroom"
                    :key="c_id"/>
                </q-card-section>
              </q-card>
            </q-expansion-item>
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

                <!--                  <q-item-section side>-->
                <!--                    <q-chip square>-->
                <!--                      <span class="text-subtitle">ожидается</span>-->
                <!--                    </q-chip>-->
                <!--                  </q-item-section>-->
              </template>

              <q-card>
                <q-card-section>
                  <task-item
                    v-for="c_id in ['322642694476', '322651639271']"
                    :title="getClassroomTask(c_id).title"
                    :description="getClassroomTask(c_id).description"
                    :mark="getClassroomTask(c_id).mark"
                    :max_mark="getClassroomTask(c_id).max_mark"
                    :passed="getClassroomTask(c_id).passed"
                    type="classroom"
                    :key="c_id"/>
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
              :title="getClassroomTask('297686484826').title"
              :description="getClassroomTask('297686484826').description"
              :mark="getClassroomTask('297686484826').mark"
              :max_mark="getClassroomTask('297686484826').max_mark"
              :passed="getClassroomTask('297686484826').passed"
              type="bonus"
              custom_icon="add_circle"
            />
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
          <q-separator spaced="true"/>
          <q-card-actions align="right">
            <q-btn type="a"
                   href="https://docs.google.com/spreadsheets/d/1fU0OVJ63u3xOGSANHqZm7x8p6QPLXg9IBbKUbQs8oWI/edit"
                   target="_blank" flat>Общая таблица
            </q-btn>
          </q-card-actions>
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
                @click="loadData()"
              />
              <q-space/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <!--    <q-inner-loading :showing="loading">-->
    <!--      <q-spinner-cube-->
    <!--        color="primary"-->
    <!--        size="4em"-->
    <!--      />-->
    <!--    </q-inner-loading>-->
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
      loadingStats: false,
      loadingStudents: false,
      loading_error: false,
      searchMode: false,
      selectedStudent: null,
      userEmail: null,
      userFullName: null,
      classroom_stats: {},
      taiga_stats: {},
      stats: {},
      students: [],
      options: []
    }
  },
  computed: {
    taigaScoreTitle() {
      if (!this.taiga_stats || this.taiga_stats.score === undefined)
        return '';

      return this.getTitle(this.taiga_stats.score, ["балл", "балла", "баллов"])
    },
    lecturerView() {
      return this.$store.getters["user/isLecturer"];
    },
    loading() {
      return this.loadingStats || this.loadingStudents;
    }
  },
  async beforeMount() {
    // if (!["БИВ181", "БИВ182"].includes(this.$store.getters["auth/ruzGroup"])) {
    //   // TODO: Redirect aliens to some error page or
    // }
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      await this.getStudents();
      if (!this.lecturerView) {
        this.userEmail = this.$store.getters["user/userGoogleEmail"];
        this.userFullName = this.getFullNameByEmail(this.userEmail);
        await this.getStats(this.userEmail);
      }
      else {
        this.searchMode = true;
      }
    },
    getTitle(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },
    async getStudents() {
      this.loadingStudents = true;
      const endpoint = `${process.env.NVT_STATS_API}/students`;
      try {
        let res = await this.$axios.get(endpoint);
        this.students = res.data.map((s) => {
          return {
            label: `${s.name} (${s.email})`,
            value: s.email
          }
        });
      } catch (e) {
        this.loading_error = true;
        console.error(e);
      }
      this.loadingStudents = false;
    },
    getFullNameByEmail(userEmail) {
      return this.students.find(s => s?.value === userEmail)?.label;
    },
    async getStats(userEmail) {
      this.loadingStats = true;
      const endpoint = `${process.env.NVT_STATS_API}/user`;
      const params = {
        email: userEmail
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
          "322642694476": {
            title: "ONVIF-1-1",
            description: "PTZ — AbsoluteMove",
          },
          "322651639271": {
            title: "ONVIF-1-2",
            description: "PTZ — ContinuousMove",
          },
          "297686484826": {
            title: "Аппаратные интерфейсы",
            description: "Бонусный тест по лекции",
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
      this.loadingStats = false;
    },
    async exitSearchMode() {
      this.selectedStudent = null;
      this.searchMode = false;
      await this.getStats(this.userEmail);
    },
    filterFn(val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      update(
        () => {
          if (val === '') {
            this.options = this.students;
          } else {
            const needle = val.toLowerCase()
            this.options = this.students.filter(v => (v.label.toLowerCase().indexOf(needle) > -1) || (v.value.toLowerCase().indexOf(needle) > -1))
          }
        },
      )
    },
    async selectStudent(s_obj) {
      await this.getStats(s_obj['value']);
    },
    getClassroomTask(id) {
      return this.classroom_stats[id] ?? {};
    },
    abortFilterFn() {
      // console.log('delayed filter aborted')
    }
  }
}
</script>
