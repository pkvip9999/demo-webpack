import _ from 'lodash';
// export const join = function (arr) {
//     return _.join(arr, ' ');
// }


import 'bootstrap/dist/css/bootstrap.css'
import users from './lib';

const lucy = _.find(users, { firstName: 'Lucy' });
console.log(lucy)