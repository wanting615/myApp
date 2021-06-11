interface Config {
  baseUrl: string;
  imagePath: string;
  pulickKey: string;
  serverPath: string;
}

const config: Config = {
  baseUrl: process.env.NODE_ENV === "devopment" ? "/api" : 'http://121.	5.32.253:3000',
  imagePath: "https://elm.cangdu.org/img/",
  pulickKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKtTCoqjzzwVqKwfDA92N4J1TIIz4eq4CpI0wHhS3RNew9e47ZdwJec4SmRTyxFkG/FlrJC7VwG0rP9gJPqUk4MCAwEAAQ==',
  serverPath: "http://121.5.32.253:3000/",
}

export default config;