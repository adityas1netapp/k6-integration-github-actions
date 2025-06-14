import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        {
            duration: '5m',
            target: 1000
        },
        {
            duration: '24h',
            target: 1000
        },
        {
            duration: '5m',
            target: 0
        },
    ]
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://quickpizza.grafana.com/login')
    sleep(1);
}