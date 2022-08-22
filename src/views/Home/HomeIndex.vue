<template>
  <div v-if="!$wait.is('LG_PAGE')">
    <div class="box-header">
      <div></div>
      <div class="box-title">{{ title }}</div>
      <div class="box-filters">
        <DropDownFilter
          ref="dropdown-colours"
          id="dropdown-colours"
          title="COLOURS"
          :items="colours"
          @changeFilter="doUpdateFilterColours"
        />
        <DropDownFilter
          ref="dropdown-shapes"
          id="dropdown-shapes"
          title="SHAPES"
          :items="shapes"
          @changeFilter="doUpdateFilterShapes"
        />
      </div>
    </div>
    <div class="box-glasses">
      <GlassFrame v-for="(item, key) in items" :item="item" :key="key" />
    </div>
    <div ref="observer-element"></div>
    <div
      class="d-flex justify-content-center my-2"
      v-if="$wait.is('LG_GLASSES')"
    >
      <font-awesome-icon icon="fa-solid fa-spinner" spin />
    </div>
  </div>
</template>

<script>
import GlassFrame from "@/components/GlassFrame.vue";
import DropDownFilter from "@/components/DropDownFilter.vue";

export default {
  components: {
    GlassFrame,
    DropDownFilter,
  },

  data() {
    return {
      observer: null,
      type: "spectacles",
      gender: "women",
      page: 1,
      limit: 12,
      order: "asc",
      items: [],
      collections: [],
      filterColours: [],
      filterShapes: [],
      colours: [
        { text: "Black", value: "black" },
        { text: "Tortoise", value: "tortoise" },
        { text: "Coloured", value: "coloured" },
        { text: "Crystal", value: "crystal" },
        { text: "Dark", value: "dark" },
        { text: "Bright", value: "bright" },
      ],
      shapes: [
        { text: "Square", value: "square" },
        { text: "Rectangle", value: "rectangle" },
        { text: "Round", value: "round" },
        { text: "Cat-Eye", value: "cat-eye" },
      ],
    };
  },

  beforeUnmount() {
    this.observer.disconnect();
  },

  created() {
    this.observer = new IntersectionObserver(this.onElementObserved);
  },

  async mounted() {
    this.$wait.start("LG_PAGE");
    try {
      const { data } = await this.$axios.get("/");
      const { collections } = data;
      this.collections = collections;

      this.type = this.$route.params?.type || null;
      this.gender = this.$route.params?.gender || null;
    } catch (err) {
      console.log({ err });
    }
    this.$wait.end("LG_PAGE");

    this.$nextTick(() => {
      this.observer.observe(this.$refs["observer-element"]);
    });
  },

  methods: {
    getGlasses() {
      let params = [
        `sort[type]=collection_relations_position`,
        `sort[order]=${this.order}`,
        `page[limit]=${this.limit}`,
        `page[number]=${this.page}`,
        `filters[lens_variant_prescriptions][]=fashion`,
        `filters[lens_variant_types][]=classic`,
        `filters[frame_variant_home_trial_available]=false`,
      ];

      if (this.filterColours.length) {
        let filters = this.filterColours.map(
          (filter) =>
            `filters[glass_variant_frame_variant_colour_tag_configuration_names][]=${filter}`
        );
        params = [...params, ...filters];
      }

      if (this.filterShapes.length) {
        let filters = this.filterShapes.map(
          (filter) =>
            `filters[glass_variant_frame_variant_frame_tag_configuration_names][]=${filter}`
        );
        params = [...params, ...filters];
      }

      const url = `/${this.type}-${this.gender}/glasses?${params.join("&")}`;

      this.$wait.start("LG_GLASSES");

      this.$axios
        .get(url)
        .then(({ data }) => {
          const { glasses } = data;

          if (glasses.length == 0) {
            this.observer.unobserve(this.$refs["observer-element"]);
            return;
          }

          this.items = [...this.items, ...glasses];
        })
        .catch((err) => console.log({ err }))
        .finally(() => this.$wait.end("LG_GLASSES"));
    },

    doUpdateFilterColours(filters) {
      this.filterColours = filters;
      this.doReloadGlasses();
    },

    doUpdateFilterShapes(filters) {
      this.filterShapes = filters;
      this.doReloadGlasses();
    },

    doReloadGlasses() {
      this.page = 1;
      this.items = [];
      this.$nextTick(() => {
        this.getGlasses();
        this.observer.observe(this.$refs["observer-element"]);
      });
    },

    onElementObserved(entries) {
      if (entries.length == 0) return;

      const entry = entries[0];
      if (!entry.isIntersecting) return;

      if (this.$wait.is("LG_GLASSES")) return;

      this.page += 1;
      this.getGlasses();
    },
  },

  computed: {
    title() {
      const collection = this.collections.find(
        (e) => e.configuration_name == `${this.type}-${this.gender}`
      );
      return collection?.name || "Glasses";
    },
  },
  watch: {
    $route(to) {
      this.type = to.params?.type || "spectacles";
      this.gender = to.params?.gender || "women";
      this.$refs["dropdown-colours"].selected = [];
      this.$refs["dropdown-shapes"].selected = [];
      this.doReloadGlasses();
    },
  },
};
</script>

<style lang="scss" scoped>
.box-glasses {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.box-header {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }

  > div {
    border-bottom: 1px solid #000;

    @media screen and (max-width: 767px) {
      &:first-child {
        display: none;
      }
    }

    @media screen and (min-width: 768px) {
      width: calc(100% / 3);

      &:nth-child(3n + 2) {
        border-right: 1px solid #000;
        border-left: 1px solid #000;
      }
    }

    &.box-title {
      text-align: center;
      padding: 10px 0;
      text-transform: uppercase;
    }

    &.box-filters {
      display: flex;
    }
  }
}
</style>
