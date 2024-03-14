import type { App } from 'vue';
import { Button} from 'vant';
import 'vant/lib/index.css';

export const installVant = ((app: App) => {
  app.use(Button)
})