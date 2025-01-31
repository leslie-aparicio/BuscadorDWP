const app = Vue.createApp({
  data() {
    return {
      searchInput: "",
      dataColumns: ["title", "topic", "views"],
      dataset: [
        { title: 'Unity vs Construct 3 | What Is The Best Game Engine?', topic: "Game Development", views: 1 },
        { title: 'Unity vs Unreal Engine 4 | What Is The Ultimate Game Engine?', topic: "Game Development", views: 1 },
        { title: 'Android Studio vs Xcode vs Google Flutter | DEBATE', topic: "App Development", views: 2 },
        { title: 'How to Make Passive Income as a Programmer 🤑', topic: "General Programming", views: 1 },
        { title: 'Is watching videos at 2x speed better for you?', topic: "General Programming", views: 1 },
        { title: 'Unity Asset Store vs Unreal Marketplace | Which Is Better?', topic: "Game Development", views: 1 },
        { title: 'Unity vs Unreal: Which Engine Makes You More Money', topic: "Game Development", views: 2 },
        { title: 'Unity Bought Bolt | Visual Scripting for Game Developers', topic: "Game Development", views: 1 }
      ]
    };
  }
});

app.component("database-website-component", {
  template: "#grid-template",
  props: {
    entries: Array,
    columns: Array,
    filterkey: String
  },
  data() {
    return {
      sortkey: "",
      sortColumns: {}
    };
  },
  computed: {
    filteredTitles() {
      const sortkey = this.sortkey;
      const filterkey = this.filterkey && this.filterkey.toLowerCase();
      const order = this.sortColumns[sortkey] || 1;

      let entries = this.entries;

      if (filterkey) {
        entries = entries.filter((row) =>
          Object.keys(row).some((key) =>
            String(row[key]).toLowerCase().includes(filterkey)
          )
        );
      }

      if (sortkey) {
        entries = entries.slice().sort((x, y) => {
          x = x[sortkey];
          y = y[sortkey];
          return (x === y ? 0 : x > y ? 1 : -1) * order;
        });
      }

      return entries;
    }
  },
  methods: {
    capitalize(inputString) {
      return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    },
    sortBy(key) {
      this.sortkey = key;
      this.sortColumns[key] = (this.sortColumns[key] || 1) * -1;
    }
  }
});

app.mount("#database-website");
