# AgroMatch Web

## Development
### Setup

To install and work on these tools locally:

```
git clone https://github.com/iic2154-uc-cl/2020-1-Grupo6-Web.git
cd iic2154-uc-cl/2020-1-Grupo6-Web
yarn install
yarn start
```

Then create a `.env.local` file with the variables defined in the `.env` file.

Install Prettier and ESLint extensions to follow format guidelines of development.

### Deploy

The app is deployed using AWS Amplify.

Deploy happens automatically every time a pull request is merged into the branch `master` to the following [address](https://master.d31gpo5qhbfg9.amplifyapp.com/ "AgroMatch Web") 
