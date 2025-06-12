// load.template.js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  cloud: {
    projectID: __PROJECT_ID__,
  },
  vus: 10,
  duration: '30s',
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
