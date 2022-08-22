<template>
  <div
    v-if="item"
    class="box-glasses-detail"
    :style="`background-image: url(${image.url})`"
  >
    <h3 class="text-center">{{ item.name }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: null },
  },

  data() {
    return {
      variant: 0,
    };
  },

  computed: {
    info() {
      return this.item?.glass_variants[this.variant] || null;
    },
    image() {
      return this.info.media[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.box-glasses-detail {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  border-bottom: 1px solid #000;
  height: 300px;
  width: 100%;

  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: calc(100% / 2);

    &:nth-child(2n + 1) {
      border-right: 1px solid #000;
    }
  }

  @media screen and (min-width: 992px) {
    width: calc(100% / 3);

    &:nth-child(3n + 2) {
      border-right: 1px solid #000;
      border-left: 1px solid #000;
    }

    &:last-child:not(:nth-child(3n + 3)) {
      border-right: 1px solid #000;
    }
  }

  h3 {
    margin-top: 20px;
    font-size: 18px;
    font-family: "AcuminPro", sans-serif;
    font-weight: 100;
    text-transform: uppercase;
  }
}
</style>
