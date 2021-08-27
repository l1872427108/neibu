import { mapGetters } from 'vuex';
import { defaultColor } from '~/config/common';

export default {
    data () {
        return {
            themeVal: defaultColor
        };
    },
    created () {
        this.themeVal = this.colorName;
    },
    computed: {
        ...mapGetters(['colorName'])
    },
    watch: {
        themeVal (val, oldVal) {
            this.$store.commit('common/SET_COLOR_NAME', val);
            this.updateTheme(val, oldVal);
        }
    },
    methods: {

    }
};
