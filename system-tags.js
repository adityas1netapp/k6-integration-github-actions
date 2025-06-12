import http from 'k6/http';
export const options = {

    thresholds: {
        http_req_duration : ['p(95)<300'],
        'http_req_duration{status:200}': ['p(95)<300'],
        'http_req_duration{status:201}': ['p(95)<300'],
        
    }
}


export default function () {
    // urls created via https://designer.mocky.io/design

    http.get('https://run.mocky.io/v3/bcabfab6-4137-4820-94d9-debd40540ea4');
    http.get('https://run.mocky.io/v3/459bd131-0b0f-4793-aa88-fd053f044843?mocky-delay=2000ms');
    
}