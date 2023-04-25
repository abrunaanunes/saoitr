import mongoose from "mongoose"

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://root:ZD5zH7YkDTDdhk2A@projetoclienteservidor.2o5ao6l.mongodb.net/?retryWrites=true&w=majority`)
let database = mongoose.connection

export default database