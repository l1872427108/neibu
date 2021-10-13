/**
 * 异步延迟加载组件
 */
import { asyncCount } from '../config/website';
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
            const step = () => {
                requestAnimationFrame(() => {
                    this.displayComponent++;
                    if (this.displayComponent < asyncCount) {
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
