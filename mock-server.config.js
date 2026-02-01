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
            data: '123456',
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
              message: 'Такой телефон не найден',
              error: 'PhoneNotFound'
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
      }
    ]
  }
];

export default flatMockServerConfig;
