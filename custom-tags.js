import { check, sleep } from 'k6';
import http from 'k6/http';
import { Counter} from 'k6/metrics';

export const options = {
    thresholds: {
        http_req_duration : ['p(95)<300'],
        'http_req_duration{page:order}': ['p(95)<300'],
        'http_req_duration{page:home}': ['p(95)<300'],
        http_errors: ['count==0'],
        'http_errors{page:home}': ['count==0'],
        'http_errors{page:order}': ['count==0'],
        checks: ['rate>0.99'],
        'checks{page:home}': ['rate>0.99'],
        'checks{page:order}': ['rate>0.99']
    }
}

let httpErrors = new Counter('http_errors');

export default function () {
    // urls created via https://designer.mocky.io/design

    let res = http.get('https://run.mocky.io/v3/bcabfab6-4137-4820-94d9-debd40540ea4',
        {
            tags: {
                page : 'home'
            }
        }
    );

    if(res.error){
        httpErrors.add(1, { page: 'home' });
    }

    check(res, {
        'status is 200': (r) => r.status === 200
    },
    {
        page: 'home'
    }
)

    res = http.get('https://run.mocky.io/v3/459bd131-0b0f-4793-aa88-fd053f044843?mocky-delay=2000ms',
        {
            tags: {
                page : 'order'
            }
        }
    );
    if(res.error){
        httpErrors.add(1, { page: 'order' });
    }

    check(res, {
        'status is 201': (r) => r.status === 201
    },
    {
        page: 'order'
    })
    
    sleep(1)
}