import 'jodit/build/jodit.min.css';
import Edit from '@/edit/index.vue';
import Toolbar from '@/edit/Toolbar.vue';

export { Edit, Toolbar };

export default {
  initState: () => ({}),
  components: {
    Edit,
    Toolbar
  }
};
