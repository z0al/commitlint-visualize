# Commitlint Visualizer

> **Warning:** Work in progress

A micro-service that generates humans-friendly report based on [commitlint]'s output.

[commitlint]: https://npm.im/commitlint

## Usage

Start the app server

```bash
$ export DATABASE_URL=mongodb://<user>:<password>@<host>:<port>/<database-name>
$ npm run build
$ npm start
> micro: Accepting connections on port 3000
```

Send reports

```bash
$ curl -XPOST -H "Content-type: application/json" -d '{
  "context":{
    "repo":"owner/repo"
  },
  "commits":[
    {
      "valid":true,
      "sha":"2bade7ae28d7137af0fdbcd2208d483c49554cca",
      "errors":[
        {
          "name":"type-enum",
          "message":"type must be one of [foo, bar]"
        }
      ],
      "warnings":[
        {
          "name":"type-enum",
          "message":"bla bla bla "
        }
      ]
    }
  ]
}' 'http://localhost:3000/api/upload'

{"url": "/reports/5a7e9ae2da3170312effe63b"}
$ xdg-open http://localhost:3000/reports/5a7e9ae2da3170312effe63b
```

### Development

Clone this repository and run:

```bash
cd commitlint-visualize
npm install
npm run dev
```

## License

MIT © [Ahmed T. Ali](https://github.com/ahmed-taj)
