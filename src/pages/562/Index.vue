<template>
  <q-page padding>
    <div id="q-app">
      <div class="flex flex-center column">
        <div class="row" style="min-height: 100%; width: 80%; padding: 24px;">
          <div
            id="parent"
            class="fit row wrap justify-center items-center content-start"
            style="overflow: hidden;"
          >
            <div class="col-10" style="overflow: auto; padding: 30px">
              <q-table
                title="Лабораторные работы"
                :data="labs"
                :columns="columns"
                row-key="name"
              />
              <br />
              <div
                id="parent"
                class="fit row wrap justify-center items-center content-start"
                style="overflow: hidden;"
              >
                <q-btn
                  label="Запросить проверку"
                  color="blue"
                  @click="openReviewRequestForm()"
                />
                <div class="offset-1">
                  <q-btn
                    label="Доступ к онлайн-лаборатории"
                    color="blue"
                    @click="openBookingForm()"
                  />
                </div>
              </div>
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
      email: this.$store.getters["user/userHSEEmail"],
      labs: [],
      columns: [
        {
          name: 'Название работы',
          required: true,
          label: 'Название работы',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        }
      ]
    };
  },
  mounted() {
    this.getLabs();
  },
  methods: {
    getLabs() {
      this.$axios
        .get(`${process.env.NETWORK_TECHNOLOGIES_API}/labs`, { withCredentials: false })
        .then(res => {
          const labs = res.data.labs;
          for (let i of labs) {
            this.labs.push({ name: i });
          }
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            position: this.notificationsPos,
            icon: 'warning',
            type: 'negative',
            multiLine: true,
            message: 'Возникла ошибка при получении списка лабораторных работ!'
          });
        });
    },
    openReviewRequestForm() {
       this.$router.push('/review-request', "_self");
    },
    openBookingForm() {
      this.$router.push('/booking', "_self");
    }
  }
};
</script>
