/**
 * 异步延迟加载组件
 */
export default {
    data () {
        return {
            displayComponent: 0
        };
    },

    mounted () {
        this.runDisplayComponent();
    },

    methods: {

        runDisplayComponent () {
            const count = 10;
            const step = () => {
                requestAnimationFrame(() => {
                    this.displayComponent++;
                    if (this.displayComponent > count) {
                        step();
                    }
                });
            };
            step();
        },

        defer (priority) {
            return this.displayComponent >= priority;
        }
    }
};
