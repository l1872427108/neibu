import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';// element-ui lang
import zhLocale from '~/i18n/lang/zh';
import enLocale from '~/i18n/lang/en';
import { getStorage } from '~/utils/cache/storage';
import ElementLocale from 'element-ui/lib/locale';
import enPage from '~/i18n/routes/page/en-person';
import zhPage from '~/i18n/routes/page/zh-person';
import enRouter from '~/i18n/routes/router/en-router';
import zhRouter from '~/i18n/routes/router/zh-router';
import enAccount from '~/i18n/routes/account/en-account';
import zhAccount from '~/i18n/routes/account/zh-account';
Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
    ...enPage,
    ...enRouter,
    ...enAccount
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
    ...zhPage,
    ...zhRouter,
    ...zhAccount
  }
};

const i18n = new VueI18n({
  locale: getStorage('language') || 'zh',
  messages,
  silentTranslationWarn: true
});

ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;
