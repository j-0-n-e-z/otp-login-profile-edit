/** @type {import('mock-config-server').FlatMockServerConfig} */
const delay = async (ms) => await new Promise((res) => setTimeout(res, ms));

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
                  checkMode: 'equals',
                  value: '1111111111'
                }
              }
            },
            data: { code: '123456', retryDelay: 5000 },
            interceptors: {
              response: async (data) => {
                await delay(1500);
                return data;
              }
            }
          },
          {
            entities: {
              body: {
                phone: {
                  checkMode: 'notEquals',
                  value: '1111111111'
                }
              }
            },
            data: {
              reason: 'Телефон не найден'
            },
            interceptors: {
              response: async (data, { setStatusCode }) => {
                await delay(1500);
                setStatusCode(404);
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
                  checkMode: 'equals',
                  value: '1111111111'
                },
                code: {
                  checkMode: 'equals',
                  value: 123456
                }
              }
            },
            data: {
              token: 'my_token',
              user: {
                phone: '1111111111',
                firstname: 'Rustam',
                lastname: 'Gabdullin',
                email: 'rigabdullin@yandex.ru',
                city: 'Perm'
              }
            }
          },
          {
            entities: {
              body: {
                phone: {
                  checkMode: 'equals',
                  value: '1111111111'
                },
                code: {
                  checkMode: 'notEquals',
                  value: 123456
                }
              }
            },
            data: { reason: 'Проверочный код неверный' },
            interceptors: {
              response: async (data, { setStatusCode }) => {
                await delay(1500);
                setStatusCode(404);
                return data;
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
              query: {
                token: {
                  checkMode: 'equals',
                  value: 'my_token'
                }
              }
            },
            data: {
              phone: '1111111111',
              firstname: 'Rustam',
              lastname: 'Gabdullin',
              email: 'rigabdullin@yandex.ru',
              city: 'Perm'
            }
          }
        ]
      }
    ]
  }
];

export default flatMockServerConfig;
