<template>
  <div class="custom-dropdown" @mouseenter="doOpen" @mouseleave="doClose">
    <a href="javascript:void(0)">{{ title }}</a>
    <div :ref="id" class="dropdown-detail">
      <b-form-group v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="selected"
          :options="items"
          :aria-describedby="ariaDescribedby"
          stacked
        />
      </b-form-group>
      <div class="dropdown-detail-actions">
        <a href="javascript:void(0)" @click="doApply"> Apply </a>
        <a href="javascript:void(0)" @click="doReset"> Reset </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDownFilter",

  props: {
    id: { type: String, default: "dropdown" },
    title: { type: String, default: "DropDown" },
    items: { type: Array, default: () => [] },
  },

  data() {
    return {
      selected: [],
      applied: false,
    };
  },

  methods: {
    doOpen() {
      let sideMenu = this.$refs[this.id];
      if (!sideMenu) return;
      sideMenu.classList.add("open");
    },

    doClose() {
      if (!this.applied) {
        this.selected = [];
      }

      let sideMenu = this.$refs[this.id];
      if (!sideMenu) return;
      sideMenu.classList.remove("open");
    },

    doApply() {
      this.applied = true;
      this.$emit("changeFilter", this.selected);
    },

    doReset() {
      if (!this.selected.length) return;

      this.selected = [];

      if (!this.applied) return;

      this.applied = false;
      this.$emit("changeFilter", this.selected);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-dropdown {
  transition: 0.5s all ease;
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
  border-right: 1px solid #000;
  width: 50%;

  @media screen and (max-width: 767px) {
    &:last-child {
      border-right: 0;
    }
  }

  @media screen and (min-width: 768px) {
    width: 125px;
  }

  a {
    display: block;
    padding: 10px 0;
    text-align: center;
  }

  div.dropdown-detail {
    display: none;
    position: absolute;
    width: calc(100% + 2px);
    background-color: #fff;
    border: 1px solid #000;
    margin: 0;
    box-sizing: border-box;
    margin-inline-start: -1px;
    z-index: 1;

    fieldset {
      padding: 10px;
      margin-bottom: 0 !important;
    }

    &.open {
      display: block;
    }

    .dropdown-detail-actions {
      display: flex;
      justify-content: space-between;
      width: 100%;

      a {
        display: block;
        background-color: #000;
        color: #fff;
        width: 50%;
        padding: 5px 0;
        border-top: 1px solid transparent;
        &:hover {
          background-color: #fff;
          color: #000;
          border-top: 1px solid #000;

          @media (hover: none) {
            background-color: #000;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
