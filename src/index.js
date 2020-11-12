import Edit from '@/edit';
import Toolbar from '@/edit/Toolbar';

export { Edit, Toolbar };

export default {
  initState: () => ({ content: '' }),
  components: {
    Edit,
    Toolbar
  }
};
