import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        {
            duration: '5s',
            target: 10
        },
        {
            duration: '10s',
            target: 10
        },
        {
            duration: '5s',
            target: 0
        },
    ],

    cloud: {
        projectID : __PROJECT_ID__
    }
};

export default function () {
    http.get('https://test.k6.io');
    sleep(2);
    http.get('https://quickpizza.grafana.com/login')
    sleep(1);
}