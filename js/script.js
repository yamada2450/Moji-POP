
Vue.createApp({

    // データ
    data() {
        return {
            text: "",
            copied: false,
            toastTimer: null
        };
    },


    // 自動計算
    computed: {

        // 総文字数
        characterCount() {
            return Array.from(this.text).length;
        },


        // スペースを除いた文字数
        noSpaceCount() {
            const result = this.text.replace(/[ \t　]/g, "");

            return Array.from(result).length;
        },


        // 改行を除いた文字数
        noLineBreakCount() {
            const result = this.text.replace(/\r\n|\r|\n/g, "");

            return Array.from(result).length;
        },


        // 単語数
        wordCount() {

            if (this.text.trim() === "") {
                return 0;
            }

            const words = this.text.trim().split(/\s+/);

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


    // ボタンの操作
    methods: {

        // 文章をクリア
        clearText() {

            this.text = "";
            this.copied = false;

            clearTimeout(this.toastTimer);

        },


        // 文章をコピー
        async copyText() {

            if (this.text === "") {
                return;
            }

            try {

                // コピー機能
                if (navigator.clipboard && window.isSecureContext) {

                    await navigator.clipboard.writeText(this.text);

                } else {

                    // コピー機能の代替処理
                    const textarea = document.createElement("textarea");

                    textarea.value = this.text;

                    textarea.style.position = "fixed";
                    textarea.style.opacity = "0";

                    document.body.appendChild(textarea);

                    textarea.select();

                    const success = document.execCommand("copy");

                    textarea.remove();

                    if (!success) {
                        throw new Error("Copy failed");
                    }

                }

                // コピー完了
                this.copied = true;

                clearTimeout(this.toastTimer);

                this.toastTimer = setTimeout(() => {

                    this.copied = false;

                }, 2000);

            } catch (error) {

                alert("コピーできませんでした。");

            }

        }

    }

}).mount("#app");
