import Edit from '@/edit';
import Toolbar from '@/edit/Toolbar';

const initState = () => ({ content: '' });

export default {
  name: 'Html',
  type: 'JODIT_HTML',
  version: '1.0',
  initState,
  Edit,
  Toolbar,
  ui: {
    icon: 'mdi-text',
    forceFullWidth: false
  }
};
