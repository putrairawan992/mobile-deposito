import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

AppRegistry.registerComponent(appName, () => App);
