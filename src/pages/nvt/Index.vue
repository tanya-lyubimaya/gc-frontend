<template>
  <q-page padding>
    <div class="row justify-center">
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
                      <q-avatar icon="videocam" color="primary" text-color="white" />
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
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
