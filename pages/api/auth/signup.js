import { hash } from "bcryptjs";
import connectMongo from "../../../db/mongodbConnector";
import Users from "../../../model/Schema";

export default async function handler(req, res){
  connectMongo().catch(error => res.json({error: 'Conexión fallida'}))

  //post
  if (req.method === 'POST'){
    if (!req.body) return res.status(404).json({error: "No existen datos"})

    const { username, email, password } = req.body

    // duplicated users
    const checkExistingUser = await Users.findOne({ email })
    if (checkExistingUser) return res.status(422).json({ message: 'El correo electrónico ya se encuentra registrado!'})

    //password hash
    Users.create({ username, email, password: await hash(password, 12)}, function(error, data){
      if(error) return res.status(404).json({error})
      res.status(201).json({ status: true, user: data})
    })

  } else {
    res.status(500).json({ message: 'Método HTTP inválido, solo se permite POST.'})
  }
}