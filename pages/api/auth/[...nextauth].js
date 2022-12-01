import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials"
import connectMongo from "../../../db/mongodbConnector"
import Users from '../../../model/Schema'
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req){
        connectMongo().catch(error => {error: 'Conexión fallida'})

        //check user
        const result = await Users.findOne({ email: credentials.email})

        if (!result){
          throw new Error('El correo electrónico no se encuentra registrado')
        }

        //compare hashed passwords 
        const checkPassword = await compare(credentials.password, result.password)
        
        if (!checkPassword || result.email !== credentials.email){
          throw new Error('El correo electrónico o la contraseña no coinciden')
        }

        return result
      }
    })
  ],
  secret: process.env.NEXT_SECRET
})