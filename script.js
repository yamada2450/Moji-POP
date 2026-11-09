Vue.createApp({

  data() {

    return {

      text: "",

      copied: false

    };

  },


  computed: {

    // 文字数（空白・改行を含む）

    characterCount() {

      return this.text.length;

    },


    // スペースを除いた文字数

    noSpaceCount() {

      return this.text.replace(/[ \t　]/g, "").length;

    },


    // 改行を除いた文字数

    noLineBreakCount() {

      return this.text.replace(/\r\n|\r|\n/g, "").length;

    },


    // 単語数（スペース区切り）

    wordCount() {

      const words = this.text.trim().split(/\s+/);

      if (this.text.trim() === "") {

        return 0;

      }

      return words.length;

    },


    // 行数

    lineCount() {

      if (this.text === "") {

        return 0;

      }

      return this.text.split(/\r\n|\r|\n/).length;

    }

  },


  methods: {

    // 文章をクリア

    clearText() {

      this.text = "";

      this.copied = false;

    },


    // 文章をコピー

    async copyText() {

      if (this.text === "") {

        return;

      }

      try {

        await navigator.clipboard.writeText(this.text);

        this.copied = true;

        setTimeout(() => {

          this.copied = false;

        }, 2000);

      } catch (error) {

        alert("コピーできませんでした。");

      }

    }

  }

}).mount("#app");
 