<template>
  <div>
    <b-form>
      <b-form-group id="input-group-1" label="Ten Nglieu:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="text"
          v-model="qry"
          v-on:keyup="autoComplete"
          placeholder="Nhap ten nguyen lieu"
          required
        ></b-form-input>
      </b-form-group>
    </b-form>
    <div>
      <b-table :items="items" :fields="fields" stacked="md" show-empty small>
        <template #cell(name)="row">
          {{ row }}
        </template>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      qry: "",
      rows: 100,
      currentPage: 1,
      show: true,
      result: [],
      items: [
        {
          namemiterial: "Xoài Lắc",
          count: "12",
        },
      ],
      fields: [
        {
          key: "namemiterial",
          label: "Tên Nguyên Liệu",
        },
        { key: "count", label: "Số Lượng" },

        { key: "actions", label: "Hành Động" },
      ],
    };
  },
  methods: {
    info(item, index, button) {},
    autoComplete() {
      this.result = [];
    },
  },
};
</script>

<style lang="scss" scoped></style>
