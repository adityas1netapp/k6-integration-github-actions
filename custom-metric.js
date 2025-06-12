import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';


export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
       
        http_req_duration : ['p(95)<300'],
        my_counter: ['count>5'],
        response_time_duration: ['p(95)<500', 'p(99)<1000'],
        
    }
}

let myCounter = new Counter('my_counter');
let newsPageResponseTime = new Trend('response_time_duration')

export default function () {
    let res = http.get('https://test.k6.io');
    myCounter.add(1);
    sleep(1);

    res = http.get('https://quickpizza.grafana.com/login');
    newsPageResponseTime.add(res.timings.duration);
    sleep(1);
}