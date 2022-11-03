import axios from "axios";


const client = axios.create({
  baseURL: 'http://dev.trainee.dex-it.ru/api/'
})

export const authAPI = {
  
  async signIn(values: {login:string, password: string}) {
    return await client.post( `Auth/SignIn`, values ).then((response) => response.data)
  }
}