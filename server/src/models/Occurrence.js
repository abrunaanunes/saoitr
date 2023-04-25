import mongoose from "mongoose"

const OccurrenceSchema = new mongoose.Schema(
    {
      id: {type: Number},
      registered_at: {type: String, required: true},
      local: {type: String, required: true},
      occurrence_type: {type: String, required: true},
      km: {type: Number, required: true},
      token: {type: String, required: true},
      user_id: {type: Number, required: true},
    }
  );
  
  const Occurrences = mongoose.model('occurrences', OccurrenceSchema);
  
  export default Occurrences;