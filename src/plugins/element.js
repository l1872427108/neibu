import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';

import {
  Pagination,
  Dialog,
  //   Autocomplete,
  ColorPicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  Calendar,
  // CheckboxButton,
  CheckboxGroup,
  CheckboxButton,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  //   ButtonGroup,
  // Link,
  Table,
  TableColumn,
  DatePicker,
  //   TimeSelect,
  TimePicker,
  Timeline,
  TimelineItem,
  Popover,
  Tooltip,
  Scrollbar,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  //   Alert,
  Slider,
  //   Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  //   Card,
  //   Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  //   ColorPicker,
  //   Transfer,
  Container,
  Header,
  Aside,
  Main,
  // Footer,
  Loading,
  MessageBox,
  Message,
  //   Notification,
  InfiniteScroll,
  Image,
  PageHeader
} from 'element-ui';

// Vue.use(PageHeader);
// Vue.use(Pagination);
Vue.use(Dialog);
// Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(TimePicker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
// Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(CheckboxButton);
Vue.use(Scrollbar);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(Calendar);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
// Vue.use(ButtonGroup);
// Vue.use(Link);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
// Vue.use(TimeSelect);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Popover);
Vue.use(Tooltip);
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
// Vue.use(Alert);
Vue.use(ColorPicker);
Vue.use(Slider);
// Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Badge);
// Vue.use(Card);
// Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
// Vue.use(ColorPicker);
// Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
// Vue.use(Footer);
Vue.use(InfiniteScroll);
Vue.use(Image);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgBox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
