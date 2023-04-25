import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
      id: {type: String},
      name: {type: String, required: true},
      email: {type: String, required: true},
    }
  );
  
  const Users = mongoose.model('users', UserSchema);
  
  export default Users;