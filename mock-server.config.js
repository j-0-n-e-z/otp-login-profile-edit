/** @type {import('mock-config-server').FlatMockServerConfig} */
const delay = async (ms) => await new Promise((res) => setTimeout(res, ms));

const submitted = {};

function generateOTP() {
  return +`${Math.floor(Math.random() * 100000)}`.padEnd(6, '0');
}

const flatMockServerConfig = [
  {
    baseUrl: '/api'
  },
  {
    configs: [
      {
        path: '/auth/otp',
        method: 'post',
        routes: [
          {
            entities: {
              body: {
                phone: {
                  checkMode: 'regExp',
                  value: /^\d{10}$/
                }
              }
            },
            data: { code: 0, retryDelay: 5000 },
            interceptors: {
              response: async (data, { request }) => {
                await delay(1500);

                const otp = generateOTP();
                submitted[request.body.phone] = otp;
                data.code = otp;

                console.log(submitted);

                return data;
              }
            }
          }
        ]
      },
      {
        path: '/auth/user',
        method: 'post',
        routes: [
          {
            entities: {
              body: {
                phone: {
                  checkMode: 'regExp',
                  value: /^\d{10}$/
                },
                code: {
                  checkMode: 'regExp',
                  value: /^\d{6}$/
                }
              }
            },
            data: {
              success: true,
              token: 'my_token',
              user: {
                phone: '1111111111',
                firstname: 'Rustam',
                lastname: 'Gabdullin',
                email: 'rigabdullin@yandex.ru',
                city: 'Perm'
              }
            },
            interceptors: {
              response: async (data, { request, setStatusCode }) => {
                await delay(1500);

                const { phone, code } = request.body;
                if (code === submitted[phone]) return data;

                setStatusCode(400);
                return { reason: 'Проверочный код неверен' };
              }
            }
          }
        ]
      },
      {
        path: '/user/session',
        method: 'get',
        routes: [
          {
            entities: {
              headers: {
                Authorization: 'Bearer my_token'
              }
            },
            data: {
              user: {
                phone: '9927941027',
                firstname: 'Rustam',
                lastname: 'Gabdullin',
                email: 'rigabdullin@yandex.ru',
                city: 'Perm'
              }
            }
          }
        ]
      }
    ]
  }
];

export default flatMockServerConfig;
