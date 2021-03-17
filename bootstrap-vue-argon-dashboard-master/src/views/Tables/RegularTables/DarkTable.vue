<template>
  <div>
    <b-table :items="items" :fields="fields" stacked="md" show-empty small>
      <template #cell(name)="row"> {{ row.value.first }} {{ row.value.last }} </template>
      <template #cell(count)="row">
        <input type="number" style="width: 50px" @click="info(row.index)" />
      </template>

      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          X
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: 100,
      currentPage: 1,
      show: true,
      items: [
        {
          namemiterial: "Xoài Lắc",
          count: "12",
        },

        {
          namemiterial: "Dâu Tây",
          count: "12",
        },
        { namemiterial: "Dâu Lắc", count: "12" },
        {
          namemiterial: "Bánh Tráng",
          count: "12",
        },
      ],
      fields: [
        {
          key: "namemiterial",
          label: "Tên Nguyên Liệu",
          sortable: true,
          class: "text-center",
        },
        { key: "count", label: "Số Lượng" },

        { key: "actions", label: "Hành Động" },
      ],
    };
  },
  methods: {
    info(item, index, button) {},
  },
};
</script>

<style lang="scss" scoped></style>
