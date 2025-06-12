import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
    cloud: {
        projectID : __PROJECT_ID__
    }
}

export default function () {
    http.get('https://test.k6.io');
    http.get('https://www.google.com/');
    sleep(1);
}