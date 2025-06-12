import http from 'k6/http';
import { check } from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration : ['max<2000'],
        http_req_duration : ['p(95)<300'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['count>500'],
        http_reqs: ['rate>60'],
        vus: ['value>9'],
        checks: ['rate>0.9970'],
    }
}

export default function () {
    const res = http.get('https://test.k6.io' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
    // console.log(res.status);
    // console.log(exec.scenario.iterationInTest)
    check(res, {
        'status is 200' : (r) => r.status === 200,
        'page is startup page': (r) => r.body.includes('QuickPizza')
    })
}