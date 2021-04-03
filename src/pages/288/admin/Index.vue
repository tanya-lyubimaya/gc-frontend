<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="lecturers" label="Преподаватели"/>
          <q-tab name="disciplines" label="Дисциплины"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="lecturers">
            <div class="text-h6">Преподаватели</div>
            <q-space/>
            <q-table
              :data="data"
              :columns="columns"
              row-key="ruz_lecturer_oid"
              :pagination.sync="pagination"
              :loading="loading"
              :filter="filter"
              :rows-per-page-options="[10, 20, 50, 100]"
              @row-click="onRowClick"
              @request="onRequest"
            >
              <template v-slot:top>
                <q-input class="fit" outlined dense debounce="300" v-model="filter" placeholder="Поиск">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="disciplines">
            <div class="text-h6">Дисциплины</div>
            <p/>
            Раздел временно недоступен.
          </q-tab-panel>
        </q-tab-panels>
        <q-separator/>
      </q-card>

    </div>
    <q-dialog v-model="missing_email_alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Не указан E-Mail!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          У этого преподавателя не указан E-Mail в системе РУЗ. Увы, сервис не может обрабатывать пары таких
          преподавателей. Данные преподавателей обновляются один раз в день, поэтому после внесения изменений
          придётся подождать.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      missing_email_alert: false,
      tab: 'lecturers',
      filter: '',
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        {
          name: 'ruz_fio',
          required: true,
          label: 'ФИО (РУЗ)',
          align: 'left',
          field: 'ruz_fio',
          format: val => `${val}`,
          sortable: false,
          headerClasses: 'bg-primary text-white',
        },
        {
          name: 'ruz_email', align: 'left', label: 'E-Mail', field: 'ruz_email', sortable: false, format: val => {
            return (val === "" || val == null) ? "Не указан" : val
          },
          headerClasses: 'bg-primary text-white',
        },
        {
          name: 'ruz_chair',
          align: 'left',
          label: 'Департамент',
          field: 'ruz_chair',
          sortable: false,
          headerClasses: 'bg-primary text-white',
        }
      ],
      data: []
    }
  },
  async mounted() {
    await this.updateTable();
  },
  methods: {
    async updateTable() {
      await this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    async onRequest(props) {
      const {page, rowsPerPage} = props.pagination
      this.loading = true

      let params = {
        'page': (page > 0) ? (page - 1) : 0,
        'page_size': rowsPerPage,
      };

      if (this.filter != null && this.filter.trim() !== "") {
        params['query'] = this.filter;
      }

      const response = await this.$axios.get("/epi/api/v1/lecturers", {params: params})

      const lecturers_list = response.data;

      this.data = lecturers_list['lecturers'];
      this.pagination.rowsNumber = lecturers_list['total'];
      this.pagination.page = page;
      this.pagination.rowsPerPage = rowsPerPage;
      this.loading = false;
    },
    async onRowClick(evt, row, index) {
      if (row.ruz_email == null || row.ruz_email.trim() === "") {
        this.missing_email_alert = true;
        return false;
      }
      await this.$router.push({path: '/online-platforms/admin/lecturer/' + row.ruz_email})
    }
  }
}
</script>
