/** @type {import('mock-config-server').FlatMockServerConfig} */
const delay = async (ms) => await new Promise((res) => setTimeout(res, ms));

const submittedPhoneOTP = {};

let user = {
  phone: '1234567890',
  firstname: 'Rustam',
  lastname: 'Gabdullin',
  email: 'rigabdullin@yandex.ru',
  city: 'Perm'
};

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
                submittedPhoneOTP[request.body.phone] = otp;
                data.code = otp;

                console.log(submittedPhoneOTP);

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
              token: 'my_token'
            },
            interceptors: {
              response: async (data, { request, setStatusCode }) => {
                await delay(1500);

                const { phone, code } = request.body;
                if (code === submittedPhoneOTP[phone]) return { ...data, user };

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
            data: { success: true, token: 'my_token' },
            interceptors: {
              response: (data) => {
                return { ...data, user };
              }
            }
          }
        ]
      },
      {
        path: '/user/patch',
        method: 'patch',
        routes: [
          {
            entities: {
              headers: {
                Authorization: 'Bearer my_token'
              }
            },
            data: { success: true, token: 'my_token' },
            interceptors: {
              response: (data, { request }) => {
                user = { ...user, ...request.body.user };
                data.user = user;
                return data;
              }
            }
          }
        ]
      }
    ]
  }
];

export default flatMockServerConfig;
